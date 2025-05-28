import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { KanbanListItem } from "@/types/kanban"
import { Loader, Plus } from "lucide-react"
import { FormEvent, ReactNode, useRef, useState } from "react"
import toast from "react-hot-toast"

export function EditItemModal({ 
  boardId, 
  updateItem,
  item,
  children
}: {
  boardId: string;
  children: ReactNode;
  item: KanbanListItem;
  updateItem: ({ boardId, updatedItem }: {
     updatedItem: KanbanListItem, boardId: string
  }) => void;
}) {

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: item.title,
    description: item.description,
    status: item.status,
    assignedUserImages: item.assignedUserImages,
    assignedUserImagesUrls: item.assignedUserImages.join(","),
  });

  const handleOnChange = (key: string, value: string | string[]) => {
    setData(prevState => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!data.title.trim()) {
      toast.error("Title is required!");
      return;
    }

    setLoading(true);

    try {

      const updatedItem: KanbanListItem = {
        id: item.id,
        title: data.title,
        description: data.description,
        status: data.status,
        assignedUserImages: data.assignedUserImagesUrls.split(',').map(url => url.trim()).filter(url => url),
        creationDate: item.creationDate, 
      };

      updateItem({
        boardId,
        updatedItem: updatedItem 
      });

      toast.success("Item updated successfully!");

      closeRef.current?.click();
    } catch (error) {
      toast.error("Failed to update item!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
         {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="title" className="text-left">
                Title *
              </Label>
              <Input
                onChange={(e) => handleOnChange("title", e.target.value)}
                id="title"
                value={data.title}
                placeholder="Enter task title..."
                required
              />
            </div>

            <div className="grid items-center gap-4">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Textarea
                onChange={(e) => handleOnChange("description", e.target.value)}
                id="description"
                value={data.description}
                placeholder="Enter task description..."
                rows={3}
              />
            </div>

            <div className="grid items-center gap-4">
              <Label htmlFor="status" className="text-left">
                Status
              </Label>
              <Select value={data.status} onValueChange={(value) => handleOnChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid items-center gap-4">
              <Label htmlFor="assignedUserImagesUrls" className="text-left">
                Assigned User Images
              </Label>
              <Input
                onChange={(e) => handleOnChange("assignedUserImagesUrls",e.target.value)}
                id="assignedUserImagesUrls"
                value={data.assignedUserImagesUrls}
                placeholder="Enter image URLs separated by commas..."
              />
              <p className="text-xs text-gray-500">
                Enter profile image URLs separated by commas
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" />
                 Saving... 
                </>
              ) : (
                <>
                  <Plus className="mr-2" />
                  Save Changes 
                </>
              )}      
            </Button>

            <DialogClose
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2"
              ref={closeRef}
            >
              Cancel
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
