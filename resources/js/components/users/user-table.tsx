import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, Shield, Trash2, UserCog, User as UserIcon } from 'lucide-react';
import { User } from './types';

interface UserTableProps {
    users: User[];
    loading: boolean;
    setEditingUser: (user: User) => void;
    setIsCreateOpen: (open: boolean) => void;
    setDeleteDialog: (dialog: { open: boolean; user: User | null }) => void;
}

export function UserTable({
    users,
    loading,
    setEditingUser,
    setIsCreateOpen,
    setDeleteDialog,
}: UserTableProps) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="p-0" />
            <CardContent className="p-0">
                {loading ? (
                    <div className="flex h-[400px] flex-col items-center justify-center gap-2 text-muted-foreground">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        <p className="text-sm">Memuat data user...</p>
                    </div>
                ) : (
                    <>
                        {/* Table View (Desktop) */}
                        <div className="relative hidden w-full overflow-auto md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-1/3 pl-6">
                                            Nama
                                        </TableHead>
                                        <TableHead className="w-1/3 pl-6">
                                            Email
                                        </TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead className="pr-6 text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-32 text-center text-muted-foreground"
                                            >
                                                Tidak ada data user.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        users.map((user) => (
                                            <TableRow
                                                key={user.id}
                                                className="group hover:bg-muted/50"
                                            >
                                                <TableCell className="pl-6 font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                            <UserIcon className="h-4 w-4" />
                                                        </div>
                                                        <span>{user.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            user.role ===
                                                            'admin'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                        className="capitalize"
                                                    >
                                                        {user.role ===
                                                        'admin' ? (
                                                            <Shield className="mr-1 h-3 w-3" />
                                                        ) : (
                                                            <UserCog className="mr-1 h-3 w-3" />
                                                        )}
                                                        {user.role || 'user'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="pr-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                            onClick={() => {
                                                                setEditingUser(
                                                                    user,
                                                                );
                                                                setIsCreateOpen(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Edit
                                                            </span>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-red-600"
                                                            onClick={() =>
                                                                setDeleteDialog(
                                                                    {
                                                                        open: true,
                                                                        user,
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Hapus
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* List View (Mobile) */}
                        <div className="flex flex-col gap-4 bg-muted/10 p-4 md:hidden">
                            {users.length === 0 ? (
                                <div className="py-12 text-center text-sm text-muted-foreground">
                                    Tidak ada data.
                                </div>
                            ) : (
                                users.map((user) => (
                                    <Card key={user.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                        <UserIcon className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">
                                                            {user.name}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {user.email}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={
                                                        user.role === 'admin'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                    className="text-xs capitalize"
                                                >
                                                    {user.role || 'user'}
                                                </Badge>
                                            </div>
                                            <div className="mt-4 flex justify-end gap-2 border-t pt-4">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setEditingUser(user);
                                                        setIsCreateOpen(true);
                                                    }}
                                                >
                                                    <Edit className="mr-2 h-3.5 w-3.5" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        setDeleteDialog({
                                                            open: true,
                                                            user,
                                                        })
                                                    }
                                                >
                                                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                                                    Hapus
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
