import esbuild from "esbuild";
import stylePlugin from "esbuild-style-plugin";

esbuild.build({
    entryPoints: [
        "src/index.ts",
    ],
    outdir: "dist/minified",
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    sourcemap: true,
    minify: true,
    keepNames: true,
    tsconfig: "tsconfig.json",
    logLevel: "info",
    plugins: [
        stylePlugin({
            renderOptions: {
                sassOptions: {
                    silenceDeprecations: ["legacy-js-api"],
                    style: "compressed"
                }
            }
        })
    ]
});