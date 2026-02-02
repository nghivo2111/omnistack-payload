import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides" ALTER COLUMN "direction" SET DEFAULT 'slide-to-left';
  ALTER TABLE "_pages_v_blocks_carousel_slides" ALTER COLUMN "direction" SET DEFAULT 'slide-to-left';
  ALTER TABLE "pages_blocks_media_content" ADD COLUMN "settings_margin" varchar;
  ALTER TABLE "_pages_v_blocks_media_content" ADD COLUMN "settings_margin" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides" ALTER COLUMN "direction" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_carousel_slides" ALTER COLUMN "direction" DROP DEFAULT;
  ALTER TABLE "pages_blocks_media_content" DROP COLUMN "settings_margin";
  ALTER TABLE "_pages_v_blocks_media_content" DROP COLUMN "settings_margin";`)
}
