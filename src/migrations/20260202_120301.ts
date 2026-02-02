import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_media_content" ADD COLUMN "settings_gap" varchar;
  ALTER TABLE "_pages_v_blocks_media_content" ADD COLUMN "settings_gap" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_media_content" DROP COLUMN "settings_gap";
  ALTER TABLE "_pages_v_blocks_media_content" DROP COLUMN "settings_gap";`)
}
