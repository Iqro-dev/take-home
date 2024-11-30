import { useEffect, useState } from "react";
import { useListStore } from "../store";
import { Spinner } from "./Spinner";
import { Card, DeletedCard } from "./Cards";
import { useGetListData } from "../api/getListData";
import { ToggleRevealButton } from "./Buttons";

export const Entrypoint = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const listQuery = useGetListData();

  const {
    visibleCards,
    deletedCards,
    expandedCards,
    handleExpand,
    saveToLocalStorage,
    getFromLocalStorage,
    refresh,
  } = useListStore(); // initialize store

  useEffect(() => {
    getFromLocalStorage();
  }, []); // get from local storage on mount

  useEffect(() => {
    saveToLocalStorage();
  }, [visibleCards, deletedCards, expandedCards]); // save to local storage when these change

  useEffect(() => {
    if (!listQuery.isLoading && listQuery.data && visibleCards.length === 0) {
      refresh(listQuery.data?.filter((item) => item.isVisible) ?? []);
    }
  }, [listQuery.data, listQuery.isLoading, visibleCards.length]); // if visibleCards.length is 0, refresh

  const handleRefresh = () => {
    listQuery.refetch();
    if (!listQuery.data) return;
    refresh(listQuery.data.filter((item) => item.isVisible) ?? []);
  }; // refresh list

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="flex gap-x-16">
        <div className="w-full max-w-xl">
          <h1 className="mb-1 font-medium text-lg py-2">
            My Awesome List ({visibleCards.length})
          </h1>

          <div className="flex flex-col gap-y-3">
            {visibleCards.map((card) => (
              <Card
                key={card.id}
                {...card}
                handleExpand={() => handleExpand(card.id)}
                isExpanded={expandedCards.includes(card.id)}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between">
            <h1 className="mb-1 font-medium text-lg py-2">
              Deleted Cards {deletedCards.length}
            </h1>

            <div className="flex flex-row gap-2">
              <ToggleRevealButton
                onClick={() => setIsRevealed(!isRevealed)}
                isRevealed={isRevealed}
              >
                Reveal
              </ToggleRevealButton>

              <button
                className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
                onClick={handleRefresh}
              >
                Refresh
              </button>
            </div>
          </div>

          <div
            className={`transition-all duration-500 flex-col gap-y-3 ${
              isRevealed ? "flex opacity-100" : "invisible opacity-0"
            }`}
          >
            {deletedCards.map((card) => (
              <DeletedCard key={card.id} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
