import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_media_content_link_appearance" AS ENUM('default', 'outline', 'link', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_media_content_link_appearance" AS ENUM('default', 'outline', 'link', 'secondary');
  ALTER TABLE "pages_blocks_media_content" ADD COLUMN "link_appearance" "enum_pages_blocks_media_content_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_media_content" ADD COLUMN "link_appearance" "enum__pages_v_blocks_media_content_link_appearance" DEFAULT 'default';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_media_content" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_media_content" DROP COLUMN "link_appearance";
  DROP TYPE "public"."enum_pages_blocks_media_content_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_media_content_link_appearance";`)
}
