import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_list_block_settings_layout" AS ENUM('2-cols', '3-cols', '4-cols');
  CREATE TYPE "public"."enum__pages_v_blocks_list_block_settings_layout" AS ENUM('2-cols', '3-cols', '4-cols');
  ALTER TABLE "pages_blocks_list_block" ADD COLUMN "settings_layout" "enum_pages_blocks_list_block_settings_layout" DEFAULT '2-cols';
  ALTER TABLE "pages_blocks_list_block" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_list_block" ADD COLUMN "sub_title" jsonb;
  ALTER TABLE "_pages_v_blocks_list_block" ADD COLUMN "settings_layout" "enum__pages_v_blocks_list_block_settings_layout" DEFAULT '2-cols';
  ALTER TABLE "_pages_v_blocks_list_block" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_list_block" ADD COLUMN "sub_title" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_list_block" DROP COLUMN "settings_layout";
  ALTER TABLE "pages_blocks_list_block" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_list_block" DROP COLUMN "sub_title";
  ALTER TABLE "_pages_v_blocks_list_block" DROP COLUMN "settings_layout";
  ALTER TABLE "_pages_v_blocks_list_block" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_list_block" DROP COLUMN "sub_title";
  DROP TYPE "public"."enum_pages_blocks_list_block_settings_layout";
  DROP TYPE "public"."enum__pages_v_blocks_list_block_settings_layout";`)
}
