"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateRecordLabelForm from "./CreateRecordLabelForm";
import { useState } from "react";

export default function CreateRecordLabelDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Record Label</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Record Label</DialogTitle>
          <DialogDescription>
            Labels are required to add Artists & Cards.
          </DialogDescription>
        </DialogHeader>
        <CreateRecordLabelForm close={close} />
      </DialogContent>
    </Dialog>
  );
}
