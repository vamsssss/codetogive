/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Donor" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Donor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Beneficiary" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size" INTEGER NOT NULL,
    CONSTRAINT "Beneficiary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "donorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Listing_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ListingBeneficiaries" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ListingBeneficiaries_A_fkey" FOREIGN KEY ("A") REFERENCES "Beneficiary" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ListingBeneficiaries_B_fkey" FOREIGN KEY ("B") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ListingTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ListingTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ListingTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "donorId" INTEGER NOT NULL,
    "beneficiaryId" INTEGER NOT NULL,
    "score" REAL NOT NULL,
    CONSTRAINT "Match_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "Beneficiary" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("beneficiaryId", "donorId", "id", "score") SELECT "beneficiaryId", "donorId", "id", "score" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ListingBeneficiaries_AB_unique" ON "_ListingBeneficiaries"("A", "B");

-- CreateIndex
CREATE INDEX "_ListingBeneficiaries_B_index" ON "_ListingBeneficiaries"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ListingTags_AB_unique" ON "_ListingTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ListingTags_B_index" ON "_ListingTags"("B");
