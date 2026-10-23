/*
  Warnings:

  - You are about to drop the column `companyAddress` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `companyDescription` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `companyEmail` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `companyLogo` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `companyPhone` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `companyWebsite` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `employerId` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `contactPerson` to the `employers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AppStatus" ADD VALUE 'shortlisted';
ALTER TYPE "AppStatus" ADD VALUE 'interviewed';
ALTER TYPE "AppStatus" ADD VALUE 'offered';

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_employerId_fkey";

-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "linkedinProfile" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "employers" ADD COLUMN     "companyAddress" TEXT,
ADD COLUMN     "companyCity" TEXT,
ADD COLUMN     "companyEmail" TEXT,
ADD COLUMN     "companyIndustry" TEXT,
ADD COLUMN     "companyLocation" TEXT,
ADD COLUMN     "companyPhone" TEXT,
ADD COLUMN     "companySize" TEXT,
ADD COLUMN     "companyState" TEXT,
ADD COLUMN     "companyType" TEXT,
ADD COLUMN     "contactPerson" TEXT NOT NULL,
ADD COLUMN     "identityProof" TEXT,
ADD COLUMN     "isactive" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "interviews" ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "job_categories" ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "updatedBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "job_seekers" ADD COLUMN     "city" TEXT,
ADD COLUMN     "highestEducation" TEXT,
ADD COLUMN     "isactive" BOOLEAN DEFAULT false,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "companyAddress",
DROP COLUMN "companyDescription",
DROP COLUMN "companyEmail",
DROP COLUMN "companyLogo",
DROP COLUMN "companyPhone",
DROP COLUMN "companyWebsite",
DROP COLUMN "employerId",
ADD COLUMN     "Companypicture" TEXT,
ADD COLUMN     "companyId" TEXT,
ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "updatedBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isactive" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "companyDetails" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyLogo" TEXT,
    "companyWebsite" TEXT,
    "companyDescription" TEXT,
    "companyLocation" TEXT,
    "companyCity" TEXT,
    "companyState" TEXT,
    "companyAddress" TEXT,
    "companyPhone" TEXT,
    "companyEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedBy" TEXT,
    "Delete_flg" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "companyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_status_history" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "status" "AppStatus" NOT NULL,
    "reason" TEXT,
    "description" TEXT,
    "changedBy" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_status_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "employers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_status_history" ADD CONSTRAINT "application_status_history_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
