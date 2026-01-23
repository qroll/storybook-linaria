const { execSync } = require("child_process");

console.log("Starting two-step build process...\n");

try {
  // Step 1: Build component CSS files
  console.log("Running Step 1: Building component CSS files...");
  execSync("node esbuild-styles.cjs", { stdio: "inherit" });

  // Step 2: Build component JS files
  console.log("\nRunning Step 2: Building component JS files...");
  execSync("node esbuild-dist.cjs", { stdio: "inherit" });

  console.log("\n✓ Build complete!");
} catch (error) {
  console.error("Build failed:", error.message);
  process.exit(1);
}
