const path = require('path');
const webpack = require('webpack');
const prod = process.argv.indexOf('-p') !== -1;

let config = {
    entry: "./app/index.js",

    output: {
        path: path.join(__dirname, "public"),
        publicPath: '/',
        filename: "bundle.js"
    },

    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''},
                changeOrigin: true,
                secure: false
            }
        }
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=100000"
            }
        ]
    }
};

config.plugins = config.plugins||[];
if (prod) {
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': `"production"`
        }
    }));
} else {
    config.devtool = 'source-map';
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': `""`
        }
    }));
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
