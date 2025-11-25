import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface Props {
  title: string;
  description: string;
  open: boolean;

  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export const CustomDialogConfirm = ({
  title,
  description,
  open,
  onOpenChange,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="py-4">
            <p>{description}</p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">No</Button>
          </DialogClose>
          <Button onClick={onConfirm} type="button">
            Si
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
