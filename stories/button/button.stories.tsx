import { fn } from "storybook/test";

import { Button } from "../../src/button";
import { css } from "@linaria/core";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  render: () => {
    return (
      <>
        <Button>Hello</Button>
        <Button styleType="secondary" sizeType="large">
          Hello
        </Button>
        <Button danger sizeType="small">
          Hello
        </Button>
        <Button danger styleType="secondary">
          Hello
        </Button>
        <Button disabled>Hello</Button>
        <Button
          styleType="secondary"
          sizeType="large"
          className={css`
            margin: 16px;
          `}
          style={{ backgroundColor: "purple" }}
        >
          Hello
        </Button>
      </>
    );
  },
};
