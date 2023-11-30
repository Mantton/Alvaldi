DO $$ BEGIN
 CREATE TYPE "rarity" AS ENUM('common', 'superior', 'rare', 'elite', 'legendary', 'celestial');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artist_collectables" (
	"artist_id" integer NOT NULL,
	"collectable_id" integer NOT NULL,
	CONSTRAINT artist_collectables_artist_id_collectable_id PRIMARY KEY("artist_id","collectable_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collectables" (
	"id" serial PRIMARY KEY NOT NULL,
	"era_id" integer NOT NULL,
	"media_id" integer NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	"creator_id" integer NOT NULL,
	"rarity" "rarity" NOT NULL,
	CONSTRAINT "collectables_media_id_unique" UNIQUE("media_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_collectables" (
	"group_id" integer NOT NULL,
	"collectable_id" integer NOT NULL,
	CONSTRAINT group_collectables_group_id_collectable_id PRIMARY KEY("group_id","collectable_id")
);
--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "date_uploaded" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artist_collectables" ADD CONSTRAINT "artist_collectables_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artist_collectables" ADD CONSTRAINT "artist_collectables_collectable_id_collectables_id_fk" FOREIGN KEY ("collectable_id") REFERENCES "collectables"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collectables" ADD CONSTRAINT "collectables_era_id_eras_id_fk" FOREIGN KEY ("era_id") REFERENCES "eras"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collectables" ADD CONSTRAINT "collectables_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collectables" ADD CONSTRAINT "collectables_creator_id_accounts_id_fk" FOREIGN KEY ("creator_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_collectables" ADD CONSTRAINT "group_collectables_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_collectables" ADD CONSTRAINT "group_collectables_collectable_id_collectables_id_fk" FOREIGN KEY ("collectable_id") REFERENCES "collectables"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
