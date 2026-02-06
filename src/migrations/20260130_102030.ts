import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_locales" RENAME COLUMN "image_id" TO "icon_id";
  ALTER TABLE "services_locales" DROP CONSTRAINT "services_locales_image_id_media_id_fk";
  
  DROP INDEX "services_image_idx";
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_icon_idx" ON "services_locales" USING btree ("icon_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_locales" RENAME COLUMN "icon_id" TO "image_id";
  ALTER TABLE "services_locales" DROP CONSTRAINT "services_locales_icon_id_media_id_fk";
  
  DROP INDEX "services_icon_idx";
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_image_idx" ON "services_locales" USING btree ("image_id","_locale");`)
}
