import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";


export function BookClassDialog({
    classData,
    bookClassClick,
  }: {
    classData: any;
    bookClassClick: any;
  }) {
    return (
      <DialogContent className="sm:max-w-[700px] w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Class</DialogTitle>
          <DialogDescription>
            View a class. Book if you're interested.
          </DialogDescription>
        </DialogHeader>
        <>


        </>
         <DialogFooter>
        <Button type="button" onClick={bookClassClick}>
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
      );
    }
    