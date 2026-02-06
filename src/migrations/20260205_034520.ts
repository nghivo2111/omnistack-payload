import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages_blocks_feature_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages_blocks_media_content" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages_blocks_maps_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages_blocks_carousel" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages_blocks_list_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_feature_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_media_content" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_maps_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_carousel" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v_blocks_list_block" ADD COLUMN "settings_border_radius" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_settings_border_radius" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages_blocks_feature_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages_blocks_media_content" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages_blocks_maps_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages_blocks_carousel" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages_blocks_list_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "pages" DROP COLUMN "hero_settings_border_radius";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v_blocks_feature_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v_blocks_media_content" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v_blocks_maps_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v_blocks_carousel" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v_blocks_list_block" DROP COLUMN "settings_border_radius";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_settings_border_radius";`)
}
