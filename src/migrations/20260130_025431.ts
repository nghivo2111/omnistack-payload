import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_header_link_position" AS ENUM('center', 'right');
  ALTER TABLE "header_locales" ADD COLUMN "link_type" "enum_header_link_type" DEFAULT 'reference';
  ALTER TABLE "header_locales" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "header_locales" ADD COLUMN "link_url" varchar;
  ALTER TABLE "header_locales" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "header_locales" ADD COLUMN "link_appearance" "enum_header_link_appearance" DEFAULT 'default';
  ALTER TABLE "header_locales" ADD COLUMN "link_position" "enum_header_link_position";
  ALTER TABLE "header" DROP COLUMN "phone";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ADD COLUMN "phone" varchar;
  ALTER TABLE "header_locales" DROP COLUMN "link_type";
  ALTER TABLE "header_locales" DROP COLUMN "link_new_tab";
  ALTER TABLE "header_locales" DROP COLUMN "link_url";
  ALTER TABLE "header_locales" DROP COLUMN "link_label";
  ALTER TABLE "header_locales" DROP COLUMN "link_appearance";
  ALTER TABLE "header_locales" DROP COLUMN "link_position";
  DROP TYPE "public"."enum_header_link_type";
  DROP TYPE "public"."enum_header_link_appearance";
  DROP TYPE "public"."enum_header_link_position";`)
}
