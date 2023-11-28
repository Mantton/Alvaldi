CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(75) NOT NULL,
	"uploader_id" integer NOT NULL,
	CONSTRAINT "media_url_unique" UNIQUE("url")
);
--> statement-breakpoint
ALTER TABLE "record_labels" RENAME COLUMN "added_by" TO "creator_id";--> statement-breakpoint
ALTER TABLE "record_labels" DROP CONSTRAINT "record_labels_added_by_accounts_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "record_labels" ADD CONSTRAINT "record_labels_creator_id_accounts_id_fk" FOREIGN KEY ("creator_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media" ADD CONSTRAINT "media_uploader_id_accounts_id_fk" FOREIGN KEY ("uploader_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
