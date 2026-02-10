import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "technologies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "technologies_locales" (
  	"title" varchar,
  	"image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "technologies_id" integer;
  ALTER TABLE "technologies" ADD CONSTRAINT "technologies_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "technologies_locales" ADD CONSTRAINT "technologies_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "technologies_locales" ADD CONSTRAINT "technologies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "technologies_category_idx" ON "technologies" USING btree ("category_id");
  CREATE UNIQUE INDEX "technologies_slug_idx" ON "technologies" USING btree ("slug");
  CREATE INDEX "technologies_updated_at_idx" ON "technologies" USING btree ("updated_at");
  CREATE INDEX "technologies_created_at_idx" ON "technologies" USING btree ("created_at");
  CREATE INDEX "technologies_image_idx" ON "technologies_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "technologies_locales_locale_parent_id_unique" ON "technologies_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_technologies_id_idx" ON "payload_locked_documents_rels" USING btree ("technologies_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "technologies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "technologies_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "technologies" CASCADE;
  DROP TABLE "technologies_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_technologies_fk";
  
  DROP INDEX "payload_locked_documents_rels_technologies_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "technologies_id";`)
}
