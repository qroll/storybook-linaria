import { StyledButton } from "./button.styles";
import { ButtonV1Props } from "./types";

export const ButtonV1 = (props: ButtonV1Props) => {
  const {
    styleType = "default",
    sizeType = "default",
    danger,
    disabled,
    ...otherProps
  } = props;

  return (
    <StyledButton
      $buttonStyle={disabled ? "disabled" : styleType}
      $danger={danger}
      disabled={disabled}
      {...otherProps}
    />
  );
};
