import { cx } from "@linaria/core";
import { typesets } from "../typesets";
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
        return typesets.sm;
      case "large":
        return typesets.lg;
      default:
        return typesets.bl;
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
