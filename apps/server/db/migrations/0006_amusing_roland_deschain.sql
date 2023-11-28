ALTER TABLE "record_labels" ADD COLUMN "banner_image_id" integer;--> statement-breakpoint
ALTER TABLE "record_labels" ADD COLUMN "icon_image_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "record_labels" ADD CONSTRAINT "record_labels_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "record_labels" ADD CONSTRAINT "record_labels_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
