const fs = require("fs");
const esbuild = require("esbuild");

const isProduction = process.env.NODE_ENV === "production";
const outDir = "build";

function copyFiles() {
  const files = [
    { from: "src/index.html", to: `${outDir}/index.html` },
    { from: "src/assets/favicon.ico", to: `${outDir}/favicon.ico` },
  ];

  files.forEach(({ from, to }) => fs.copyFileSync(from, to));
}

const options = {
  entryPoints: ["src/index.tsx"],
  outdir: outDir,
  bundle: true,
  loader: {
    ".png": "file",
  },
  sourcemap: !isProduction,
  minify: isProduction,
  watch: isProduction
    ? false
    : {
        onRebuild(err) {
          if (err) {
            console.error(err);
            return;
          }

          copyFiles();
        },
      },
  logLevel: "info",
};

esbuild
  .build(options)
  .then(() => copyFiles())
  .catch(() => process.exit(1));
