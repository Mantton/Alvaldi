DO $$ BEGIN CREATE TYPE "groupGender" AS ENUM('boy', 'girl');
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"collectable_id" integer NOT NULL,
	"mint_date" timestamp DEFAULT now() NOT NULL,
	"owner_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artist_packs" (
	"pack_id" integer NOT NULL,
	"artist_id" integer NOT NULL,
	CONSTRAINT "artist_packs_pack_id_unique" UNIQUE("pack_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "era_packs" (
	"id" integer NOT NULL,
	"era_id" integer NOT NULL,
	CONSTRAINT "era_packs_id_unique" UNIQUE("id"),
	CONSTRAINT "era_packs_era_id_unique" UNIQUE("era_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_packs" (
	"id" integer NOT NULL,
	"group_table" integer NOT NULL,
	CONSTRAINT "group_packs_id_unique" UNIQUE("id"),
	CONSTRAINT "group_packs_group_table_unique" UNIQUE("group_table")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "packs" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer NOT NULL,
	"rarity" "rarity" NOT NULL,
	"minted_at" timestamp DEFAULT now() NOT NULL,
	"is_consumed" boolean DEFAULT false NOT NULL,
	"group_gender" "groupGender"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "record_label_packs" (
	"id" integer NOT NULL,
	"label_id" integer NOT NULL,
	CONSTRAINT "record_label_packs_id_unique" UNIQUE("id"),
	CONSTRAINT "record_label_packs_label_id_unique" UNIQUE("label_id")
);
--> statement-breakpoint
ALTER TABLE "accounts"
ALTER COLUMN "points"
SET DEFAULT 1000;
--> statement-breakpoint
ALTER TABLE "groups"
ADD COLUMN "group_gender" "groupGender";
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "cards"
ADD CONSTRAINT "cards_collectable_id_collectables_id_fk" FOREIGN KEY ("collectable_id") REFERENCES "collectables"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "cards"
ADD CONSTRAINT "cards_owner_id_accounts_id_fk" FOREIGN KEY ("owner_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "artist_packs"
ADD CONSTRAINT "artist_packs_pack_id_packs_id_fk" FOREIGN KEY ("pack_id") REFERENCES "packs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "artist_packs"
ADD CONSTRAINT "artist_packs_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "era_packs"
ADD CONSTRAINT "era_packs_id_packs_id_fk" FOREIGN KEY ("id") REFERENCES "packs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "era_packs"
ADD CONSTRAINT "era_packs_era_id_eras_id_fk" FOREIGN KEY ("era_id") REFERENCES "eras"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "group_packs"
ADD CONSTRAINT "group_packs_id_packs_id_fk" FOREIGN KEY ("id") REFERENCES "packs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "group_packs"
ADD CONSTRAINT "group_packs_group_table_groups_id_fk" FOREIGN KEY ("group_table") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "packs"
ADD CONSTRAINT "packs_owner_id_accounts_id_fk" FOREIGN KEY ("owner_id") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "record_label_packs"
ADD CONSTRAINT "record_label_packs_id_packs_id_fk" FOREIGN KEY ("id") REFERENCES "packs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "record_label_packs"
ADD CONSTRAINT "record_label_packs_label_id_record_labels_id_fk" FOREIGN KEY ("label_id") REFERENCES "record_labels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;