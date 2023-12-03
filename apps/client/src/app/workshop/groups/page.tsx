import { Separator } from "@/components/ui/separator";
import CreateGroupDialog from "@/components/workshop/group/CreateGroupDialog";

export default function WorkShopGroupsPage() {
  return (
    <div className="h-full container py-4 flex flex-col">
      <div className="flex justify-between pb-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Manage Groups
        </h1>

        <CreateGroupDialog />
      </div>
      <Separator />
    </div>
  );
}
