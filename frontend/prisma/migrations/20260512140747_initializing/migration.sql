/*
  Warnings:

  - You are about to drop the column `categoryId` on the `features` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedDays` on the `features` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `features` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `features` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "features" DROP CONSTRAINT "features_categoryId_fkey";

-- AlterTable
ALTER TABLE "features" DROP COLUMN "categoryId",
DROP COLUMN "estimatedDays",
DROP COLUMN "price",
ADD COLUMN     "estimatedHours" INTEGER,
ADD COLUMN     "estimatedMonths" INTEGER,
ADD COLUMN     "maxEstimatedDays" INTEGER,
ADD COLUMN     "maxPriceDollar" INTEGER,
ADD COLUMN     "maxPriceWon" INTEGER,
ADD COLUMN     "minEstimatedDays" INTEGER,
ADD COLUMN     "minPriceDollar" INTEGER,
ADD COLUMN     "minPriceWon" INTEGER;

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "koreanName" TEXT NOT NULL,
    "description" TEXT,
    "koreanDescription" TEXT,
    "minPriceDollar" INTEGER,
    "maxPriceDollar" INTEGER,
    "minPriceWon" INTEGER,
    "maxPriceWon" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FeatureToPackage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FeatureToPackage_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryToFeature" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToFeature_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FeatureToPackage_B_index" ON "_FeatureToPackage"("B");

-- CreateIndex
CREATE INDEX "_CategoryToFeature_B_index" ON "_CategoryToFeature"("B");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "features_name_key" ON "features"("name");

-- AddForeignKey
ALTER TABLE "_FeatureToPackage" ADD CONSTRAINT "_FeatureToPackage_A_fkey" FOREIGN KEY ("A") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeatureToPackage" ADD CONSTRAINT "_FeatureToPackage_B_fkey" FOREIGN KEY ("B") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToFeature" ADD CONSTRAINT "_CategoryToFeature_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToFeature" ADD CONSTRAINT "_CategoryToFeature_B_fkey" FOREIGN KEY ("B") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;
