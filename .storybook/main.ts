import type { StorybookConfig } from "@storybook/react-vite";
import wyw from "@wyw-in-js/vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/react-vite",
  // swc: () => ({
  //   jsc: {
  //     transform: {
  //       react: {
  //         runtime: "automatic",
  //       },
  //     },
  //   },
  // }),
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    return {
      ...config,
      plugins: [
        ...(config.plugins ?? []),
        wyw({
          babelOptions: {
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
          },
          overrideContext: (context, _filename) => ({
            ...context,
            __STORYBOOK_MODULE_TEST__: {
              test: () => {},
              expect: () => ({}),
              jest: {},
              fn: () => {},
              configure: () => {},
            },
            __STORYBOOK_MODULE_ACTIONS__: {
              action: (name: string) => () =>
                console.log(`[Storybook Action]: ${name}`),
            },
          }),
        }),
      ],
    };
  },
};
export default config;
