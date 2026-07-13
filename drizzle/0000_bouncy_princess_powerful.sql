CREATE TABLE "pickup_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"item" text NOT NULL,
	"customer_name" text NOT NULL,
	"pickup_time" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" text DEFAULT 'received' NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
