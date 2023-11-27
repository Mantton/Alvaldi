CREATE TABLE IF NOT EXISTS "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider_id" varchar(36) NOT NULL,
	"points" integer DEFAULT 1000 NOT NULL,
	"handle" varchar(15) NOT NULL,
	"date_created" timestamp DEFAULT now(),
	"profile_image" varchar(150),
	CONSTRAINT "accounts_provider_id_unique" UNIQUE("provider_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "handle_unique_index" ON "accounts" ("handle");