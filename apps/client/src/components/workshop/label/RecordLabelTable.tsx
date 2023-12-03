"use client";
import { getWorkshopRecordLabelList } from "@/api";
import { BasicRecordLabel } from "@alvaldi/common";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import RecordLabelTableViewCellMenu from "./RecordLabelTableViewCellMenu";

export default function RecordLabelTableView() {
  const { isPending, error, data } = useQuery({
    queryKey: ["workshop.getRecordLabels"],
    queryFn: () => getWorkshopRecordLabelList(),
  });

  if (isPending)
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />{" "}
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="mt-4">
      <TableView items={data.data} />
    </div>
  );
}

type Props = { items: BasicRecordLabel[] };

function TableView({ items }: Props) {
  return (
    <>
      <Table>
        <TableCaption>Current Record Labels</TableCaption>
        <TableBody>
          {items.map((item) => {
            return <TableViewCell key={item.id} data={item} />;
          })}
        </TableBody>
      </Table>
    </>
  );
}

function TableViewCell({ data }: { data: BasicRecordLabel }) {
  return (
    <TableRow>
      <TableCell colSpan={1} className="w-[100px]">
        <div className="bg-slate-100 h-12 w-12 rounded-full relative">
          {data.iconImageUrl && (
            <Image
              src={data.iconImageUrl}
              alt="icon"
              fill
              className="object-cover rounded-full"
            />
          )}
        </div>
      </TableCell>
      <TableCell className="text-lg font-bold">{data.name}</TableCell>
      <TableCell className="text-right w-[50px]">
        <RecordLabelTableViewCellMenu id={data.id} />
      </TableCell>
    </TableRow>
  );
}
