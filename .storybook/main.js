module.exports = {
    stories: [
        '../packages/**/*.stories.mdx', 
        '../packages/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-actions', 
        '@storybook/addon-essentials', 
        '@storybook/addon-knobs',
        '@storybook/addon-docs'
    ],
}
