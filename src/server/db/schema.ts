import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  int,
  mysqlTableCreator,
  text,
  timestamp,
  varchar,
  // index,
  unique,
} from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => `gallery_${name}`);

export const albums = mysqlTable(
  "albums",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description"),
    slug: varchar("slug", { length: 256 }).notNull(),
    coverId: bigint("cover_id", { mode: "number" }),
    isPublic: boolean("public").default(true).notNull(),
    isDeleted: boolean("deleted").default(false).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (table) => ({
    uniqueNameIndex: unique("unique_album_name_idx").on(table.name),
  }),
);

export const photos = mysqlTable(
  "photos",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
    title: varchar("title", { length: 256 }),
    caption: text("caption"),
    width: int("width").notNull(),
    height: int("width").notNull(),
    // urls
    // thumbnail
    dateTaken: timestamp("date_taken")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    isPublic: boolean("public").default(true).notNull(),
    isDeleted: boolean("deleted").default(false).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (table) => ({
    uniqueNameIndex: unique("unique_photo_name_idx").on(table.name),
  }),
);

export const photosToAlbums = mysqlTable("album_photos", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  albumId: bigint("album_id", { mode: "number" })
    .references(() => albums.id, { onDelete: "cascade" })
    .notNull(),
  photoId: bigint("photo_id", { mode: "number" })
    .references(() => photos.id)
    .notNull(),
});

// querying user group with id 1 and all the participants(users)
// db.select()
//   .from(usersToChatGroups)
//   .leftJoin(users, eq(usersToChatGroups.userId, users.id))
//   .leftJoin(chatGroups, eq(usersToChatGroups.groupId, chatGroups.id))
//   .where(eq(chatGroups.id, 1))
//   .all();
