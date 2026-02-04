import { css } from "@linaria/core";
import type { StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { Button, Toggle } from "../../src/button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
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

export const Disabled: Story = {
  args: {
    onClick: fn(),
  },
  render: (args) => {
    return (
      <Button disabled data-testid="disabled-button" {...args}>
        Disabled button
      </Button>
    );
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(
      await canvas.findByRole("button", { name: "Disabled button" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByTestId("disabled-button"));
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Toggled: Story = {
  render: (args) => {
    return <Toggle />;
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      await canvas.findByRole("button", { name: "Click to toggle" }),
    );
    await expect(
      await canvas.findByText("You have toggled the button!"),
    ).toBeVisible();
  },
};
