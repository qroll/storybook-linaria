const { execSync } = require("child_process");

console.log("Starting two-step build process...\n");

try {
  console.log("Running Step 1: Building component CSS files...");
  execSync("node esbuild-styles.cjs", { stdio: "inherit" });

  console.log("\nRunning Step 2: Building component JS files...");
  execSync("node esbuild-dist.cjs", { stdio: "inherit" });

  console.log("\n✓ Build complete!");
} catch (error) {
  console.error("Build failed:", error.message);
  process.exit(1);
}
