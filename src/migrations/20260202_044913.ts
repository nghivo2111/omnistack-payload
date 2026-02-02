import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_carousel_slides_items_direction" RENAME TO "enum_pages_blocks_carousel_slides_direction";
  ALTER TYPE "public"."enum__pages_v_blocks_carousel_slides_items_direction" RENAME TO "enum__pages_v_blocks_carousel_slides_direction";
  ALTER TABLE "pages_blocks_carousel_slides" ADD COLUMN "direction" "enum_pages_blocks_carousel_slides_direction";
  ALTER TABLE "_pages_v_blocks_carousel_slides" ADD COLUMN "direction" "enum__pages_v_blocks_carousel_slides_direction";
  ALTER TABLE "pages_blocks_carousel_slides_items" DROP COLUMN "direction";
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" DROP COLUMN "direction";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_carousel_slides_direction" RENAME TO "enum_pages_blocks_carousel_slides_items_direction";
  ALTER TYPE "public"."enum__pages_v_blocks_carousel_slides_direction" RENAME TO "enum__pages_v_blocks_carousel_slides_items_direction";
  ALTER TABLE "pages_blocks_carousel_slides_items" ADD COLUMN "direction" "enum_pages_blocks_carousel_slides_items_direction";
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" ADD COLUMN "direction" "enum__pages_v_blocks_carousel_slides_items_direction";
  ALTER TABLE "pages_blocks_carousel_slides" DROP COLUMN "direction";
  ALTER TABLE "_pages_v_blocks_carousel_slides" DROP COLUMN "direction";`)
}
