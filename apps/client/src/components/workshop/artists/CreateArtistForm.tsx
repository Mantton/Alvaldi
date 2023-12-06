"use client";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import {
  CreateArtistRequest,
  CreateArtistRequestSchema,
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
import { getWorkshopRecordLabelList, workShopGetAllGroups } from "@/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { workShopCreateNewArtist } from "@/api/workshop/artists";
import { MultiSelectComboBox } from "@/components/alv/MultiSelectComboBox";
// REFERENCE : https://ui.shadcn.com/docs/components/form

type ComponentProps = {
  /**
   * Called to close the parent dialog this form is enslaved to.
   */
  close?: () => void;
};

export default function CreateArtistForm({ close }: ComponentProps) {
  // Core
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const labelsQuery = useQuery({
    queryKey: ["workshop.getRecordLabels"],
    queryFn: () => getWorkshopRecordLabelList(),
  });

  // Images
  const iconImageReference = useRef<HTMLInputElement>(null);
  const bannerImageReference = useRef<HTMLInputElement>(null);

  // Define Form
  const form = useForm<CreateArtistRequest>({
    resolver: zodResolver(CreateArtistRequestSchema),
  });

  const artistsQuery = useQuery({
    queryKey: ["workshop.getArtistsForLabel", selectedLabel],
    enabled: !!selectedLabel,
    queryFn: () => workShopGetAllGroups(selectedLabel ?? undefined),
  });

  // Define Submit Handler
  async function onSubmit({ stageName, label }: CreateArtistRequest) {
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

      const request: CreateArtistRequest = {
        stageName,
        label,
        icon: iconImageId,
        banner: bannerImageId,
      };
      // Submit Request
      await workShopCreateNewArtist(request);

      close?.();
      queryClient.invalidateQueries({ queryKey: ["workshop.getArtists"] });
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
          name="stageName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stage Name</FormLabel>
              <FormControl>
                <Input placeholder="Rosé" {...field} id="stageName" />
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
                onValueChange={(v) => {
                  const id = parseInt(v);
                  field.onChange(id);
                  setSelectedLabel(id);
                }}
                disabled={!labelsQuery.data || labelsQuery.isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Label" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {labelsQuery.data?.data &&
                    !labelsQuery.isLoading &&
                    labelsQuery.data.data.map((label) => {
                      return (
                        <SelectItem value={label.id.toString()} key={label.id}>
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8  rounded-full bg-slate-200">
                              {label.iconImageUrl && (
                                <Image
                                  src={label.iconImageUrl}
                                  alt="icon image"
                                  fill
                                  className="rounded-full object-fill"
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
          name="groups"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groups</FormLabel>
              <FormControl>
                <MultiSelectComboBox
                  title="Groups"
                  items={artistsQuery.data ?? []}
                  onSelectionChanged={field.onChange}
                  disabled={!artistsQuery.isFetched}
                  cell={(item) => (
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 rounded-full bg-slate-200">
                        {item.iconImageUrl && (
                          <Image
                            src={item.iconImageUrl}
                            alt="icon"
                            fill
                            className="rounded-full object-cover"
                          />
                        )}
                      </div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                  )}
                />
              </FormControl>

              <div className="flex flex-wrap items-center gap-4">
                {(artistsQuery.data ?? [])
                  .filter((v) => form.getValues("groups")?.includes(v.id))
                  .map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex h-24 w-24 flex-col items-center justify-center gap-1"
                      >
                        <div className="relative h-12 w-12 rounded-full bg-slate-200">
                          {item.iconImageUrl && (
                            <Image
                              src={item.iconImageUrl}
                              alt="icon"
                              fill
                              className="rounded-full object-cover"
                            />
                          )}
                        </div>
                        <p className="font-medium">{item.name}</p>
                      </div>
                    );
                  })}
              </div>
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
          Add Artist
        </Button>
      </form>
    </Form>
  );
}
