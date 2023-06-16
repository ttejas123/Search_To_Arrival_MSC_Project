-- CreateTable
CREATE TABLE `CollegeSchema` (
    `id` VARCHAR(191) NOT NULL,
    `college_name` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `college_city` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `rating` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CordinateSchema` (
    `id` VARCHAR(191) NOT NULL,
    `lat` VARCHAR(191) NOT NULL,
    `lng` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `placementsSchema` (
    `id` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `company_image` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `placementsSchema_company_name_key`(`company_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facilitiesSchema` (
    `id` VARCHAR(191) NOT NULL,
    `facility_name` VARCHAR(191) NOT NULL,
    `facility_image` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `facilitiesSchema_facility_name_key`(`facility_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facultySchema` (
    `id` VARCHAR(191) NOT NULL,
    `faculty_name` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `exp` VARCHAR(191) NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coursesSchema` (
    `id` VARCHAR(191) NOT NULL,
    `courses_name` VARCHAR(191) NOT NULL,
    `short_head` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `fees_per_year` VARCHAR(191) NOT NULL,
    `eligibility` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `coursesSchema_short_head_key`(`short_head`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baseCardCourseSchema` (
    `id` VARCHAR(191) NOT NULL,
    `fee` VARCHAR(191) NOT NULL,
    `short_form` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CollegeSchemaToCordinateSchema` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CollegeSchemaToCordinateSchema_AB_unique`(`A`, `B`),
    INDEX `_CollegeSchemaToCordinateSchema_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CollegeSchemaToplacementsSchema` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CollegeSchemaToplacementsSchema_AB_unique`(`A`, `B`),
    INDEX `_CollegeSchemaToplacementsSchema_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CollegeSchemaTofacilitiesSchema` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CollegeSchemaTofacilitiesSchema_AB_unique`(`A`, `B`),
    INDEX `_CollegeSchemaTofacilitiesSchema_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CollegeSchemaTofacultySchema` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CollegeSchemaTofacultySchema_AB_unique`(`A`, `B`),
    INDEX `_CollegeSchemaTofacultySchema_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CollegeSchemaTocoursesSchema` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CollegeSchemaTocoursesSchema_AB_unique`(`A`, `B`),
    INDEX `_CollegeSchemaTocoursesSchema_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CollegeSchemaTobaseCardCourseSchema` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CollegeSchemaTobaseCardCourseSchema_AB_unique`(`A`, `B`),
    INDEX `_CollegeSchemaTobaseCardCourseSchema_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaToCordinateSchema` ADD CONSTRAINT `_CollegeSchemaToCordinateSchema_A_fkey` FOREIGN KEY (`A`) REFERENCES `CollegeSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaToCordinateSchema` ADD CONSTRAINT `_CollegeSchemaToCordinateSchema_B_fkey` FOREIGN KEY (`B`) REFERENCES `CordinateSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaToplacementsSchema` ADD CONSTRAINT `_CollegeSchemaToplacementsSchema_A_fkey` FOREIGN KEY (`A`) REFERENCES `CollegeSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaToplacementsSchema` ADD CONSTRAINT `_CollegeSchemaToplacementsSchema_B_fkey` FOREIGN KEY (`B`) REFERENCES `placementsSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaTofacilitiesSchema` ADD CONSTRAINT `_CollegeSchemaTofacilitiesSchema_A_fkey` FOREIGN KEY (`A`) REFERENCES `CollegeSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaTofacilitiesSchema` ADD CONSTRAINT `_CollegeSchemaTofacilitiesSchema_B_fkey` FOREIGN KEY (`B`) REFERENCES `facilitiesSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaTofacultySchema` ADD CONSTRAINT `_CollegeSchemaTofacultySchema_A_fkey` FOREIGN KEY (`A`) REFERENCES `CollegeSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaTofacultySchema` ADD CONSTRAINT `_CollegeSchemaTofacultySchema_B_fkey` FOREIGN KEY (`B`) REFERENCES `facultySchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaTocoursesSchema` ADD CONSTRAINT `_CollegeSchemaTocoursesSchema_A_fkey` FOREIGN KEY (`A`) REFERENCES `CollegeSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaTocoursesSchema` ADD CONSTRAINT `_CollegeSchemaTocoursesSchema_B_fkey` FOREIGN KEY (`B`) REFERENCES `coursesSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaTobaseCardCourseSchema` ADD CONSTRAINT `_CollegeSchemaTobaseCardCourseSchema_A_fkey` FOREIGN KEY (`A`) REFERENCES `CollegeSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CollegeSchemaTobaseCardCourseSchema` ADD CONSTRAINT `_CollegeSchemaTobaseCardCourseSchema_B_fkey` FOREIGN KEY (`B`) REFERENCES `baseCardCourseSchema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
