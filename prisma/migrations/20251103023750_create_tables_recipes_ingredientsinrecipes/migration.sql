/*
  Warnings:

  - The primary key for the `ingredients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `ingredients` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "public"."ingredients" DROP CONSTRAINT "ingredients_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "public"."recipes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "howToPrepare" TEXT NOT NULL,
    "timeToPrepare" INTEGER NOT NULL,
    "portions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ingredients_in_recipes" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "ingredientName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "ingredients_in_recipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipes_name_key" ON "public"."recipes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_in_recipes_recipeId_ingredientName_key" ON "public"."ingredients_in_recipes"("recipeId", "ingredientName");

-- AddForeignKey
ALTER TABLE "public"."ingredients_in_recipes" ADD CONSTRAINT "ingredients_in_recipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ingredients_in_recipes" ADD CONSTRAINT "ingredients_in_recipes_ingredientName_fkey" FOREIGN KEY ("ingredientName") REFERENCES "public"."ingredients"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
