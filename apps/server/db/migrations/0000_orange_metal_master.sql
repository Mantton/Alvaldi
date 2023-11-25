CREATE TABLE IF NOT EXISTS "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider_id" varchar(36) NOT NULL,
	CONSTRAINT "accounts_provider_id_unique" UNIQUE("provider_id")
);
