/*
  Warnings:

  - Added the required column `koreanName` to the `features` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "features" ADD COLUMN     "koreanName" TEXT NOT NULL;
