import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_categories_type" ADD VALUE 'technology';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "categories" ALTER COLUMN "type" SET DEFAULT 'service'::text;
  DROP TYPE "public"."enum_categories_type";
  CREATE TYPE "public"."enum_categories_type" AS ENUM('blog', 'service');
  ALTER TABLE "categories" ALTER COLUMN "type" SET DEFAULT 'service'::"public"."enum_categories_type";
  ALTER TABLE "categories" ALTER COLUMN "type" SET DATA TYPE "public"."enum_categories_type" USING "type"::"public"."enum_categories_type";`)
}
