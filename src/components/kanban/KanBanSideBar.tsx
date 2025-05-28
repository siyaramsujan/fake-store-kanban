import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDown, ClipboardList, Home, LogOut, Mail, Package, Settings, User } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";

export default function KanbanSideBar() {
  const activeItem = "home";

  const navItems = [
    {
      name: "home",
      icon: Home,
      notificationCount: 3,
      path: "#"
    },
    {
      name: "list",
      icon: ClipboardList,
      path: "#"
    },
    {
      name: "mail",
      icon: Mail,
      notificationCount: 10,
      path: "#"
    },
    {
      name: "members",
      icon: User,
      notificationCount: 10,
      path: "#"
    },
   {
      name: "products",
      icon: Package,
      path: "/admin/products"
    },
    {
      name: "settings",
      icon: Settings,
      path: "#"
    }
  ]

  return (
    <div className="kanban-sidebar h-full w-16 md:w-22 bg-kanban-sidebar py-3 md:py-5 px-2 flex flex-col items-center">
      {/* Top Section - Logo & Avatar */}
      <div className="sideBarTop mt-2 md:mt-5 space-y-6 md:space-y-10 w-full">
        <div className="sideBarLogo flex justify-center">
          <img className="w-10 h-auto md:w-full" src="/kanban-logo.png" alt="logo" />
        </div>

        <div className="avatarContainer w-full flex items-center justify-center flex-col space-y-1 md:space-y-2 cursor-pointer">
          <Avatar>
            <AvatarImage
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-yellow-500 hover:border-yellow-600 transition-all duration-200 ease-in-out"
              src="https://github.com/shadcn.png"
              alt="User avatar"
            />
            <AvatarFallback
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-yellow-500 flex items-center justify-center bg-primary/10 text-primary font-medium"
            >
              ST
            </AvatarFallback>
          </Avatar>
          
          {/* Hide name and chevron on mobile */}
          <div className="hidden md:flex flex-col items-center justify-center text-white">
            <p className="min-w-max text-sm">John Doe</p>
            <ChevronDown size={20} color="white" />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="sideBarMid w-full mt-6 md:mt-10 flex flex-col items-center space-y-5 md:space-y-9">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <div className={`${activeItem === item.name ? "bg-white" : "bg-white/15"} relative p-2 md:p-3 cursor-pointer rounded-full shadow-lg hover:scale-110 transition-all ease-in duration-150`}>
              {item.notificationCount && (
                <Badge className="bg-yellow-500 text-white text-xs absolute -top-2 -right-2 md:-top-3 md:-right-3">
                  {item.notificationCount}
                </Badge>
              )}
              <item.icon 
                size={20} 
                color={`${activeItem === item.name ? "blue" : "white"}`} 
                className="md:w-auto md:h-auto"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Section - Logout */}
      <div className="h-full w-full flex items-end py-10 md:py-20 justify-center">
        <div className="flex items-center justify-center w-full">
          <LogOut color="white" size={20} className="md:w-auto md:h-auto" />
        </div>
      </div>
    </div>
  )
}
