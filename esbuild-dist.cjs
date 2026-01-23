const esbuild = require("esbuild");
const { globSync } = require("glob");
const linariaEsbuildPlugin = require("@wyw-in-js/esbuild").default;
const path = require("path");
const fs = require("fs");

// Get all component files except *.styles.ts and types.ts
const files = globSync("src/**/*.{ts,tsx}", {
  ignore: ["src/**/types.ts", "src/**/*.styles.ts"],
});

// Also include style files for Linaria processing
const styleFiles = globSync("src/**/*.styles.ts");

console.log("Step 2: Building component JS files with CSS imports...");

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

      return { contents, loader: args.path.endsWith(".tsx") ? "tsx" : "jsx" };
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
    // Copy theme.css to dist
    const themeCssPath = path.join(__dirname, "src", "theme.css");
    const distThemeCssPath = path.join(__dirname, "dist", "theme.css");
    const componentCssPath = path.join(
      __dirname,
      "src",
      "themes",
      "component.css",
    );

    fs.copyFileSync(themeCssPath, distThemeCssPath);

    // Read the theme.css content
    let themeCss = fs.readFileSync(distThemeCssPath, "utf8");

    // Add import for component.css at the top
    if (fs.existsSync(componentCssPath)) {
      themeCss = `@import "./themes/component.css";\n${themeCss}`;

      // Copy component.css to dist/themes/
      const distThemesDir = path.join(__dirname, "dist", "themes");
      fs.mkdirSync(distThemesDir, { recursive: true });
      fs.copyFileSync(
        componentCssPath,
        path.join(distThemesDir, "component.css"),
      );
    }

    // Inline the @import in theme.css for other theme files
    const importRegex = /@import "\.\/themes\/([^"]+)\.css";\n/g;
    themeCss = themeCss.replace(importRegex, (match, theme) => {
      // Skip component.css as it's already imported
      if (theme === "component") {
        return match;
      }
      const themePath = path.join(__dirname, "src", "themes", `${theme}.css`);
      if (fs.existsSync(themePath)) {
        return fs.readFileSync(themePath, "utf8") + "\n";
      }
      return match;
    });
    fs.writeFileSync(distThemeCssPath, themeCss);

    console.log("✓ Component JS files generated with CSS imports");
  })
  .catch((e) => {
    console.error("Error generating component JS files:", e.message);
    process.exit(1);
  });
