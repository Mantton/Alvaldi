import CreateRecordLabelDialog from "@/components/workshop/label/CreateRecordLabelDialog";
import RecordLabelTableView from "@/components/workshop/label/RecordLabelTable";
import { Separator } from "@/components/ui/separator";

export default function WorkShopLabelsPage() {
  return (
    <div className="h-full container py-4 flex flex-col">
      <div className="flex justify-between pb-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Manage Labels
        </h1>

        <CreateRecordLabelDialog />
      </div>
      <Separator />

      <div className="flex-1">
        <RecordLabelTableView />
      </div>
    </div>
  );
}
