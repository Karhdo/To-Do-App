/*
  Warnings:

  - You are about to drop the `TasksDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TasksDetail" DROP CONSTRAINT "TasksDetail_taskId_fkey";

-- DropTable
DROP TABLE "TasksDetail";

-- CreateTable
CREATE TABLE "TaskDetail" (
    "id" SERIAL NOT NULL,
    "nameTaskDetail" VARCHAR(50) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR(100) NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "TaskDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskDetail" ADD CONSTRAINT "TaskDetail_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
