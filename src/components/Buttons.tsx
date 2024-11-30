import { ComponentProps, FC } from "react";

type ButtonProps = Readonly<ComponentProps<"button">>;

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonSecondary: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
      {...props}
    >
      {children}
    </button>
  );
};

export type ToggleRevealButtonProps = Readonly<
  ButtonProps & { isRevealed: boolean }
>;

export const ToggleRevealButton: FC<ToggleRevealButtonProps> = ({
  isRevealed,
  ...props
}) => {
  return (
    <ButtonSecondary
      className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
      {...props}
    >
      {isRevealed ? "Hide" : "Reveal"}
    </ButtonSecondary>
  );
};
