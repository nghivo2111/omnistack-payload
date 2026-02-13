import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages_blocks_content" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages_blocks_media_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages_blocks_form_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages_blocks_feature_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages_blocks_media_content" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages_blocks_maps_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages_blocks_carousel" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages_blocks_list_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "pages" ALTER COLUMN "hero_settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_media_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_form_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_feature_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_media_content" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_maps_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_carousel" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v_blocks_list_block" ALTER COLUMN "settings_show_on_mobile" SET DEFAULT true;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_settings_show_on_mobile" SET DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages_blocks_content" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages_blocks_media_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages_blocks_form_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages_blocks_feature_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages_blocks_media_content" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages_blocks_maps_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages_blocks_carousel" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages_blocks_list_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "pages" ALTER COLUMN "hero_settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_media_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_form_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_feature_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_media_content" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_maps_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_carousel" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_list_block" ALTER COLUMN "settings_show_on_mobile" DROP DEFAULT;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_settings_show_on_mobile" DROP DEFAULT;`)
}
