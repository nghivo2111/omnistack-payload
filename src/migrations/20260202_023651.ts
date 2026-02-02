import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_carousel_items" RENAME TO "pages_blocks_carousel_slides_items";
  ALTER TABLE "_pages_v_blocks_carousel_items" RENAME TO "_pages_v_blocks_carousel_slides_items";
  ALTER TABLE "pages_blocks_carousel_slides_items" DROP CONSTRAINT "pages_blocks_carousel_items_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" DROP CONSTRAINT "_pages_v_blocks_carousel_items_parent_id_fk";
  
  DROP INDEX "pages_blocks_carousel_items_order_idx";
  DROP INDEX "pages_blocks_carousel_items_parent_id_idx";
  DROP INDEX "pages_blocks_carousel_items_locale_idx";
  DROP INDEX "_pages_v_blocks_carousel_items_order_idx";
  DROP INDEX "_pages_v_blocks_carousel_items_parent_id_idx";
  DROP INDEX "_pages_v_blocks_carousel_items_locale_idx";
  ALTER TABLE "pages_blocks_carousel_slides" ADD CONSTRAINT "pages_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_carousel_slides_order_idx" ON "pages_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_slides_parent_id_idx" ON "pages_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_slides_locale_idx" ON "pages_blocks_carousel_slides" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_carousel_slides_order_idx" ON "_pages_v_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_slides_parent_id_idx" ON "_pages_v_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_slides_locale_idx" ON "_pages_v_blocks_carousel_slides" USING btree ("_locale");
  ALTER TABLE "pages_blocks_carousel_slides_items" ADD CONSTRAINT "pages_blocks_carousel_slides_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" ADD CONSTRAINT "_pages_v_blocks_carousel_slides_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_carousel_slides"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_carousel_slides_items_order_idx" ON "pages_blocks_carousel_slides_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_slides_items_parent_id_idx" ON "pages_blocks_carousel_slides_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_slides_items_locale_idx" ON "pages_blocks_carousel_slides_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_carousel_slides_items_order_idx" ON "_pages_v_blocks_carousel_slides_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_slides_items_parent_id_idx" ON "_pages_v_blocks_carousel_slides_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_slides_items_locale_idx" ON "_pages_v_blocks_carousel_slides_items" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_carousel_slides" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_carousel_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_slides" CASCADE;
  ALTER TABLE "pages_blocks_carousel_slides_items" RENAME TO "pages_blocks_carousel_items";
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" RENAME TO "_pages_v_blocks_carousel_items";
  ALTER TABLE "pages_blocks_carousel_items" DROP CONSTRAINT "pages_blocks_carousel_slides_items_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_carousel_items" DROP CONSTRAINT "_pages_v_blocks_carousel_slides_items_parent_id_fk";
  
  DROP INDEX "pages_blocks_carousel_slides_items_order_idx";
  DROP INDEX "pages_blocks_carousel_slides_items_parent_id_idx";
  DROP INDEX "pages_blocks_carousel_slides_items_locale_idx";
  DROP INDEX "_pages_v_blocks_carousel_slides_items_order_idx";
  DROP INDEX "_pages_v_blocks_carousel_slides_items_parent_id_idx";
  DROP INDEX "_pages_v_blocks_carousel_slides_items_locale_idx";
  ALTER TABLE "pages_blocks_carousel_items" ADD CONSTRAINT "pages_blocks_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_items" ADD CONSTRAINT "_pages_v_blocks_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_carousel_items_order_idx" ON "pages_blocks_carousel_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_items_parent_id_idx" ON "pages_blocks_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_items_locale_idx" ON "pages_blocks_carousel_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_carousel_items_order_idx" ON "_pages_v_blocks_carousel_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_items_parent_id_idx" ON "_pages_v_blocks_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_items_locale_idx" ON "_pages_v_blocks_carousel_items" USING btree ("_locale");`)
}
