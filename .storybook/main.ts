import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-webpack5",
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
  webpackFinal: async (config) => {
    config.resolve!.modules = [
      path.resolve(process.cwd(), ".."),
      "node_modules",
    ];

    config.module?.rules!.push({
      test: /\.(t|j)sx?$/,
      use: [
        { loader: "babel-loader" },
        {
          loader: "@wyw-in-js/webpack-loader",
          options: {
            sourceMap: true,
          },
        },
      ],
      exclude: [
        /node_modules/,
        path.resolve(process.cwd(), "storybook-stories.js"),
        path.resolve(process.cwd(), "storybook-config-entry.js"),
      ],
    });

    return config;
  },
};
export default config;
