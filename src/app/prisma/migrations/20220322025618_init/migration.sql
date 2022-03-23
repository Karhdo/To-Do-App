/*
  Warnings:

  - You are about to drop the `TaskDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskDetail" DROP CONSTRAINT "TaskDetail_taskId_fkey";

-- DropTable
DROP TABLE "TaskDetail";

-- CreateTable
CREATE TABLE "TasksDetail" (
    "id" SERIAL NOT NULL,
    "nameTaskDetail" VARCHAR(50) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR(100) NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "TasksDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TasksDetail" ADD CONSTRAINT "TasksDetail_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
