import { ButtonProps } from "./types";

// Base button class + style variants
const baseClass = "btn";
const styleClasses = {
  default: "btn-primary",
  secondary: "btn-secondary",
  light: "btn-light",
  link: "btn-link",
};
const dangerClasses = {
  default: "btn-danger",
  secondary: "btn-danger-secondary",
};
const sizeClasses = {
  small: "btn-sm",
  default: "btn-md",
  large: "btn-lg",
};

export const Button = (props: ButtonProps) => {
  const {
    styleType = "default",
    sizeType = "default",
    className,
    danger,
    ...otherProps
  } = props;

  const styleClass = danger
    ? dangerClasses[styleType as keyof typeof dangerClasses] || dangerClasses.default
    : styleClasses[styleType] || styleClasses.default;

  const sizeClass = sizeClasses[sizeType] || sizeClasses.default;

  const classes = [baseClass, styleClass, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...otherProps} />;
};
