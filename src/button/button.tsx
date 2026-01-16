import { cx } from "@linaria/core";
import {
  StyledButton,
  dangerDefaultStyle,
  dangerSecondaryStyle,
  defaultSizeStyle,
  defaultStyle,
  disabledStyle,
  largeSizeStyle,
  secondaryStyle,
  smallSizeStyle,
} from "./button.styles";
import { ButtonProps } from "./types";

export const Button = (props: ButtonProps) => {
  const {
    styleType = "default",
    sizeType = "default",
    className,
    danger,
    ...otherProps
  } = props;
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
  const buttonSize = () => {
    switch (sizeType) {
      case "small":
        return smallSizeStyle;
      case "large":
        return largeSizeStyle;
      default:
        return defaultSizeStyle;
    }
  };

  return (
    <StyledButton
      $buttonStyle={styleType}
      className={cx(buttonStyle(), buttonSize(), disabledStyle, className)}
      {...otherProps}
    />
  );
};
