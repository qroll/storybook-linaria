import React from "react";

export type ButtonV1StyleType = "default" | "secondary" | "light" | "link";
export type ButtonV1SizeType = "large" | "default" | "small";

export interface ButtonV1Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Indicates if a loading spinner is to be displayed */
  loading?: boolean | undefined;
  danger?: boolean | undefined;
  styleType?: ButtonV1StyleType | undefined;
  sizeType?: ButtonV1SizeType | undefined;
}
