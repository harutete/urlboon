const path = require('path');
const MODE = 'development';

const config = {
    mode: MODE,
    entry: './src/js/app.js',
    output: {
        path: path.join(__dirname, 'dist/js/'),
        filename: 'master.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        open: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            importLoaders: 2
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            }
        ]
    }
}

module.exports = config;
