import type { User } from "@/types/user"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, UserIcon, Edit, ArrowLeft, Home, Hash, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { EditUserModal } from "./EditUserModal"

type Props = {
  user: User;
  refetch: () => void;
}

export function UserDetails({ user, refetch }: Props) {

  const navigate = useNavigate();


  const getInitials = (firstname: string, lastname: string) => {
    return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase()
  }

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
  }


  const onBack = () => {
     navigate("/admin/users"); 
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">User Details</h1>
            <p className="text-muted-foreground">View and manage user information</p>
          </div>
        </div>
        <div className="flex gap-2">
          <EditUserModal user={user} refetch={refetch}>
              <Button>
                <Edit />
                Edit User
              </Button>
          </EditUserModal>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name.firstname}${user.name.lastname}`}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                  {getInitials(user.name.firstname, user.name.lastname)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">
              {user.name.firstname} {user.name.lastname}
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-1">
              <UserIcon className="h-3 w-3" />@{user.username}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1">
                <Hash className="h-3 w-3" />
                ID: {user.id}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Shield className="h-3 w-3" />
                Active
              </Badge>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span className="text-muted-foreground">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Phone:</span>
                <span className="text-muted-foreground">{formatPhone(user.phone)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Street Address</p>
                <p className="text-sm">
                  {user.address.number} {user.address.street}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">City</p>
                <p className="text-sm capitalize">{user.address.city}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">ZIP Code</p>
                <p className="text-sm font-mono">{user.address.zipcode}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Full Address</p>
              <p className="text-sm bg-muted p-3 rounded-md">
                {user.address.number} {user.address.street}
                <br />
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card className="py-0">
          <CardContent className="space-y-4 h-full px-0">
                <iframe
                  className="w-full h-full rounded-md"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(user.address.city)}&output=embed`}
                  allowFullScreen
                />
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription>Additional account details and metadata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded">{user.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Username</p>
                <p className="text-sm">@{user.username}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Email Verified</p>
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                <Badge variant="default" className="text-xs">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

