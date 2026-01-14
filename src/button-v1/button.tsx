import {
  StyledButton,
  dangerDefaultStyle,
  dangerSecondaryStyle,
  defaultStyle,
  disabledStyle,
  secondaryStyle,
} from "./button.styles";
import { ButtonV1Props } from "./types";
import { typesets } from "../typesets";

export const ButtonV1 = (props: ButtonV1Props) => {
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

  return <StyledButton $buttonStyle={styleType} {...otherProps} />;
};
