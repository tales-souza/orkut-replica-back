-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dt_nascimento" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "countryId" TEXT,
    CONSTRAINT "users_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("countryId", "dt_nascimento", "email", "id", "last_name", "name", "password", "sexo") SELECT "countryId", "dt_nascimento", "email", "id", "last_name", "name", "password", "sexo" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
