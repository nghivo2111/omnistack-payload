import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_list_block_settings_type" AS ENUM('icon-content', 'stats-highlight');
  CREATE TYPE "public"."enum__pages_v_blocks_list_block_settings_type" AS ENUM('icon-content', 'stats-highlight');
  ALTER TABLE "pages_blocks_list_block_items" RENAME COLUMN "icon_id" TO "icon_content_icon_id";
  ALTER TABLE "pages_blocks_list_block_items" RENAME COLUMN "content" TO "icon_content_content";
  ALTER TABLE "_pages_v_blocks_list_block_items" RENAME COLUMN "icon_id" TO "icon_content_icon_id";
  ALTER TABLE "_pages_v_blocks_list_block_items" RENAME COLUMN "content" TO "icon_content_content";
  ALTER TABLE "pages_blocks_list_block_items" DROP CONSTRAINT "pages_blocks_list_block_items_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_list_block_items" DROP CONSTRAINT "_pages_v_blocks_list_block_items_icon_id_media_id_fk";
  
  DROP INDEX "pages_blocks_list_block_items_icon_idx";
  DROP INDEX "_pages_v_blocks_list_block_items_icon_idx";
  ALTER TABLE "pages_blocks_list_block_items" ADD COLUMN "stats_highlight_value" varchar;
  ALTER TABLE "pages_blocks_list_block_items" ADD COLUMN "stats_highlight_label" varchar;
  ALTER TABLE "pages_blocks_list_block_items" ADD COLUMN "stats_highlight_sub_label" varchar;
  ALTER TABLE "pages_blocks_list_block" ADD COLUMN "settings_type" "enum_pages_blocks_list_block_settings_type";
  ALTER TABLE "_pages_v_blocks_list_block_items" ADD COLUMN "stats_highlight_value" varchar;
  ALTER TABLE "_pages_v_blocks_list_block_items" ADD COLUMN "stats_highlight_label" varchar;
  ALTER TABLE "_pages_v_blocks_list_block_items" ADD COLUMN "stats_highlight_sub_label" varchar;
  ALTER TABLE "_pages_v_blocks_list_block" ADD COLUMN "settings_type" "enum__pages_v_blocks_list_block_settings_type";
  ALTER TABLE "pages_blocks_list_block_items" ADD CONSTRAINT "pages_blocks_list_block_items_icon_content_icon_id_media_id_fk" FOREIGN KEY ("icon_content_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block_items" ADD CONSTRAINT "_pages_v_blocks_list_block_items_icon_content_icon_id_media_id_fk" FOREIGN KEY ("icon_content_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_list_block_items_icon_content_icon_content__idx" ON "pages_blocks_list_block_items" USING btree ("icon_content_icon_id");
  CREATE INDEX "_pages_v_blocks_list_block_items_icon_content_icon_conte_idx" ON "_pages_v_blocks_list_block_items" USING btree ("icon_content_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_list_block_items" RENAME COLUMN "icon_content_icon_id" TO "icon_id";
  ALTER TABLE "pages_blocks_list_block_items" RENAME COLUMN "icon_content_content" TO "content";
  ALTER TABLE "_pages_v_blocks_list_block_items" RENAME COLUMN "icon_content_icon_id" TO "icon_id";
  ALTER TABLE "_pages_v_blocks_list_block_items" RENAME COLUMN "icon_content_content" TO "content";
  ALTER TABLE "pages_blocks_list_block_items" DROP CONSTRAINT "pages_blocks_list_block_items_icon_content_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_list_block_items" DROP CONSTRAINT "_pages_v_blocks_list_block_items_icon_content_icon_id_media_id_fk";
  
  DROP INDEX "pages_blocks_list_block_items_icon_content_icon_content__idx";
  DROP INDEX "_pages_v_blocks_list_block_items_icon_content_icon_conte_idx";
  ALTER TABLE "pages_blocks_list_block_items" ADD CONSTRAINT "pages_blocks_list_block_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block_items" ADD CONSTRAINT "_pages_v_blocks_list_block_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_list_block_items_icon_idx" ON "pages_blocks_list_block_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_list_block_items_icon_idx" ON "_pages_v_blocks_list_block_items" USING btree ("icon_id");
  ALTER TABLE "pages_blocks_list_block_items" DROP COLUMN "stats_highlight_value";
  ALTER TABLE "pages_blocks_list_block_items" DROP COLUMN "stats_highlight_label";
  ALTER TABLE "pages_blocks_list_block_items" DROP COLUMN "stats_highlight_sub_label";
  ALTER TABLE "pages_blocks_list_block" DROP COLUMN "settings_type";
  ALTER TABLE "_pages_v_blocks_list_block_items" DROP COLUMN "stats_highlight_value";
  ALTER TABLE "_pages_v_blocks_list_block_items" DROP COLUMN "stats_highlight_label";
  ALTER TABLE "_pages_v_blocks_list_block_items" DROP COLUMN "stats_highlight_sub_label";
  ALTER TABLE "_pages_v_blocks_list_block" DROP COLUMN "settings_type";
  DROP TYPE "public"."enum_pages_blocks_list_block_settings_type";
  DROP TYPE "public"."enum__pages_v_blocks_list_block_settings_type";`)
}
