import { StyledButton } from "./button.styles";
import { ButtonV1Props } from "./types";

export const ButtonV1 = (props: ButtonV1Props) => {
  const {
    styleType = "default",
    sizeType = "default",
    className,
    danger,
    ...otherProps
  } = props;

  return (
    <StyledButton
      $buttonStyle={styleType}
      $sizeType={sizeType}
      $danger={danger}
      className={className}
      {...otherProps}
    />
  );
};
