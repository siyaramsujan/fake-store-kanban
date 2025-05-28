import { KanbanListItem } from "@/types/kanban"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { formatDate } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";
import { EditItemModal } from "./EditItem";

export default function BoardItem({ item, handleOnDragStart, updateItem, boardId, beingDragged, handleOnDragEnd, themeColorCode, deleteItem}: {
   item: KanbanListItem;
   handleOnDragStart: () => void;
   updateItem: ({ boardId, updatedItem }: { boardId: string; updatedItem: KanbanListItem}) => void;
   boardId: string;
   beingDragged: boolean;
   handleOnDragEnd: () => void;
   themeColorCode: string;
    deleteItem: ({ boardId, itemId }: {
       boardId: string;
       itemId: string; 
  }) => void;
}
){


  return (
                <Card 
                 draggable
                 onDragStart={handleOnDragStart}
                 onDragEnd={handleOnDragEnd}
                 key={item.id}
                 style={{ backgroundColor: beingDragged ? themeColorCode : "" }}
                 className={`${beingDragged ? "border-none" : "bg-white"} min-h-36 p-3 rounded-lg shadow hover:shadow-md transition-all ease-in-out duration-150`}
                 >
                   {
                    
                       !beingDragged && (
                       <>
                          <CardHeader className="flex items-center justify-between pr-0">
                            <CardTitle className="text-normal font-normal truncate">{item.title}</CardTitle>
                           <div className="flex items-center space-x-3">
                             <EditItemModal boardId={boardId} updateItem={updateItem} item={item} >
                                <div className="rounded-full border p-2">
                                    <Pencil 
                                      className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" 
                                    />
                                </div>
                            </EditItemModal>

                            <div onClick={() => deleteItem({ boardId, itemId: item.id })} className="rounded-full border p-2  hover:bg-red-400/50 group">
                                  <Trash 
                                    className="w-4 h-4 text-gray-500 group-hover:text-gray-50 cursor-pointer transition-colors" 
                                  />
                              </div>
                           </div>
                          </CardHeader>

                          <CardContent>

                             {/* Assigned Users Avatar */}
                             <div className="flex items-center -space-x-3 flex-wrap space-y-1">
                                {
                                  item.assignedUserImages.map((img, idx) => (
                                  <Avatar key={img}>
                                    <AvatarImage
                                      style={{ borderColor: themeColorCode }}
                                      className="w-8 h-8 border-2 rounded-full"
                                      src={img}
                                      alt="User avatar"
                                    />
                                        <AvatarFallback
                                          style={{ borderColor: themeColorCode }}
                                          className="w-8 h-8 border-2 rounded-full flex items-center justify-center bg-primary/10 text-sm"
                                        >
                                           I{idx}
                                        </AvatarFallback>
                                  </Avatar>

                                  )) 
                                }
                            </div>
                       
                            <div className="w-full mt-3 flex items-center justify-between">
                                 <span className="text-sm text-neutral-400">
                                    Creation date:
                                  </span>
                                  <p className="text-neutral-700">{formatDate(item.creationDate)}</p>
                            </div>
                          </CardContent>
                        </>
                       )
       
                  }
                    </Card>

  )
}
