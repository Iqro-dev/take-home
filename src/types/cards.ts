import { ListItem } from "../api/getListData";

export type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description: ListItem["description"];
  handleExpand: () => void;
  isExpanded: boolean;
};

export type DeletedCardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
};
