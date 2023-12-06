import { Separator } from "@/components/ui/separator";
import ArtistsTableView from "@/components/workshop/artists/ArtistsTable";
import CreateArtistDialog from "@/components/workshop/artists/CreateArtistDialog";

export default function WorkShopLabelsPage() {
  return (
    <div className="container flex h-full flex-col py-4">
      <div className="flex justify-between pb-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Manage Artists
        </h1>

        <CreateArtistDialog />
      </div>
      <Separator />

      <div className="flex-1">
        <ArtistsTableView />
      </div>
    </div>
  );
}
