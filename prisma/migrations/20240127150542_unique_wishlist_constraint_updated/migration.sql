/*
  Warnings:

  - A unique constraint covering the columns `[userId,token]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Wishlist_userId_token_category_key";

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_token_key" ON "Wishlist"("userId", "token");
