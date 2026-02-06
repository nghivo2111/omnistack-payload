import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_list_block_settings_layout" ADD VALUE '1-cols' BEFORE '2-cols';
  ALTER TYPE "public"."enum__pages_v_blocks_list_block_settings_layout" ADD VALUE '1-cols' BEFORE '2-cols';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_list_block" ALTER COLUMN "settings_layout" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_list_block" ALTER COLUMN "settings_layout" SET DEFAULT '2-cols'::text;
  DROP TYPE "public"."enum_pages_blocks_list_block_settings_layout";
  CREATE TYPE "public"."enum_pages_blocks_list_block_settings_layout" AS ENUM('2-cols', '3-cols', '4-cols');
  ALTER TABLE "pages_blocks_list_block" ALTER COLUMN "settings_layout" SET DEFAULT '2-cols'::"public"."enum_pages_blocks_list_block_settings_layout";
  ALTER TABLE "pages_blocks_list_block" ALTER COLUMN "settings_layout" SET DATA TYPE "public"."enum_pages_blocks_list_block_settings_layout" USING "settings_layout"::"public"."enum_pages_blocks_list_block_settings_layout";
  ALTER TABLE "_pages_v_blocks_list_block" ALTER COLUMN "settings_layout" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_list_block" ALTER COLUMN "settings_layout" SET DEFAULT '2-cols'::text;
  DROP TYPE "public"."enum__pages_v_blocks_list_block_settings_layout";
  CREATE TYPE "public"."enum__pages_v_blocks_list_block_settings_layout" AS ENUM('2-cols', '3-cols', '4-cols');
  ALTER TABLE "_pages_v_blocks_list_block" ALTER COLUMN "settings_layout" SET DEFAULT '2-cols'::"public"."enum__pages_v_blocks_list_block_settings_layout";
  ALTER TABLE "_pages_v_blocks_list_block" ALTER COLUMN "settings_layout" SET DATA TYPE "public"."enum__pages_v_blocks_list_block_settings_layout" USING "settings_layout"::"public"."enum__pages_v_blocks_list_block_settings_layout";`)
}
