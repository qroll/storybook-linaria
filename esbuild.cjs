const esbuild = require("esbuild");
const { globSync } = require("glob");
const linariaEsbuildPlugin = require("@wyw-in-js/esbuild").default;

const files = globSync("src/**/*.{ts,tsx}", { ignore: "src/**/types.ts" });

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
    entryPoints: [...files, "src/theme.css"],
    bundle: true,
    format: "esm",
    external: ["./*", "../*", "react", "react-dom"],
    outdir: "dist",
    plugins: [
      reactImportPlugin,
      linariaEsbuildPlugin({
        sourceMap: true,
      }),
      filePlugin,
    ],
    loader: { ".png": "dataurl" },
    packages: "external",
  })
  .then(() => {
    // Copy theme.css to dist
    const fs = require("fs");
    const path = require("path");
    fs.copyFileSync(
      path.join(__dirname, "src", "theme.css"),
      path.join(__dirname, "dist", "theme.css")
    );
    // Inline the @import in theme.css
    let themeCss = fs.readFileSync(
      path.join(__dirname, "dist", "theme.css"),
      "utf8"
    );
    const importRegex = /@import "\.\/themes\/([^"]+)\.css";\n/g;
    themeCss = themeCss.replace(importRegex, (match, theme) => {
      const themePath = path.join(__dirname, "src", "themes", `${theme}.css`);
      if (fs.existsSync(themePath)) {
        return fs.readFileSync(themePath, "utf8") + "\n";
      }
      return match;
    });
    fs.writeFileSync(path.join(__dirname, "dist", "theme.css"), themeCss);
  })
  .catch((e) => console.error(e.message));
