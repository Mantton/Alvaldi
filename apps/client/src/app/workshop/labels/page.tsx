import { Button } from "@/components/ui/button";

export default function WorkShopLabelsPage() {
  return (
    <div className="container py-4">
      <div className="flex justify-between pb-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Manage Labels
        </h1>

        <Button>Create</Button>
      </div>
      <hr />

      <div>
        <ol></ol>
      </div>
    </div>
  );
}
