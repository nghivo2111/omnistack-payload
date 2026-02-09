import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "solutions" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "solutions" ADD COLUMN "slug" varchar NOT NULL;
  CREATE UNIQUE INDEX "solutions_slug_idx" ON "solutions" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "solutions_slug_idx";
  ALTER TABLE "solutions" DROP COLUMN "generate_slug";
  ALTER TABLE "solutions" DROP COLUMN "slug";`)
}
