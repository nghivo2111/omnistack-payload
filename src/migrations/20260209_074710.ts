import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories_locales" ADD COLUMN "icon_id" integer;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "categories_icon_idx" ON "categories_locales" USING btree ("icon_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories_locales" DROP CONSTRAINT "categories_locales_icon_id_media_id_fk";
  
  DROP INDEX "categories_icon_idx";
  ALTER TABLE "categories_locales" DROP COLUMN "icon_id";`)
}
