import { FC } from "react";

type ButtonProps = React.ComponentProps<"button">;

export type ExpandButtonProps = Readonly<FC<ButtonProps>>;

export type DeleteButtonProps = Readonly<FC<Omit<ButtonProps, "children">>>;

export type RevertButtonProps = Readonly<FC<Omit<ButtonProps, "children">>>;

export type RefreshButtonProps = Readonly<FC<ButtonProps>>;

export type ToggleRevealButtonProps = Readonly<
  FC<ButtonProps & { isRevealed: boolean }>
>;
