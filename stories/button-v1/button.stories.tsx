import { ButtonV1 } from "../../src/button-v1";

export default {
  title: "Example/Button V1",
  component: ButtonV1,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  render: () => {
    return (
      <>
        <ButtonV1>Hello</ButtonV1>
        <ButtonV1 styleType="secondary" sizeType="large">
          Hello
        </ButtonV1>
        <ButtonV1 danger sizeType="small">
          Hello
        </ButtonV1>
        <ButtonV1 danger styleType="secondary">
          Hello
        </ButtonV1>
        <ButtonV1 disabled>Hello</ButtonV1>
      </>
    );
  },
};
