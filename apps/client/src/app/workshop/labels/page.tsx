import CreateRecordLabelDialog from "@/components/workshop/label/CreateRecordLabelDialog";

export default function WorkShopLabelsPage() {
  return (
    <div className="container py-4">
      <div className="flex justify-between pb-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Manage Labels
        </h1>

        <CreateRecordLabelDialog />
      </div>
      <hr />

      <div>
        <ol></ol>
      </div>
    </div>
  );
}
