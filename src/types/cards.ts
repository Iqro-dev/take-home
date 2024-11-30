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
