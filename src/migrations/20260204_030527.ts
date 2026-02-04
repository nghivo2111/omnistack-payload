import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_list_block_settings_bg_position" AS ENUM('center', 'right', 'left', 'top', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_list_block_settings_bg_type" AS ENUM('image', 'color', 'gradient', 'transparent');
  CREATE TYPE "public"."enum_pages_blocks_list_block_settings_bg_size" AS ENUM('contain', 'cover', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_list_block_settings_bg_attachment" AS ENUM('scroll', 'fixed');
  CREATE TYPE "public"."enum__pages_v_blocks_list_block_settings_bg_position" AS ENUM('center', 'right', 'left', 'top', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_list_block_settings_bg_type" AS ENUM('image', 'color', 'gradient', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_list_block_settings_bg_size" AS ENUM('contain', 'cover', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_list_block_settings_bg_attachment" AS ENUM('scroll', 'fixed');
  CREATE TABLE "pages_blocks_list_block_settings_bg_position" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_list_block_settings_bg_position",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_bg_type" "enum_pages_blocks_list_block_settings_bg_type" DEFAULT 'transparent',
  	"settings_bg_gradient" varchar,
  	"settings_bg_light_color" varchar,
  	"settings_bg_dark_color" varchar,
  	"settings_bg_image_id" integer,
  	"settings_bg_repeat" boolean,
  	"settings_bg_size" "enum_pages_blocks_list_block_settings_bg_size",
  	"settings_bg_size_custom" varchar,
  	"settings_bg_attachment" "enum_pages_blocks_list_block_settings_bg_attachment",
  	"settings_padding" varchar,
  	"settings_icon_size" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_block_settings_bg_position" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_list_block_settings_bg_position",
  	"locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_list_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"settings_bg_type" "enum__pages_v_blocks_list_block_settings_bg_type" DEFAULT 'transparent',
  	"settings_bg_gradient" varchar,
  	"settings_bg_light_color" varchar,
  	"settings_bg_dark_color" varchar,
  	"settings_bg_image_id" integer,
  	"settings_bg_repeat" boolean,
  	"settings_bg_size" "enum__pages_v_blocks_list_block_settings_bg_size",
  	"settings_bg_size_custom" varchar,
  	"settings_bg_attachment" "enum__pages_v_blocks_list_block_settings_bg_attachment",
  	"settings_padding" varchar,
  	"settings_icon_size" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_list_block_settings_bg_position" ADD CONSTRAINT "pages_blocks_list_block_settings_bg_position_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_block_items" ADD CONSTRAINT "pages_blocks_list_block_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_block_items" ADD CONSTRAINT "pages_blocks_list_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_block" ADD CONSTRAINT "pages_blocks_list_block_settings_bg_image_id_media_id_fk" FOREIGN KEY ("settings_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_block" ADD CONSTRAINT "pages_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block_settings_bg_position" ADD CONSTRAINT "_pages_v_blocks_list_block_settings_bg_position_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block_items" ADD CONSTRAINT "_pages_v_blocks_list_block_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block_items" ADD CONSTRAINT "_pages_v_blocks_list_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block" ADD CONSTRAINT "_pages_v_blocks_list_block_settings_bg_image_id_media_id_fk" FOREIGN KEY ("settings_bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block" ADD CONSTRAINT "_pages_v_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_list_block_settings_bg_position_order_idx" ON "pages_blocks_list_block_settings_bg_position" USING btree ("order");
  CREATE INDEX "pages_blocks_list_block_settings_bg_position_parent_idx" ON "pages_blocks_list_block_settings_bg_position" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_list_block_settings_bg_position_locale_idx" ON "pages_blocks_list_block_settings_bg_position" USING btree ("locale");
  CREATE INDEX "pages_blocks_list_block_items_order_idx" ON "pages_blocks_list_block_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_block_items_parent_id_idx" ON "pages_blocks_list_block_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_block_items_locale_idx" ON "pages_blocks_list_block_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_list_block_items_icon_idx" ON "pages_blocks_list_block_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_list_block_order_idx" ON "pages_blocks_list_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_block_parent_id_idx" ON "pages_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_block_path_idx" ON "pages_blocks_list_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_list_block_locale_idx" ON "pages_blocks_list_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_list_block_settings_settings_bg_image_idx" ON "pages_blocks_list_block" USING btree ("settings_bg_image_id");
  CREATE INDEX "_pages_v_blocks_list_block_settings_bg_position_order_idx" ON "_pages_v_blocks_list_block_settings_bg_position" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_list_block_settings_bg_position_parent_idx" ON "_pages_v_blocks_list_block_settings_bg_position" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_list_block_settings_bg_position_locale_idx" ON "_pages_v_blocks_list_block_settings_bg_position" USING btree ("locale");
  CREATE INDEX "_pages_v_blocks_list_block_items_order_idx" ON "_pages_v_blocks_list_block_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_block_items_parent_id_idx" ON "_pages_v_blocks_list_block_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_block_items_locale_idx" ON "_pages_v_blocks_list_block_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_list_block_items_icon_idx" ON "_pages_v_blocks_list_block_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_list_block_order_idx" ON "_pages_v_blocks_list_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_block_parent_id_idx" ON "_pages_v_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_block_path_idx" ON "_pages_v_blocks_list_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_list_block_locale_idx" ON "_pages_v_blocks_list_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_list_block_settings_settings_bg_image_idx" ON "_pages_v_blocks_list_block" USING btree ("settings_bg_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_list_block_settings_bg_position" CASCADE;
  DROP TABLE "pages_blocks_list_block_items" CASCADE;
  DROP TABLE "pages_blocks_list_block" CASCADE;
  DROP TABLE "_pages_v_blocks_list_block_settings_bg_position" CASCADE;
  DROP TABLE "_pages_v_blocks_list_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_list_block" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_list_block_settings_bg_position";
  DROP TYPE "public"."enum_pages_blocks_list_block_settings_bg_type";
  DROP TYPE "public"."enum_pages_blocks_list_block_settings_bg_size";
  DROP TYPE "public"."enum_pages_blocks_list_block_settings_bg_attachment";
  DROP TYPE "public"."enum__pages_v_blocks_list_block_settings_bg_position";
  DROP TYPE "public"."enum__pages_v_blocks_list_block_settings_bg_type";
  DROP TYPE "public"."enum__pages_v_blocks_list_block_settings_bg_size";
  DROP TYPE "public"."enum__pages_v_blocks_list_block_settings_bg_attachment";`)
}
