import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import packageJson from './package.json';

const webpackConfiguration = (env: {
    production?: boolean;
    development?: boolean;
}): Configuration => {
    const isProduction = env.production ? true : false;
    return {
        entry: './src',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            plugins: [new TsconfigPathsPlugin()],
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'index.js',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                    exclude: [/dist/, /node_modules/],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName: '[name]__[local]___[hash:base64:5]',
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: require(path.join(process.cwd(), 'src/styles/index.ts')),
                            },
                        },
                    ],
                    include: /\.module\.(css|s[ac]ss)$/i,
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: require(path.join(process.cwd(), 'src/styles/index.ts')),
                            },
                        },
                    ],
                    exclude: /\.module\.(css|s[ac]ss)$/i,
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: path.join(__dirname, '/public/index.html'),
            }),
            new webpack.DefinePlugin({
                'process.env.ENV': JSON.stringify(isProduction ? 'production' : 'development'),
                'process.env.APP_NAME': JSON.stringify(packageJson.name),
                'process.env.APP_VERSION': JSON.stringify(packageJson.version),
            }),
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: './src',
                },
            }),
        ],
        devServer: {
            port: 8100,
            open: true,
            hot: true,
            contentBase: 'public',
            publicPath: '/',
            historyApiFallback: true,
        },
        devtool: !isProduction ? 'source-map' : false,
    };
};

export default webpackConfiguration;
