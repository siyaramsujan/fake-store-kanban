import { DraggingItem, KanbanList, KanbanListItem } from "@/types/kanban";
import { EllipsisIcon, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BoardItem from "./BoardItem";
import { AddNewItemModal } from "./AddNewItem";

const BoardContainer = ({  list, addNewItem, handleOnDrop, handleOnDragStart, updateItem, draggingItem, handleOnDragEnd, deleteItem }: {
  list: KanbanList;
  addNewItem: ({ boardId, item }: {
       boardId: string;
       item: KanbanListItem
  }) => void;
  updateItem: ({ boardId, updatedItem }: {
       boardId: string;
       updatedItem: KanbanListItem
  }) => void;
  handleOnDrop: (destinationBoarId: string) => void;
  handleOnDragStart: (sourceBoardId: string, item: KanbanListItem) => void;
  handleOnDragEnd: () => void;
  draggingItem: DraggingItem;
  deleteItem: ({ boardId, itemId }: {
       boardId: string;
       itemId: string; 
  }) => void;
}) => {

  return (
           <div 
            id="board"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleOnDrop(list.id)}
            className="max-w-[22rem] min-w-[22rem] space-y-3 snap-center">
             <div id="board_header" className="flex items-center justify-between space-x-3">
               <div className="space-x-3 flex items-center">
                 <Badge 
                   style={{ backgroundColor: list.colorCode }}
                   className={`font-semibold text-white h-10 w-10 rounded-xl`}>
                    {list.items.length < 10 ? `0${list.items.length}` : list.items.length}
                  </Badge>
                  <span className="font-medium">{list.name}</span>
                </div>
                 <EllipsisIcon />
              </div>

               <div id="board_items" className="space-y-3 overflow-y-scroll max-h-3/4 hide_scroll-bar">
                    {
                       list.items.map((item) => (
                          <BoardItem
                               beingDragged={draggingItem?.item.id === item.id || false}
                               boardId={list.id}
                               updateItem={updateItem}
                               handleOnDragStart={() => handleOnDragStart(list.id, item)}
                               handleOnDragEnd={handleOnDragEnd}
                               key={item.id}
                               item={item}
                               deleteItem={deleteItem}
                               themeColorCode={list.colorCode}
                           />
                       ))           
                     }
               </div>


                <AddNewItemModal addNewItem={addNewItem} boardId={list.id}>
                <div className="w-full flex items-center justify-center mt-3">
                  <div className="p-3 rounded-full border-2 border-dashed border-[#CCDDFF] hover:border-[#A3C0FF] cursor-pointer transition-all ease-in-out duration-150">
                    <Plus className="text-[#CCDDFF] hover:text-[#A3C0FF] transition-colors duration-150" />
                  </div>
                </div>
                </AddNewItemModal>
           </div>
  )
};

export default BoardContainer;
