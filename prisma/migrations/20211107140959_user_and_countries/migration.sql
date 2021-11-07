-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dt_nascimento" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "countryId" TEXT,
    CONSTRAINT "users_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
