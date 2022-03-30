/*
  Warnings:

  - The `state` column on the `TaskDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('ToDo', 'Done');

-- AlterTable
ALTER TABLE "TaskDetail" DROP COLUMN "state",
ADD COLUMN     "state" "TaskStatus" NOT NULL DEFAULT E'ToDo';
