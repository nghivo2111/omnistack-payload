import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_list_block" RENAME COLUMN "sub_title" TO "subtitle";
  ALTER TABLE "_pages_v_blocks_list_block" RENAME COLUMN "sub_title" TO "subtitle";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_list_block" RENAME COLUMN "subtitle" TO "sub_title";
  ALTER TABLE "_pages_v_blocks_list_block" RENAME COLUMN "subtitle" TO "sub_title";`)
}
