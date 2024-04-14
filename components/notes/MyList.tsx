import { Eye, EyeOff, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cookies } from "next/headers"
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"
import SubmitButton from "../auth/submit-button"
import { deleteNoteActions } from "@/app/(notes)/actions"

export default async function MyList() {
  const supabase = createServerComponentClient({ cookies })

  // await new Promise((resolve) => setTimeout(resolve, 1000))

  const { data: user } = await supabase.auth.getUser()
  if (!user) {
    return null
  }
  const { data: todos } = await supabase.from("todos").select("*")

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-CA") // 'en-CA' usa el formato yyyy-MM-dd
  }

  return (
    // <Suspense fallback={<SkeletonList />}>
    <main className="animate-in flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center mb-10">
        <h1 className="text-lg font-semibold md:text-2xl">
          This is your list {":)"}
        </h1>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>Manage your notes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Watch</TableHead>
                  <TableHead>Email to</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Dispatch date
                  </TableHead>

                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos!.map((todo: any) => (
                  <TableRow key={todo.id}>
                    <TableCell className="font-medium line-clamp-1">
                      <span className="truncate">{todo.subject}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {todo.seen ? (
                          <Eye className="text-green-400" />
                        ) : (
                          <EyeOff className="text-red-400" />
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>{todo.email_to}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(todo.dispatch_date)}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <form action={deleteNoteActions}>
                            <input type="hidden" name="id" value={todo.id} />

                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button variant="ghost" size="sm">
                                Eliminar
                              </Button>
                            </DropdownMenuItem>
                          </form>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
    // </Suspense>
  )
}
