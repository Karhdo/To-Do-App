-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userName" VARCHAR(50) NOT NULL,
    "password" VARCHAR(10) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "nameTask" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAd" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskDetail" (
    "id" SERIAL NOT NULL,
    "nameTaskDetail" VARCHAR(50) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR(100) NOT NULL,
    "deadline" TIMESTAMP NOT NULL,
    "taskDetailId" INTEGER NOT NULL,

    CONSTRAINT "TaskDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskDetail" ADD CONSTRAINT "TaskDetail_taskDetailId_fkey" FOREIGN KEY ("taskDetailId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
