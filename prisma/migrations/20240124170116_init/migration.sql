-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trendline_data" (
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

    CONSTRAINT "trendline_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trades_data" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
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

    CONSTRAINT "trades_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" INTEGER NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "trades_data" ADD CONSTRAINT "trades_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
