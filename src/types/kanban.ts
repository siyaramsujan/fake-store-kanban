import React from "react";

export type KanbanList = {
     id: string;
     name: string;
     items: KanbanListItem[];
     colorCode: string;
}

export type KanbanListItem = {
     id: string;
     title: string;
     description: string;
     status: "completed" | "review" | "in_progress" | "todo";
     assignedUserImages: string[];
     creationDate: number;
}

export type DraggingItem = {
  sourceBoardId: string;
  item: KanbanListItem;
} | null;

export type SetDraggingItem = React.Dispatch<React.SetStateAction<DraggingItem | null>>;



export const dummyKanbanData: KanbanList[] = [
  {
    id: "list-1",
    name: "Backlog",
    colorCode: "#A0AEC0", // Gray
    items: [
      {
        id: "item-1",
        title: "Create GitHub repository",
        description: "Set up a new repository for the onboarding project.",
        status: "todo",
        assignedUserImages: ["https://randomuser.me/api/portraits/men/1.jpg"],
        creationDate: new Date("2025-05-18T10:30:00Z").getTime(),
      },
      {
        id: "item-2",
        title: "Read company handbook",
        description: "Go through all policies and workflows in the company handbook.",
        status: "todo",
        assignedUserImages: ["https://randomuser.me/api/portraits/women/2.jpg"],
        creationDate: new Date("2025-05-19T09:00:00Z").getTime(),
      },
    ],
  },
  {
    id: "list-2",
    name: "In Progress",
    colorCode: "#4299E1", // Blue
    items: [
      {
        id: "item-3",
        title: "Set up local development environment",
        description: "Install required dependencies and tools to start working locally.",
        status: "in_progress",
        assignedUserImages: ["https://randomuser.me/api/portraits/men/3.jpg"],
        creationDate: new Date("2025-05-20T11:15:00Z").getTime(),
      },
    ],
  },
  {
    id: "list-3",
    name: "Review",
    colorCode: "#ED8936", // Orange
    items: [
      {
        id: "item-4",
        title: "Submit first pull request",
        description: "Submitted PR for updating the README with onboarding steps.",
        status: "review",
        assignedUserImages: ["https://randomuser.me/api/portraits/women/4.jpg"],
        creationDate: new Date("2025-05-21T14:45:00Z").getTime(),
      },
    ],
  },
  {
    id: "list-4",
    name: "Done",
    colorCode: "#48BB78", // Green
    items: [
      {
        id: "item-5",
        title: "Join Slack channels",
        description: "Joined all required Slack channels for the team.",
        status: "completed",
        assignedUserImages: ["https://randomuser.me/api/portraits/men/5.jpg"],
        creationDate: new Date("2025-05-17T08:20:00Z").getTime(),
      },
      {
        id: "item-6",
        title: "Completed orientation session",
        description: "Attended onboarding call with HR and team lead.",
        status: "completed",
        assignedUserImages: ["https://randomuser.me/api/portraits/women/6.jpg"],
        creationDate: new Date("2025-05-16T13:00:00Z").getTime(),
      },
    ],
  },
];


