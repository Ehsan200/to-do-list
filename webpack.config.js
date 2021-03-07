const path = require('path');

const outputPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
    entry: {
        index: `${srcPath}/js/index.js`,
    },
    output: {
        path: outputPath,
        filename: `bundle.js`,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: '> 0.25%, not dead',
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
            },
            // {
            //     test: /\.(scss|css)$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader'],
            // },
        ],
    },
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    }
};