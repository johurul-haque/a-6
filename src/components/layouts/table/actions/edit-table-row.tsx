import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';

export function EditTableRow() {
  return (
    <>
      <D.Dialog>
        <D.DialogTrigger className="flex items-center justify-between w-full">
          Edit
          <DropdownMenuShortcut>
            <Edit className="size-4 stroke-current" />
          </DropdownMenuShortcut>
        </D.DialogTrigger>
        <D.DialogContent className="sm:max-w-[425px]">
          <D.DialogHeader>
            <D.DialogTitle>Edit profile</D.DialogTitle>
            <D.DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </D.DialogDescription>
          </D.DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <D.DialogFooter>
            <Button type="submit">Save changes</Button>
          </D.DialogFooter>
        </D.DialogContent>
      </D.Dialog>
    </>
  );
}
