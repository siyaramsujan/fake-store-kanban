import { DraggingItem, dummyKanbanData, KanbanList, KanbanListItem } from "@/types/kanban";
import { useCallback, useEffect, useState } from "react";


const STORAGE_KEY = "kanban-board-data";

const getStoredBoardData = (): KanbanList[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedData = JSON.parse(stored);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData;
      }
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
  return dummyKanbanData;
};

const saveBoardData = (data: KanbanList[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};



export function useKanbanBoard(){

  const [boardData, setBoardData] = useState<KanbanList[]>(() => getStoredBoardData());
  const [draggingItem, setDraggingItem] = useState<DraggingItem>(null);


  useEffect(() => {
    saveBoardData(boardData);
  }, [boardData]);


  const addNewItem = useCallback(({ boardId, item }: {
       boardId: string;
       item: KanbanListItem
  }) => {
     setBoardData(prevBoardData => 
       prevBoardData.map(board =>
          board.id === boardId ? { ...board, items: [...board.items, item] } : board 
       )
     );
  }, []);

  const updateItem = useCallback(({ boardId, updatedItem }: {
       boardId: string;
       updatedItem: KanbanListItem
  }) => {

     setBoardData(prevBoardData => 
       prevBoardData.map(board =>
          board.id === boardId ? { ...board, items: board.items.map((item) => item.id === updatedItem.id ? { ...item, ...updatedItem } : item) } : board 
       )
     );
  }, []);

  const deleteItem = useCallback(({ boardId, itemId }: {
       boardId: string;
       itemId: string 
  }) => {

     setBoardData(prevBoardData => 
       prevBoardData.map(board =>
          board.id === boardId ? { ...board, items: board.items.filter((item) => item.id != itemId) } : board 
       )
     );
  }, []);



  const handleOnDrop = useCallback((destinationBoardId: string) => {

     if(!draggingItem) return;
 
     const { sourceBoardId, item } = draggingItem;

     // If the data was dropped on the same board return
     if(sourceBoardId === destinationBoardId) return;
     
     setBoardData(prevBoardData => {
        return prevBoardData.map((board) => {

           // Remove the dragged item if it's the source board
           if(board.id === sourceBoardId){
              return {
                  ...board,
                  items: board.items.filter((boardItem) => boardItem.id != item.id),
              };
           };


           // Insert the dragged item if it's the destination board
           if(board.id === destinationBoardId){
              return {
                  ...board,
                  items: [...board.items, item],
              };
           }

          return board;
      })
     });


     setDraggingItem(null);
  }, [draggingItem]);

  const handleOnDragStart = useCallback((sourceBoardId: string, item: KanbanListItem) => {
    setDraggingItem({
       sourceBoardId: sourceBoardId,
       item
    });
  }, []);

  const handleOnDragEnd = useCallback(() => {
    setDraggingItem(null);
  }, []);


  return {
     boardData,
     draggingItem,
     addNewItem,
     deleteItem,
     handleOnDrop,
     handleOnDragStart,
     updateItem,
     handleOnDragEnd
  }
} 
