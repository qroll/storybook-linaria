const esbuild = require("esbuild");
const { globSync } = require("glob");
const linariaEsbuildPlugin = require("@wyw-in-js/esbuild").default;
const path = require("path");
const fs = require("fs");

console.log("Building...\n");

// Get all component files
const files = globSync("src/**/*.{ts,tsx}", {
  ignore: ["src/**/types.ts", "src/**/*.styles.ts"],
});

const styleFiles = globSync("src/**/*.styles.ts");

let reactImportPlugin = {
  name: "react-import",
  setup(build) {
    build.onLoad({ filter: /\.(tsx|jsx)$/ }, async (args) => {
      const fs = require("fs");
      let contents = await fs.promises.readFile(args.path, "utf8");

      // Add React import at the top if the file uses JSX
      if (!contents.includes("import React")) {
        contents = `import React from 'react';\n${contents}`;
      }

      return {
        contents,
        loader: args.path.endsWith(".tsx") ? "tsx" : "jsx",
      };
    });
  },
};

let filePlugin = {
  name: "files",
  setup(build) {
    // Mark all relative paths as external
    build.onResolve({ filter: /(^.\/)|(^..\/)/ }, (args) => {
      if (args.path.startsWith("./src")) {
        return;
      }
      return { path: args.path, external: true };
    });
  },
};

esbuild
  .build({
    entryPoints: [...files, ...styleFiles, "src/theme.css"],
    bundle: true,
    format: "esm",
    external: ["./*", "../*", "react", "react-dom"],
    outdir: "dist",
    plugins: [
      reactImportPlugin,
      linariaEsbuildPlugin({
        sourceMap: false,
      }),
      filePlugin,
    ],
    loader: { ".png": "dataurl" },
    packages: "external",
  })
  .then(() => {
    console.log("✓ Build completed\n");

    // Post-build: Add CSS imports to component index files
    console.log("Adding CSS imports to component exports...");

    const distDir = path.join(__dirname, "dist");

    // Find all component directories (those with both index.js and *.styles.css)
    const componentDirs = globSync(path.join(distDir, "**/")).filter((dir) => {
      const indexFile = path.join(dir, "index.js");
      const styleFiles = globSync(path.join(dir, "*.styles.css"));
      return fs.existsSync(indexFile) && styleFiles.length > 0;
    });

    componentDirs.forEach((componentDir) => {
      const indexFile = path.join(componentDir, "index.js");
      let indexContent = fs.readFileSync(indexFile, "utf8");

      // Find all *.styles.css files in this directory
      const styleFiles = globSync(path.join(componentDir, "*.styles.css"));

      styleFiles.forEach((styleFile) => {
        const fileName = path.basename(styleFile);
        const importStatement = `import "./${fileName}";`;

        // Only add if not already present
        if (!indexContent.includes(importStatement)) {
          indexContent = importStatement + "\n" + indexContent;
        }
      });

      fs.writeFileSync(indexFile, indexContent);
    });

    // Handle theme.css
    const themeCssPath = path.join(__dirname, "src", "theme.css");
    const distThemeCssPath = path.join(__dirname, "dist", "theme.css");

    fs.copyFileSync(themeCssPath, distThemeCssPath);

    // Read the theme.css content
    let themeCss = fs.readFileSync(distThemeCssPath, "utf8");

    // Inline the @import in theme.css for other theme files
    const importRegex = /@import "\.\/themes\/([^"]+)\.css";\n/g;
    themeCss = themeCss.replace(importRegex, (match, theme) => {
      const themePath = path.join(__dirname, "src", "themes", `${theme}.css`);
      if (fs.existsSync(themePath)) {
        return fs.readFileSync(themePath, "utf8") + "\n";
      }
      return match;
    });
    fs.writeFileSync(distThemeCssPath, themeCss);

    console.log("✓ All done!");
  })
  .catch((e) => {
    console.error("Build failed:", e.message);
    process.exit(1);
  });
