const esbuild = require("esbuild");
const { globSync } = require("glob");
const linariaEsbuildPlugin = require("@wyw-in-js/esbuild").default;
const path = require("path");
const fs = require("fs");

// Find all component style files (*.styles.ts)
const styleFiles = globSync("src/**/*.styles.ts");

console.log("Step 1: Bundling all component CSS into single file...");

const tempOutDir = path.join(__dirname, ".temp-css-build");

// Build each style file individually and extract CSS
esbuild
  .build({
    entryPoints: styleFiles,
    bundle: true,
    format: "esm",
    outdir: tempOutDir,
    plugins: [
      linariaEsbuildPlugin({
        sourceMap: false,
      }),
    ],
    loader: { ".png": "dataurl" },
    external: ["react", "react-dom"],
  })
  .then(() => {
    // Collect all CSS files from the temporary build directory
    const cssFiles = globSync(path.join(tempOutDir, "**/*.css"));
    let combinedCss = "";

    console.log(`Found ${cssFiles.length} CSS files`);

    cssFiles.forEach((cssFile) => {
      const css = fs.readFileSync(cssFile, "utf8");
      if (css.trim()) {
        combinedCss += css + "\n";
      }
    });

    // Write the combined CSS to src/themes/component.css
    fs.mkdirSync("src/themes", { recursive: true });
    fs.writeFileSync("src/themes/component.css", combinedCss);

    // Clean up temporary files
    fs.rmSync(tempOutDir, { recursive: true, force: true });

    console.log("✓ Component CSS bundled to src/themes/component.css");
  })
  .catch((e) => {
    // Clean up temporary files on error
    if (fs.existsSync(tempOutDir)) {
      fs.rmSync(tempOutDir, { recursive: true, force: true });
    }
    console.error("Error bundling component CSS:", e.message);
    process.exit(1);
  });
