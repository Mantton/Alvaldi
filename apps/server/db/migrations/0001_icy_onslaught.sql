ALTER TABLE "accounts" ADD COLUMN "points" integer DEFAULT 1000 NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "handle" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "date_created" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "profile_image" varchar(150);--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_handle_unique" UNIQUE("handle");