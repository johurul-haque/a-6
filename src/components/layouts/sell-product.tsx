import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BadgeDollarSign } from 'lucide-react';

export function SellProduct() {
  return (
    <D.Dialog>
      <D.DialogTrigger>
        <Button
          variant={'default'}
          className="py-1 h-auto text-sm rounded flex gap-1.5"
        >
          <BadgeDollarSign className="size-4" />
          Sell
        </Button>
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
  );
}
