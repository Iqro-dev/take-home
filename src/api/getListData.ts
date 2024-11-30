import { useQuery } from "@tanstack/react-query";
import mockJson from "../constants/mock.json";
import { getRandom, shuffle, sleep } from "../utils";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export const useGetListData = () => {
  const query = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      await sleep(1000);

      if (getRandom() > 85) {
        console.error("An unexpected error occurred!");
        throw new Error("👀");
      }

      const mockData = mockJson as Omit<ListItem, "isVisible">[];

      return shuffle(mockData).map((item) => {
        return { ...item, isVisible: getRandom() > 50 ? true : false };
      });
    },
  });

  return query;
};
