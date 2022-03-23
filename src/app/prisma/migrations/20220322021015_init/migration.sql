/*
  Warnings:

  - You are about to drop the column `taskDetailId` on the `TaskDetail` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `TaskDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TaskDetail" DROP CONSTRAINT "TaskDetail_taskDetailId_fkey";

-- AlterTable
ALTER TABLE "TaskDetail" DROP COLUMN "taskDetailId",
ADD COLUMN     "taskId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskDetail" ADD CONSTRAINT "TaskDetail_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
