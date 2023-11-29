CREATE TABLE IF NOT EXISTS "artists" (
	"id" serial PRIMARY KEY NOT NULL,
	"stage_name" varchar NOT NULL,
	"icon_image_id" integer,
	"banner_image_id" integer,
	"creator_id" integer,
	"date_added" timestamp DEFAULT now(),
	"label_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"label_id" integer NOT NULL,
	"eng_name" varchar NOT NULL,
	"creator_id" integer NOT NULL,
	"icon_image_id" integer,
	"banner_image_id" integer,
	"date_added" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_artists" (
	"group_id" integer,
	"artist_id" integer,
	CONSTRAINT group_artists_group_id_artist_id PRIMARY KEY("group_id","artist_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artists" ADD CONSTRAINT "artists_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artists" ADD CONSTRAINT "artists_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artists" ADD CONSTRAINT "artists_creator_id_accounts_id_fk" FOREIGN KEY ("creator_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artists" ADD CONSTRAINT "artists_label_id_record_labels_id_fk" FOREIGN KEY ("label_id") REFERENCES "record_labels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groups" ADD CONSTRAINT "groups_label_id_record_labels_id_fk" FOREIGN KEY ("label_id") REFERENCES "record_labels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groups" ADD CONSTRAINT "groups_creator_id_accounts_id_fk" FOREIGN KEY ("creator_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groups" ADD CONSTRAINT "groups_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groups" ADD CONSTRAINT "groups_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_artists" ADD CONSTRAINT "group_artists_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_artists" ADD CONSTRAINT "group_artists_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
