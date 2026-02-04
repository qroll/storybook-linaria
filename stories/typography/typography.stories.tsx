import { Typography } from "../../src/typography";

export default {
  title: "Example/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  render: () => {
    return (
      <>
        <Typography.HeadingXL />
      </>
    );
  },
};
