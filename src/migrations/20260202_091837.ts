import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel" ADD COLUMN "settings_full_width" boolean;
  ALTER TABLE "_pages_v_blocks_carousel" ADD COLUMN "settings_full_width" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_carousel" DROP COLUMN "settings_full_width";
  ALTER TABLE "_pages_v_blocks_carousel" DROP COLUMN "settings_full_width";`)
}
