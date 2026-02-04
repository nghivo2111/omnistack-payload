import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides" RENAME COLUMN "slides_per_view" TO "slides_per_view_d";
  ALTER TABLE "_pages_v_blocks_carousel_slides" RENAME COLUMN "slides_per_view" TO "slides_per_view_d";
  ALTER TABLE "pages_blocks_carousel_slides" ADD COLUMN "slides_per_view_m" numeric;
  ALTER TABLE "_pages_v_blocks_carousel_slides" ADD COLUMN "slides_per_view_m" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides" RENAME COLUMN "slides_per_view_d" TO "slides_per_view";
  ALTER TABLE "_pages_v_blocks_carousel_slides" RENAME COLUMN "slides_per_view_d" TO "slides_per_view";
  ALTER TABLE "pages_blocks_carousel_slides" DROP COLUMN "slides_per_view_m";
  ALTER TABLE "_pages_v_blocks_carousel_slides" DROP COLUMN "slides_per_view_m";`)
}
