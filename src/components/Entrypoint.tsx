import { useEffect, useState } from "react";
import { useListStore } from "../store";
import { Card, DeletedCard } from "./Cards";
import { useGetListData } from "../api/getListData";
import { ButtonSecondary, ToggleRevealButton } from "./Buttons";
import { Spinner } from "../assets/icons";

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
  } = useListStore();

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [visibleCards, deletedCards, expandedCards]);

  useEffect(() => {
    if (!listQuery.isLoading && listQuery.data && visibleCards.length === 0) {
      refresh(listQuery.data?.filter((item) => item.isVisible) ?? []);
    }
  }, [listQuery.data, listQuery.isLoading, visibleCards.length]);

  const handleRefresh = () => {
    listQuery.refetch();
    if (!listQuery.data) return;
    refresh(listQuery.data.filter((item) => item.isVisible) ?? []);
  };

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

              <ButtonSecondary onClick={handleRefresh}>Refresh</ButtonSecondary>
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
