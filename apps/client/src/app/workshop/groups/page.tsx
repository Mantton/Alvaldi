import { Separator } from "@/components/ui/separator";
import CreateGroupDialog from "@/components/workshop/group/CreateGroupDialog";
import GroupTableView from "@/components/workshop/group/GroupTable";

export default function WorkShopGroupsPage() {
  return (
    <div className="container flex h-full flex-col py-4">
      <div className="flex justify-between pb-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Manage Groups
        </h1>

        <CreateGroupDialog />
      </div>
      <Separator />
      <GroupTableView />
    </div>
  );
}
