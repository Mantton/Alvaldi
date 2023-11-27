CREATE TABLE IF NOT EXISTS "record_labels" (
	"id" serial PRIMARY KEY NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	"name" varchar(120) NOT NULL,
	"added_by" integer NOT NULL,
	CONSTRAINT "record_labels_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "record_labels" ADD CONSTRAINT "record_labels_added_by_accounts_id_fk" FOREIGN KEY ("added_by") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
