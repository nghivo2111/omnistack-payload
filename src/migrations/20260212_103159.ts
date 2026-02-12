import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "hero_settings_media_border_radius" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_media_border_radius" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "hero_settings_media_border_radius";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_media_border_radius";`)
}
