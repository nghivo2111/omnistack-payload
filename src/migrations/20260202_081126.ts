import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides" ADD COLUMN "slides_per_view" numeric;
  ALTER TABLE "pages_blocks_carousel_slides" ADD COLUMN "auto_play" boolean;
  ALTER TABLE "_pages_v_blocks_carousel_slides" ADD COLUMN "slides_per_view" numeric;
  ALTER TABLE "_pages_v_blocks_carousel_slides" ADD COLUMN "auto_play" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides" DROP COLUMN "slides_per_view";
  ALTER TABLE "pages_blocks_carousel_slides" DROP COLUMN "auto_play";
  ALTER TABLE "_pages_v_blocks_carousel_slides" DROP COLUMN "slides_per_view";
  ALTER TABLE "_pages_v_blocks_carousel_slides" DROP COLUMN "auto_play";`)
}
