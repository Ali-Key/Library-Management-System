/*
  Warnings:

  - You are about to drop the `Return` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `borrowingDate` on the `Borrowing` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Borrowing` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `Borrowing` table. All the data in the column will be lost.
  - You are about to drop the column `ISBN` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publicationDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Borrowing` table without a default value. This is not possible if the table is not empty.
  - Made the column `dueDate` on table `Borrowing` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Return_borrowingId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Return";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_BookToStaff" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BookToStaff_A_fkey" FOREIGN KEY ("A") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToStaff_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Borrowing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "lateFee" REAL,
    CONSTRAINT "Borrowing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Borrowing_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Borrowing" ("bookId", "dueDate", "id") SELECT "bookId", "dueDate", "id" FROM "Borrowing";
DROP TABLE "Borrowing";
ALTER TABLE "new_Borrowing" RENAME TO "Borrowing";
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "dueDate" DATETIME
);
INSERT INTO "new_Book" ("author", "id", "title") SELECT "author", "id", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,
    "adminId" INTEGER,
    CONSTRAINT "Customer_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Customer_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("id", "username") SELECT "id", "username" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminId" INTEGER NOT NULL,
    CONSTRAINT "Staff_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("adminId", "email", "id", "password") SELECT "adminId", "email", "id", "password" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");
CREATE TABLE "new_Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Admin" ("email", "id", "password") SELECT "email", "id", "password" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_BookToStaff_AB_unique" ON "_BookToStaff"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToStaff_B_index" ON "_BookToStaff"("B");
