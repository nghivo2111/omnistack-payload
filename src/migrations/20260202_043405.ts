import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides_items" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" ADD COLUMN "content" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel_slides_items" DROP COLUMN "content";
  ALTER TABLE "_pages_v_blocks_carousel_slides_items" DROP COLUMN "content";`)
}
