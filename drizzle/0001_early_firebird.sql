PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_buildings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`description` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_buildings`("id", "name", "address", "description", "created_at", "updated_at") SELECT "id", "name", "address", "description", "created_at", "updated_at" FROM `buildings`;--> statement-breakpoint
DROP TABLE `buildings`;--> statement-breakpoint
ALTER TABLE `__new_buildings` RENAME TO `buildings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `buildings_id_unique` ON `buildings` (`id`);