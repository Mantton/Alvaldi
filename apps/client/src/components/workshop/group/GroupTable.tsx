"use client";
import { workShopGetAllGroups } from "@/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { BasicGroupInfo, BasicRecordLabel } from "@alvaldi/common";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function GroupTableView() {
  const { isPending, error, data } = useQuery({
    queryKey: ["workshop.getGroups"],
    queryFn: () => workShopGetAllGroups(),
  });

  if (isPending)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />{" "}
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="mt-4">
      <TableView items={data} />
    </div>
  );
}

type Props = { items: BasicGroupInfo[] };
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
        <div className="relative h-12 w-12 rounded-full bg-slate-100">
          {data.iconImageUrl && (
            <Image
              src={data.iconImageUrl}
              alt="icon"
              fill
              className="rounded-full object-cover"
            />
          )}
        </div>
      </TableCell>
      <TableCell className="text-lg font-bold">{data.name}</TableCell>
      <TableCell className="w-[50px] text-right"></TableCell>
    </TableRow>
  );
}
