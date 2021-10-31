const fs = require("fs-extra");
const esbuild = require("esbuild");

const isProduction = process.env.NODE_ENV === "production";
const outDir = "build";

function copyFiles() {
  const files = [{ from: "app/src/index.html", to: `${outDir}/index.html` }];
  const dirs = [{ from: "app/src/assets", to: `${outDir}` }];

  files.forEach(({ from, to }) => fs.copyFileSync(from, to));
  dirs.forEach(({ from, to }) => fs.copySync(from, to));
}

const options = {
  entryPoints: ["app/src/index.tsx"],
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
