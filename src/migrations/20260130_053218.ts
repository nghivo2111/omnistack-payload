import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_locales" ADD COLUMN "icon_id" integer;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_icon_idx" ON "header_locales" USING btree ("icon_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_locales" DROP CONSTRAINT "header_locales_icon_id_media_id_fk";
  
  DROP INDEX "header_icon_idx";
  ALTER TABLE "header_locales" DROP COLUMN "icon_id";`)
}
