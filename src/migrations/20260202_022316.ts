import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_carousel_settings_bg_position" AS ENUM('center', 'right', 'left', 'top', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_carousel_settings_bg_type" AS ENUM('image', 'color', 'gradient', 'transparent');
  CREATE TYPE "public"."enum_pages_blocks_carousel_settings_bg_size" AS ENUM('contain', 'cover', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_carousel_settings_bg_attachment" AS ENUM('scroll', 'fixed');
  CREATE TYPE "public"."enum_pages_blocks_carousel_settings_type" AS ENUM('content');
  CREATE TYPE "public"."enum_pages_blocks_carousel_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_carousel_link_appearance" AS ENUM('default', 'outline', 'link', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_carousel_link_position" AS ENUM('center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_settings_bg_position" AS ENUM('center', 'right', 'left', 'top', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_settings_bg_type" AS ENUM('image', 'color', 'gradient', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_settings_bg_size" AS ENUM('contain', 'cover', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_settings_bg_attachment" AS ENUM('scroll', 'fixed');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_settings_type" AS ENUM('content');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_link_appearance" AS ENUM('default', 'outline', 'link', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_link_position" AS ENUM('center', 'right');
  CREATE TABLE "pages_blocks_carousel_settings_bg_position" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_carousel_settings_bg_position",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar
  );
  
  CREATE TABLE "pages_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_bg_type" "enum_pages_blocks_carousel_settings_bg_type" DEFAULT 'transparent',
  	"settings_bg_gradient" varchar,
  	"settings_bg_light_color" varchar,
  	"settings_bg_dark_color" varchar,
  	"settings_bg_image_id" integer,
  	"settings_bg_repeat" boolean,
  	"settings_bg_size" "enum_pages_blocks_carousel_settings_bg_size",
  	"settings_bg_size_custom" varchar,
  	"settings_bg_attachment" "enum_pages_blocks_carousel_settings_bg_attachment",
  	"settings_padding" varchar,
  	"settings_type" "enum_pages_blocks_carousel_settings_type" DEFAULT 'content',
  	"title" varchar,
  	"subtitle" jsonb,
  	"link_type" "enum_pages_blocks_carousel_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_carousel_link_appearance" DEFAULT 'default',
  	"link_position" "enum_pages_blocks_carousel_link_position",
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel_settings_bg_position" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_carousel_settings_bg_position",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_carousel_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_bg_type" "enum__pages_v_blocks_carousel_settings_bg_type" DEFAULT 'transparent',
  	"settings_bg_gradient" varchar,
  	"settings_bg_light_color" varchar,
  	"settings_bg_dark_color" varchar,
  	"settings_bg_image_id" integer,
  	"settings_bg_repeat" boolean,
  	"settings_bg_size" "enum__pages_v_blocks_carousel_settings_bg_size",
  	"settings_bg_size_custom" varchar,
  	"settings_bg_attachment" "enum__pages_v_blocks_carousel_settings_bg_attachment",
  	"settings_padding" varchar,
  	"settings_type" "enum__pages_v_blocks_carousel_settings_type" DEFAULT 'content',
  	"title" varchar,
  	"subtitle" jsonb,
  	"link_type" "enum__pages_v_blocks_carousel_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_carousel_link_appearance" DEFAULT 'default',
  	"link_position" "enum__pages_v_blocks_carousel_link_position",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_carousel_settings_bg_position" ADD CONSTRAINT "pages_blocks_carousel_settings_bg_position_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_items" ADD CONSTRAINT "pages_blocks_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel" ADD CONSTRAINT "pages_blocks_carousel_settings_bg_image_id_media_id_fk" FOREIGN KEY ("settings_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel" ADD CONSTRAINT "pages_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_settings_bg_position" ADD CONSTRAINT "_pages_v_blocks_carousel_settings_bg_position_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_items" ADD CONSTRAINT "_pages_v_blocks_carousel_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel" ADD CONSTRAINT "_pages_v_blocks_carousel_settings_bg_image_id_media_id_fk" FOREIGN KEY ("settings_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel" ADD CONSTRAINT "_pages_v_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_carousel_settings_bg_position_order_idx" ON "pages_blocks_carousel_settings_bg_position" USING btree ("order");
  CREATE INDEX "pages_blocks_carousel_settings_bg_position_parent_idx" ON "pages_blocks_carousel_settings_bg_position" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_carousel_settings_bg_position_locale_idx" ON "pages_blocks_carousel_settings_bg_position" USING btree ("locale");
  CREATE INDEX "pages_blocks_carousel_items_order_idx" ON "pages_blocks_carousel_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_items_parent_id_idx" ON "pages_blocks_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_items_locale_idx" ON "pages_blocks_carousel_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_carousel_order_idx" ON "pages_blocks_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_parent_id_idx" ON "pages_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_path_idx" ON "pages_blocks_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_carousel_locale_idx" ON "pages_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "pages_blocks_carousel_settings_settings_bg_image_idx" ON "pages_blocks_carousel" USING btree ("settings_bg_image_id");
  CREATE INDEX "_pages_v_blocks_carousel_settings_bg_position_order_idx" ON "_pages_v_blocks_carousel_settings_bg_position" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_carousel_settings_bg_position_parent_idx" ON "_pages_v_blocks_carousel_settings_bg_position" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_settings_bg_position_locale_idx" ON "_pages_v_blocks_carousel_settings_bg_position" USING btree ("locale");
  CREATE INDEX "_pages_v_blocks_carousel_items_order_idx" ON "_pages_v_blocks_carousel_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_items_parent_id_idx" ON "_pages_v_blocks_carousel_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_items_locale_idx" ON "_pages_v_blocks_carousel_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_carousel_order_idx" ON "_pages_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_parent_id_idx" ON "_pages_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_path_idx" ON "_pages_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_carousel_locale_idx" ON "_pages_v_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_carousel_settings_settings_bg_image_idx" ON "_pages_v_blocks_carousel" USING btree ("settings_bg_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_carousel_settings_bg_position" CASCADE;
  DROP TABLE "pages_blocks_carousel_items" CASCADE;
  DROP TABLE "pages_blocks_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_settings_bg_position" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_items" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_carousel_settings_bg_position";
  DROP TYPE "public"."enum_pages_blocks_carousel_settings_bg_type";
  DROP TYPE "public"."enum_pages_blocks_carousel_settings_bg_size";
  DROP TYPE "public"."enum_pages_blocks_carousel_settings_bg_attachment";
  DROP TYPE "public"."enum_pages_blocks_carousel_settings_type";
  DROP TYPE "public"."enum_pages_blocks_carousel_link_type";
  DROP TYPE "public"."enum_pages_blocks_carousel_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_carousel_link_position";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_settings_bg_position";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_settings_bg_type";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_settings_bg_size";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_settings_bg_attachment";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_settings_type";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_link_position";`)
}
