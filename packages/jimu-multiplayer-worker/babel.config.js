module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        [
            '@babel/typescript',
            {
                allowDeclareFields: true,
            },
        ],
    ],
    plugins: [
        '@babel/plugin-proposal-optional-chaining',
    ],
};
