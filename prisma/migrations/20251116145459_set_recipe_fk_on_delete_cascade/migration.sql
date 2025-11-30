-- DropForeignKey
ALTER TABLE "public"."ingredients_in_recipes" DROP CONSTRAINT "ingredients_in_recipes_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "public"."ingredients_in_recipes" ADD CONSTRAINT "ingredients_in_recipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
