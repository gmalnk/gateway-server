/*
  Warnings:

  - A unique constraint covering the columns `[userId,token,category]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_token_category_key" ON "Wishlist"("userId", "token", "category");
