import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_carousel_slides_items_direction" AS ENUM('left-to-right', 'right-to-left');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_slides_items_direction" AS ENUM('left-to-right', 'right-to-left');
  ALTER TABLE "pages_blocks_carousel_slides_items" ADD COLUMN "direction" "enum_pages_blocks_carousel_slides_items_direction";
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" ADD COLUMN "direction" "enum__pages_v_blocks_carousel_slides_items_direction";
  ALTER TABLE "pages_blocks_carousel_slides_items" DROP COLUMN "content";
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" DROP COLUMN "content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides_items" ADD COLUMN "content" varchar;
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" ADD COLUMN "content" varchar;
  ALTER TABLE "pages_blocks_carousel_slides_items" DROP COLUMN "direction";
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" DROP COLUMN "direction";
  DROP TYPE "public"."enum_pages_blocks_carousel_slides_items_direction";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_slides_items_direction";`)
}
