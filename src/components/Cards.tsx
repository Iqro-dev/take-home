import { FC } from "react";
import { Button } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "../assets/icons";
import { useListStore } from "../store";

import { ListItem } from "../api/getListData";

export type CardProps = Readonly<{
  id: ListItem["id"];
  title: ListItem["title"];
  description: ListItem["description"];
  handleExpand: () => void;
  isExpanded: boolean;
}>;

export type DeletedCardProps = Readonly<{
  id: ListItem["id"];
  title: ListItem["title"];
}>;

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
          <Button onClick={handleExpand}>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>

          <Button onClick={() => handleDelete(id)}>
            <XMarkIcon />
          </Button>
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

        <Button onClick={() => handleRevert(id)}>Revert</Button>
      </div>
    </div>
  );
};
