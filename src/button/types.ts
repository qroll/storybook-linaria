import React from "react";

export type ButtonStyleType = "default" | "secondary" | "light" | "link";
export type ButtonSizeType = "large" | "default" | "small";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Indicates if a loading spinner is to be displayed */
  loading?: boolean | undefined;
  danger?: boolean | undefined;
  styleType?: ButtonStyleType | undefined;
  sizeType?: ButtonSizeType | undefined;
}
