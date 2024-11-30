import { create } from "zustand";
import { ListItem } from "./api/getListData";

type Store = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  expandedCards: ListItem["id"][];
  setVisibleCards: (cards: ListItem[]) => void;
  handleDelete: (id: ListItem["id"]) => void;
  handleExpand: (id: ListItem["id"]) => void;
  handleRevert: (id: ListItem["id"]) => void;
  saveToLocalStorage: () => void;
  getFromLocalStorage: () => void;
  refresh: (visibleCards: ListItem[]) => void;
};

export const useListStore = create<Store>((set) => ({
  visibleCards: [],
  deletedCards: [],
  expandedCards: [],

  setVisibleCards: (cards) => set({ visibleCards: cards }),

  handleDelete: (id) => {
    set((state) => ({
      visibleCards: state.visibleCards.filter((card) => card.id !== id),
      deletedCards: [
        ...state.deletedCards,
        state.visibleCards.find((card) => card.id === id)!,
      ],
    }));
  },

  handleExpand: (id) => {
    set((state) => {
      if (state.expandedCards.includes(id)) {
        return {
          expandedCards: state.expandedCards.filter((cardId) => cardId !== id),
        };
      } else {
        return {
          expandedCards: [...state.expandedCards, id],
        };
      }
    });
  },

  handleRevert: (id) => {
    set((state) => ({
      deletedCards: state.deletedCards.filter((card) => card.id !== id),
      visibleCards: [
        ...state.visibleCards,
        state.deletedCards.find((card) => card.id === id)!,
      ],
    }));
  },

  saveToLocalStorage: () => {
    const dataToStore = {
      visibleCards: useListStore.getState().visibleCards,
      deletedCards: useListStore.getState().deletedCards,
      expandedCards: useListStore.getState().expandedCards,
    };

    localStorage.setItem("listData", JSON.stringify(dataToStore));
  },

  getFromLocalStorage: () => {
    const data = localStorage.getItem("listData");

    if (data) {
      const parsedData = JSON.parse(data);

      set({
        visibleCards: parsedData.visibleCards,
        deletedCards: parsedData.deletedCards,
        expandedCards: parsedData.expandedCards,
      });
    }
    return {};
  },

  refresh: (cards) =>
    set(() => ({
      visibleCards: cards,
      deletedCards: [],
      expandedCards: [],
    })),
}));
