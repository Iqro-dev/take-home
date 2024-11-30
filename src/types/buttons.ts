import { FC } from "react";

type ButtonProps = React.ComponentProps<"button">;

export type ExpandButtonProps = FC<ButtonProps>;

export type DeleteButtonProps = FC<Omit<ButtonProps, "children">>;

export type RevertButtonProps = FC<Omit<ButtonProps, "children">>;

export type ToggleRevealButtonProps = FC<ButtonProps & { isRevealed: boolean }>;
