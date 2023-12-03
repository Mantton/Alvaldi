"use client";
import { getWorkshopRecordLabelList } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function RecordLabelTable() {
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
    <div>
      {data.data.map((record) => {
        return <div key={record.id}>{record.name}</div>;
      })}
    </div>
  );
}
