import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "hero_settings_margin" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_settings_width" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_margin" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_width" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "hero_settings_margin";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_width";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_margin";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_width";`)
}
