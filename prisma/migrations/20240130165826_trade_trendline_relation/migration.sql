/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wishlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trades_data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trendline_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "trades_data" DROP CONSTRAINT "trades_data_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "Wishlist";

-- DropTable
DROP TABLE "trades_data";

-- DropTable
DROP TABLE "trendline_data";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "trendlines" (
    "id" SERIAL NOT NULL,
    "token" INTEGER NOT NULL,
    "tf" TEXT NOT NULL,
    "slope" DOUBLE PRECISION NOT NULL,
    "intercept" DOUBLE PRECISION NOT NULL,
    "startdate" TIMESTAMP(3) NOT NULL,
    "enddate" TIMESTAMP(3) NOT NULL,
    "hl" TEXT NOT NULL,
    "index1" INTEGER NOT NULL,
    "index2" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "connects" INTEGER NOT NULL,
    "totalconnects" INTEGER NOT NULL,

    CONSTRAINT "trendlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trades" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "trendlineId" INTEGER NOT NULL,
    "token" INTEGER NOT NULL,
    "tf" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "entry_condition" TEXT NOT NULL,
    "entry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit" TIMESTAMP(3),
    "tp" DOUBLE PRECISION NOT NULL,
    "sl" DOUBLE PRECISION NOT NULL,
    "bp" DOUBLE PRECISION NOT NULL,
    "sp" DOUBLE PRECISION NOT NULL,
    "rrr" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "cap" DOUBLE PRECISION NOT NULL,
    "current_value" DOUBLE PRECISION NOT NULL,
    "pl" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "token" INTEGER NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_userId_token_key" ON "wishlist"("userId", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_trendlineId_fkey" FOREIGN KEY ("trendlineId") REFERENCES "trendlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
