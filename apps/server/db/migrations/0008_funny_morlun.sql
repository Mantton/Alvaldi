CREATE TABLE IF NOT EXISTS "artist_eras" (
	"artist_id" integer NOT NULL,
	"era_id" integer NOT NULL,
	CONSTRAINT artist_eras_artist_id_era_id PRIMARY KEY("artist_id","era_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eras" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"creator_id" integer NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"icon_image_id" integer,
	"banner_image_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_eras" (
	"group_id" integer NOT NULL,
	"era_id" integer NOT NULL,
	CONSTRAINT group_eras_group_id_era_id PRIMARY KEY("group_id","era_id")
);
--> statement-breakpoint
ALTER TABLE "group_artists" ALTER COLUMN "group_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "group_artists" ALTER COLUMN "artist_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artist_eras" ADD CONSTRAINT "artist_eras_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artist_eras" ADD CONSTRAINT "artist_eras_era_id_eras_id_fk" FOREIGN KEY ("era_id") REFERENCES "eras"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eras" ADD CONSTRAINT "eras_creator_id_accounts_id_fk" FOREIGN KEY ("creator_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eras" ADD CONSTRAINT "eras_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eras" ADD CONSTRAINT "eras_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_eras" ADD CONSTRAINT "group_eras_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_eras" ADD CONSTRAINT "group_eras_era_id_eras_id_fk" FOREIGN KEY ("era_id") REFERENCES "eras"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
