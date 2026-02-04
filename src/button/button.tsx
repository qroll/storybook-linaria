import { css, cx } from "@linaria/core";
import {
  StyledButton,
  dangerDefaultStyle,
  dangerSecondaryStyle,
  defaultStyle,
  disabledStyle,
  secondaryStyle,
} from "./button.styles";
import { ButtonProps } from "./types";
import { typesets } from "../typesets";
import { useState } from "react";

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
      className={cx(
        buttonStyle(),
        buttonSize(),
        disabledStyle,
        className,
        css`
          margin-left: 16px;
          color: pink;
        `,
      )}
      {...otherProps}
    />
  );
};

export const Toggle = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setToggled(!toggled)}
        styleType={toggled ? "secondary" : "default"}
      >
        Click to toggle
      </Button>
      {toggled && <div>You have toggled the button!</div>}
    </div>
  );
};
