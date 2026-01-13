import { cx } from "@linaria/core";
import {
  StyledButton,
  dangerDefaultStyle,
  dangerSecondaryStyle,
  defaultStyle,
  disabledStyle,
  secondaryStyle,
} from "./button.styles";
import { ButtonProps } from "./types";

export const Button = (props: ButtonProps) => {
  const { styleType = "default", className, danger, ...otherProps } = props;
  const buttonStyle = () => {
    if (danger) {
      switch (styleType) {
        case "secondary":
          return dangerSecondaryStyle;
        default:
          return dangerDefaultStyle;
      }
    }
    switch (styleType) {
      case "secondary":
        return secondaryStyle;
      default:
        return defaultStyle;
    }
  };

  return (
    <StyledButton
      $buttonStyle={styleType}
      className={cx(buttonStyle(), disabledStyle, className)}
      {...otherProps}
    />
  );
};
