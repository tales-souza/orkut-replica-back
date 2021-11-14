-- CreateTable
CREATE TABLE "authorizeToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" INTEGER NOT NULL,
    "dataAuthorization" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "authorizeToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "authorizeToken_userId_key" ON "authorizeToken"("userId");
