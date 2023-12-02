"use client";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  CreateRecordLabelRequest,
  CreateRecordLabelRequestSchema,
} from "@alvaldi/common";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import { createNewRecordLabel } from "@/api";
// REFERENCE : https://ui.shadcn.com/docs/components/form

type ComponentProps = {
  /**
   * Called to close the parent dialog this form is enslaved to.
   */
  close?: () => void;
};

export default function CreateRecordLabelForm({ close }: ComponentProps) {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define Form
  const form = useForm<CreateRecordLabelRequest>({
    resolver: zodResolver(CreateRecordLabelRequestSchema),
  });

  // Define Submit Handler
  async function onSubmit(values: CreateRecordLabelRequest) {
    setIsLoading(true);
    try {
      const token = await getToken();
      if (!token) return;
      await createNewRecordLabel(values, token);
      close?.();
    } catch (error) {
      // TODO: Handle Error
      console.log(error);
    }
    setIsLoading(false);
  }

  // Build Form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label Name</FormLabel>
              <FormControl>
                <Input placeholder="YG Entertainment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            // TODO: Images
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add
        </Button>
      </form>
    </Form>
  );
}
