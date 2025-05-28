import { CalendarFold, Search } from "lucide-react";
import KanbanSideBar from "./KanBanSideBar";
import BoardContainer from "./BoardContainer";
import { useKanbanBoard } from "@/hooks/useKanbanBoard";

export default function KanbanBoard(){

   const { boardData, draggingItem, handleOnDragStart, handleOnDrop, addNewItem, updateItem, handleOnDragEnd, deleteItem } = useKanbanBoard();

  return (
    <main className="h-full w-full bg-[#EEF6FF] flex">

      <KanbanSideBar />

      <section className="w-full h-full overflow-y-hidden overflow-x-scroll hide_scroll-bar">
        <div className="w-full flex items-center justify-between py-3 px-5">
          <div className="flex items-center justify-center space-x-16">
            <h1 className="text-neutral-700 min-w-max">
               Create project 
            </h1>

              <div className="relative flex items-center">
                <Search className="absolute w-5 h-5 top-2.5 left-2.5" color="#6C87F8" />
                <input
                  className="w-full bg-white outline-none placeholder:text-slate-400 text-slate-700 rounded-2xl pl-10 pr-3 py-2 transition duration-300 ease"
                  placeholder="Search" 
                />
              </div>
            </div>
            <div className="hidden md:visible">
              <CalendarFold color="gray" />
           </div>
        </div>

              <div className="boards-container w-full h-full bg-white py-5 overflow-x-auto scroll-smooth snap-x">
                <div className="boards min-w-max px-4 sm:px-20 grid grid-cols-4 gap-4">
                  {boardData.map((list) => (
                    <BoardContainer 
                      addNewItem={addNewItem}
                      handleOnDrop={handleOnDrop}
                      handleOnDragStart={handleOnDragStart}
                      updateItem={updateItem}
                      draggingItem={draggingItem}
                      handleOnDragEnd={handleOnDragEnd}
                      deleteItem={deleteItem}
                      list={list} 
                      key={list.id}
                    />
                  ))}
                </div>
              </div>
      </section>
    </main>
  )
}
