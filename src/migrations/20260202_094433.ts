import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides" ADD COLUMN "enable_arrow" boolean;
  ALTER TABLE "_pages_v_blocks_carousel_slides" ADD COLUMN "enable_arrow" boolean;
  ALTER TABLE "pages_blocks_carousel_slides" DROP COLUMN "direction";
  ALTER TABLE "_pages_v_blocks_carousel_slides" DROP COLUMN "direction";
  DROP TYPE "public"."enum_pages_blocks_carousel_slides_direction";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_slides_direction";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_carousel_slides_direction" AS ENUM('left-to-right', 'right-to-left');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_slides_direction" AS ENUM('left-to-right', 'right-to-left');
  ALTER TABLE "pages_blocks_carousel_slides" ADD COLUMN "direction" "enum_pages_blocks_carousel_slides_direction";
  ALTER TABLE "_pages_v_blocks_carousel_slides" ADD COLUMN "direction" "enum__pages_v_blocks_carousel_slides_direction";
  ALTER TABLE "pages_blocks_carousel_slides" DROP COLUMN "enable_arrow";
  ALTER TABLE "_pages_v_blocks_carousel_slides" DROP COLUMN "enable_arrow";`)
}
