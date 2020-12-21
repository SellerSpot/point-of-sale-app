import { Configuration } from 'webpack';
import webpackConfig from '../webpack.config';

module.exports = {
    webpackFinal: (config: Configuration) => {
        const webpackConfiguraiton = webpackConfig({ development: true });
        return {
            ...config,
            module: {
                ...config.module,
                rules: webpackConfiguraiton.module.rules,
            },
            resolve: {
                ...config.resolve,
                ...webpackConfiguraiton.resolve,
            },
        };
    },
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
