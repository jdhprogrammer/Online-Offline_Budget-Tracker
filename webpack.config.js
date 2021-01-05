const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    // Update the entry point
    entry: {
        index: './public/assets/js/index.js',
        another: './public/assets/js/db.js',
    },
    //   ["./public/assets/js/index.js",
    //     "./public/assets/js/db.js"
    // ]
    output: {
        // Set the path and filename for the output bundle (hint: You will need to use "__dirname")
        path: __dirname + "/public/dist",
        filename: '[name].bundle.js'
    },
    mode: "production",
    plugins: [
        new WebpackPwaManifest({
            filename: "manifest.json",
            name: "Budget Tracker",
            short_name: "Budget App",
            description: 'PWA for Tracking your Budget, including income and expenses.',
            fingerprints: false,
            inject: false,
            start_url: "/",
            display: "standalone",
            theme_color: "#ffffff",
            background_color: '#ffffff',
            crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            icons: [{
                    src: path.resolve("./public/assets/images/icons/android-chrome-512x512.png"),
                    sizes: [16, 32, 72, 96, 128, 144, 152, 192, 384, 512] // multiple sizes
                }

            ]
        })
    ]
};

module.exports = config;