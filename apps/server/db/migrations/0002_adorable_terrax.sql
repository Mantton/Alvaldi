CREATE TABLE IF NOT EXISTS "admins" (
	"account_id" integer NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_account_id_unique" UNIQUE("account_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admins" ADD CONSTRAINT "admins_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
