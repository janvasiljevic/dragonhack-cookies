-- CreateTable
CREATE TABLE "_liked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_liked_AB_unique" ON "_liked"("A", "B");

-- CreateIndex
CREATE INDEX "_liked_B_index" ON "_liked"("B");

-- AddForeignKey
ALTER TABLE "_liked" ADD CONSTRAINT "_liked_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_liked" ADD CONSTRAINT "_liked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
