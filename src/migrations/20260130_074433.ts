import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_header_link_appearance";
  CREATE TYPE "public"."enum_header_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_header_link_appearance";
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_header_link_appearance" USING "link_appearance"::"public"."enum_header_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_header_link_appearance";
  CREATE TYPE "public"."enum_header_link_appearance" AS ENUM('default', 'link');
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_header_link_appearance";
  ALTER TABLE "header_locales" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_header_link_appearance" USING "link_appearance"::"public"."enum_header_link_appearance";`)
}
