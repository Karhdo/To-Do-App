/*
  Warnings:

  - You are about to drop the column `description` on the `TaskDetail` table. All the data in the column will be lost.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "TaskDetail" DROP COLUMN "description";
