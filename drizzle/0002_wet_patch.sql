CREATE TABLE `customer_force` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`room_name` text NOT NULL,
	`company_name` text NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer NOT NULL,
	`date` integer NOT NULL,
	`qr_code` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customer_force_id_unique` ON `customer_force` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `customer_force_qr_code_unique` ON `customer_force` (`qr_code`);