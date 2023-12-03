"use client";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import {
  BasicRecordLabel,
  CreateGroupRequest,
  CreateGroupRequestSchema,
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
import ImageSelector from "@/components/alv/ImageSelector";
import { uploadMedia } from "@/api/media";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWorkshopRecordLabelList, workShopCreateNewGroup } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
// REFERENCE : https://ui.shadcn.com/docs/components/form

type ComponentProps = {
  /**
   * Called to close the parent dialog this form is enslaved to.
   */
  close?: () => void;
};

export default function CreateGroupForm({ close }: ComponentProps) {
  // Core
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const {
    isPending: isLoadingLabels,
    error,
    data: recordLabels,
  } = useQuery({
    queryKey: ["workshop.getRecordLabels"],
    queryFn: () => getWorkshopRecordLabelList(),
  });

  const [artistSelections, setArtistSelections] = useState<Set<number>>(
    new Set()
  );

  // Images
  const iconImageReference = useRef<HTMLInputElement>(null);
  const bannerImageReference = useRef<HTMLInputElement>(null);

  // Label
  const [recordLabel, setRecordLabel] = useState<BasicRecordLabel | null>(null);

  // Define Form
  const form = useForm<CreateGroupRequest>({
    resolver: zodResolver(CreateGroupRequestSchema),
  });

  // Define Submit Handler
  async function onSubmit({ name, label }: CreateGroupRequest) {
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

      const request: CreateGroupRequest = {
        name,
        label,
        icon: iconImageId,
        banner: bannerImageId,
      };
      // Submit Request
      await workShopCreateNewGroup(request);

      close?.();
      queryClient.invalidateQueries({ queryKey: ["workshop.getGroups"] });
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
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input placeholder="BLACKPINK" {...field} id="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Record Label</FormLabel>
              <Select
                onValueChange={(v) => field.onChange(parseInt(v))}
                disabled={!recordLabels || isLoadingLabels}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Label" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {recordLabels &&
                    !isLoadingLabels &&
                    recordLabels.data.map((label) => {
                      return (
                        <SelectItem value={label.id.toString()} key={label.id}>
                          <div className="flex gap-2 items-center">
                            <div className="h-8 w-8 rounded-full  bg-slate-200 relative">
                              {label.iconImageUrl && (
                                <Image
                                  src={label.iconImageUrl}
                                  alt="icon image"
                                  fill
                                  className="object-fill rounded-full"
                                />
                              )}
                            </div>
                            <p className="font-medium">{label.name}</p>
                          </div>
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artists</FormLabel>

              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

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
          Add Group
        </Button>
      </form>
    </Form>
  );
}
