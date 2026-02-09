import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "solutions" RENAME COLUMN "categories_id" TO "category_id";
  ALTER TABLE "solutions" DROP CONSTRAINT "solutions_categories_id_categories_id_fk";
  
  DROP INDEX "solutions_categories_idx";
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "solutions_category_idx" ON "solutions" USING btree ("category_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "solutions" RENAME COLUMN "category_id" TO "categories_id";
  ALTER TABLE "solutions" DROP CONSTRAINT "solutions_category_id_categories_id_fk";
  
  DROP INDEX "solutions_category_idx";
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "solutions_categories_idx" ON "solutions" USING btree ("categories_id");`)
}
