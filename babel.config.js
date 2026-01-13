module.exports = (api) => {
    const isTest = api.env("test");

    const presets = [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
        ['@wyw-in-js']
    ];
    const plugins = []

    return {
        presets,
        plugins,
    };
};
