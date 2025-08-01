-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('Admin', 'Employee', 'Department_Head', 'Maintenance_Head', 'Technician') NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activated` BOOLEAN NOT NULL DEFAULT true,
    `department_id` INTEGER NULL,
    `request_id` INTEGER NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_phone_number_key`(`phone_number`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `department_id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `department_department_name_key`(`department_name`),
    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaintenanceRequest` (
    `request_id` INTEGER NOT NULL AUTO_INCREMENT,
    `requester_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `other_request_type` VARCHAR(191) NULL,
    `device_type` VARCHAR(191) NOT NULL,
    `request_type` VARCHAR(191) NOT NULL,
    `model_no` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `status` ENUM('Pending', 'In_Progress', 'Completed', 'Rejected', 'Assigned') NOT NULL DEFAULT 'In_Progress',
    `priority` ENUM('Low', 'Medium', 'High', 'Emergency') NULL,
    `reasonOnRejection` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employee_id` INTEGER NOT NULL,
    `department_id` INTEGER NULL,
    `request_type_id` INTEGER NULL,

    PRIMARY KEY (`request_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RequestType` (
    `request_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `request_type_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RequestType_request_type_name_key`(`request_type_name`),
    PRIMARY KEY (`request_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feedback` (
    `feedback_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL DEFAULT 1,
    `comments` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `request_id` INTEGER NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `technician_id` INTEGER NOT NULL,

    PRIMARY KEY (`feedback_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assignment` (
    `assignment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completed_at` BOOLEAN NOT NULL DEFAULT false,
    `work_load` INTEGER NOT NULL DEFAULT 0,
    `request_id` INTEGER NOT NULL,
    `technician_id` INTEGER NOT NULL,

    PRIMARY KEY (`assignment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `completionConfirmation` (
    `confirmation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `finished_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `given_at` DATETIME(3) NOT NULL,
    `request_id` INTEGER NOT NULL,
    `technician_id` INTEGER NOT NULL,
    `detail_of_problem` VARCHAR(191) NOT NULL,
    `feedback_id` INTEGER NULL,

    UNIQUE INDEX `completionConfirmation_request_id_key`(`request_id`),
    PRIMARY KEY (`confirmation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProblemSearch` (
    `solution_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `video_url` VARCHAR(191) NOT NULL,
    `description` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`solution_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_request_id_fkey` FOREIGN KEY (`request_id`) REFERENCES `MaintenanceRequest`(`request_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaintenanceRequest` ADD CONSTRAINT `DepartmentMaintenanceRequests_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaintenanceRequest` ADD CONSTRAINT `MaintenanceRequest_request_type_id_fkey` FOREIGN KEY (`request_type_id`) REFERENCES `RequestType`(`request_type_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `FeedbackMaintenanceRequests_fkey` FOREIGN KEY (`request_id`) REFERENCES `MaintenanceRequest`(`request_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `AssignmentTechnician_fkey` FOREIGN KEY (`technician_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_request_id_fkey` FOREIGN KEY (`request_id`) REFERENCES `MaintenanceRequest`(`request_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `completionConfirmation` ADD CONSTRAINT `completionConfirmation_technician_id_fkey` FOREIGN KEY (`technician_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `completionConfirmation` ADD CONSTRAINT `completionConfirmation_request_id_fkey` FOREIGN KEY (`request_id`) REFERENCES `MaintenanceRequest`(`request_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `completionConfirmation` ADD CONSTRAINT `ConformationFeedbakc_fkey` FOREIGN KEY (`feedback_id`) REFERENCES `Feedback`(`feedback_id`) ON DELETE SET NULL ON UPDATE CASCADE;
