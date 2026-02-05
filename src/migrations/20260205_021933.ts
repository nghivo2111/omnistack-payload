import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages_blocks_content" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages_blocks_media_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages_blocks_archive" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages_blocks_form_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages_blocks_feature_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages_blocks_media_content" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages_blocks_maps_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages_blocks_carousel" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages_blocks_list_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "pages" RENAME COLUMN "hero_settings_bg_light_color" TO "hero_settings_bg_color";
  ALTER TABLE "_pages_v_blocks_cta" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v_blocks_content" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v_blocks_media_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v_blocks_archive" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v_blocks_form_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v_blocks_feature_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v_blocks_media_content" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v_blocks_maps_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v_blocks_carousel" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v_blocks_list_block" RENAME COLUMN "settings_bg_light_color" TO "settings_bg_color";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_settings_bg_light_color" TO "version_hero_settings_bg_color";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages_blocks_feature_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages_blocks_media_content" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages_blocks_maps_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages_blocks_carousel" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages_blocks_list_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_feature_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_media_content" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_maps_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_carousel" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v_blocks_list_block" DROP COLUMN "settings_bg_dark_color";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_bg_dark_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages_blocks_content" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages_blocks_media_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages_blocks_archive" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages_blocks_form_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages_blocks_feature_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages_blocks_media_content" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages_blocks_maps_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages_blocks_carousel" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages_blocks_list_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "pages" RENAME COLUMN "hero_settings_bg_color" TO "hero_settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_cta" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_content" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_media_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_archive" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_form_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_feature_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_media_content" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_maps_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_carousel" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v_blocks_list_block" RENAME COLUMN "settings_bg_color" TO "settings_bg_light_color";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_settings_bg_color" TO "version_hero_settings_bg_light_color";
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages_blocks_feature_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages_blocks_media_content" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages_blocks_maps_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages_blocks_carousel" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages_blocks_list_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_feature_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_media_content" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_maps_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_carousel" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v_blocks_list_block" ADD COLUMN "settings_bg_dark_color" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_bg_dark_color" varchar;`)
}
