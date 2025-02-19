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
  import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";

export function BookClassDialog({
    classData,
    bookClassClick,
    triggerRef
  }: {
    classData: any;
    bookClassClick: any;
    triggerRef: any;
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
        <Label htmlFor="class name">{classData.name}</Label>
        <Label htmlFor="class name">{classData.description}</Label>
        <Table className="w-full border rounded-lg mt-2">
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">Instructor</TableCell>
          <TableCell>{classData.instructor?.name || "TBA"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Duration</TableCell>
          <TableCell>{classData.duration} mins</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Skill Level</TableCell>
          <TableCell>{classData.skillLevel || "All Levels"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Intensity</TableCell>
          <TableCell>{classData.intensity || "Moderate"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Recurrence</TableCell>
          <TableCell>{classData.recurrence || "Once"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Days</TableCell>
          <TableCell>{classData.days.join(", ")}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Start Time</TableCell>
          <TableCell>{classData.time}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Capacity</TableCell>
          <TableCell>{classData.capacity}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-semibold">Start Time</TableCell>
          <TableCell>{classData.time}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Room</TableCell>
          <TableCell>{classData.room || "Not Assigned yet"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>

        </>
         <DialogFooter>
        <Button type="button" onClick={bookClassClick} ref={triggerRef}>
          Book
        </Button>
      </DialogFooter>
    </DialogContent>
      );
    }
    