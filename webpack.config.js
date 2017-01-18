var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
module.exports = {
    context: path.join(__dirname),
    entry: {
        index: "./js/index.jsx"
    },
    output: {
        path: path.join(__dirname + "/js/built/"),
        filename: "[name].bundle.js".toLowerCase()
    },
    module: {
        loaders: [
            {
                test: /\.jsx$|\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react"],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?minimize!postcss-loader"
            },
            {
                test: /\.scss$/,
                loader: "style!css?minimize!postcss!sass?outputStyle=compressed",
            }
        ]
    },
    sassLoader: {
        includePaths: [
            "./node_modules"
        ]
    },
    postcss: [autoprefixer({ browsers: ["last 2 versions"] })],
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: ["", ".js", ".jsx", ".css", ".scss"],
        root: []
    },
    externals: {}
};