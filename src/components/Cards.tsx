import { FC } from "react";
import { DeleteButton, ExpandButton, RevertButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { CardProps, DeletedCardProps } from "../types/cards";
import { useListStore } from "../store";

export const Card: FC<CardProps> = ({
  id,
  title,
  description,
  handleExpand,
  isExpanded,
}) => {
  const { handleDelete } = useListStore();

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>

        <div className="flex">
          <ExpandButton onClick={handleExpand}>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandButton>

          <DeleteButton onClick={() => handleDelete(id)} />
        </div>
      </div>

      <div
        className={`overflow-hidden duration-500 transition-all ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export const DeletedCard: FC<DeletedCardProps> = ({ id, title }) => {
  const { handleRevert } = useListStore();

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>

        <RevertButton onClick={() => handleRevert(id)} />
      </div>
    </div>
  );
};
