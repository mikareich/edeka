DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('Kasse');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shifts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"type" "type" NOT NULL,
	"location" text NOT NULL,
	"breaks" json NOT NULL
);
