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
        entryPoints: files,
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
    .catch((e) => console.error(e.message));