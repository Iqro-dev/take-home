import { XMarkIcon } from "./icons";
import {
  DeleteButtonProps,
  ExpandButtonProps,
  RefreshButtonProps,
  RevertButtonProps,
  ToggleRevealButtonProps,
} from "../types/buttons";

export const ExpandButton: ExpandButtonProps = ({ children, ...props }) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton: DeleteButtonProps = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <XMarkIcon />
    </button>
  );
};

export const RevertButton: RevertButtonProps = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      Revert
    </button>
  );
};

export const RefreshButton: RefreshButtonProps = (props) => {
  return (
    <button
      className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
      {...props}
    >
      Refresh
    </button>
  );
};

export const ToggleRevealButton: ToggleRevealButtonProps = ({
  isRevealed,
  ...props
}) => {
  return (
    <button
      className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
      {...props}
    >
      {isRevealed ? "Hide" : "Reveal"}
    </button>
  );
};
