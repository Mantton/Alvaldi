"use client";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
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
import { createNewRecordLabel } from "@/api";
import ImageSelector from "@/components/alv/ImageSelector";
import { uploadMedia } from "@/api/media";
import { useQueryClient } from "@tanstack/react-query";

// REFERENCE : https://ui.shadcn.com/docs/components/form

type ComponentProps = {
  /**
   * Called to close the parent dialog this form is enslaved to.
   */
  close?: () => void;
};

export default function CreateRecordLabelForm({ close }: ComponentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const iconImageReference = useRef<HTMLInputElement>(null);
  const bannerImageReference = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Define Form
  const form = useForm<CreateRecordLabelRequest>({
    resolver: zodResolver(CreateRecordLabelRequestSchema),
  });

  // Define Submit Handler
  async function onSubmit({ name }: CreateRecordLabelRequest) {
    setIsLoading(true);

    try {
      // Upload Icon Image
      let iconImageId: string | undefined;
      const iconImage = iconImageReference.current?.files?.[0];
      if (iconImage) {
        // TODO: File Size validation
        iconImageId = await uploadMedia(iconImage);
      }

      // Upload Banner Image
      let bannerImageId: string | undefined;
      const bannerImage = bannerImageReference.current?.files?.[0];
      if (bannerImage) {
        // TODO: File Size validation
        bannerImageId = await uploadMedia(bannerImage);
      }

      // Submit Request
      const request: CreateRecordLabelRequest = {
        name,
        icon: iconImageId,
        banner: bannerImageId,
      };
      await createNewRecordLabel(request);
      close?.();
      queryClient.invalidateQueries({ queryKey: ["workshop.getRecordLabels"] });
    } catch (error) {
      // TODO: Error Handling
      console.error(error);
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
                <Input placeholder="YG Entertainment" {...field} id="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Icon Image</FormLabel>
          <FormControl className="grid grid-cols-2">
            <ImageSelector id="icon" reference={iconImageReference} />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Banner Image</FormLabel>
          <FormControl className="grid grid-cols-2">
            <ImageSelector id="banner" reference={bannerImageReference} />
          </FormControl>
        </FormItem>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Label
        </Button>
      </form>
    </Form>
  );
}
