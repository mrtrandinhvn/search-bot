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
        rules: [
            {
                test: /\.jsx$|\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcss: [
                                autoprefixer({ browsers: ["last 2 versions"] })
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcss: [
                                autoprefixer({ browsers: ["last 2 versions"] })
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [
                                path.resolve(__dirname, "./node_modules")
                            ],
                            outputStyle: "compressed"
                        }
                    }
                ],

            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                // context: __dirname
            },
            minimize: false
        }),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ],
    resolve: {
        extensions: [".js", ".jsx", ".css", ".scss"],
        modules: []
    },
    externals: {}
};