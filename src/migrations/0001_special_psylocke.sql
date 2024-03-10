ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE varchar(35);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE varchar(55);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");