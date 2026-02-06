import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_list_block" ALTER COLUMN "settings_type" SET DEFAULT 'icon-content';
  ALTER TABLE "_pages_v_blocks_list_block" ALTER COLUMN "settings_type" SET DEFAULT 'icon-content';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_list_block" ALTER COLUMN "settings_type" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_list_block" ALTER COLUMN "settings_type" DROP DEFAULT;`)
}
