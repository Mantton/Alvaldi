import CreateRecordLabelDialog from "@/components/workshop/label/CreateRecordLabelDialog";
import RecordLabelTable from "@/components/workshop/label/RecordLabelTable";

export default function WorkShopLabelsPage() {
  return (
    <div className="h-full container py-4 flex flex-col">
      <div className="flex justify-between pb-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Manage Labels
        </h1>

        <CreateRecordLabelDialog />
      </div>
      <hr />

      <div className="flex-1">
        <RecordLabelTable />
      </div>
    </div>
  );
}
