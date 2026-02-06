import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum_pages_hero_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum_pages_hero_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum__pages_v_version_hero_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum__pages_v_version_hero_link_appearance" ADD VALUE 'secondary';
  ALTER TYPE "public"."enum_header_link_appearance" ADD VALUE 'link';
  ALTER TYPE "public"."enum_header_link_appearance" ADD VALUE 'secondary';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_link_appearance" SET DATA TYPE text;
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_hero_link_appearance";
  CREATE TYPE "public"."enum_pages_hero_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_link_appearance" SET DEFAULT 'default'::"public"."enum_pages_hero_link_appearance";
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_link_appearance" SET DATA TYPE "public"."enum_pages_hero_link_appearance" USING "hero_link_appearance"::"public"."enum_pages_hero_link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_link_appearance" SET DATA TYPE text;
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_link_appearance";
  CREATE TYPE "public"."enum__pages_v_version_hero_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_link_appearance" SET DEFAULT 'default'::"public"."enum__pages_v_version_hero_link_appearance";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_link_appearance" SET DATA TYPE "public"."enum__pages_v_version_hero_link_appearance" USING "version_hero_link_appearance"::"public"."enum__pages_v_version_hero_link_appearance";
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_header_link_appearance";
  CREATE TYPE "public"."enum_header_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_header_link_appearance";
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_header_link_appearance" USING "link_appearance"::"public"."enum_header_link_appearance";`)
}
