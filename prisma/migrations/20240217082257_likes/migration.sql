/*
  Warnings:

  - You are about to drop the `_LikesToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_LikesToPost" DROP CONSTRAINT "_LikesToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikesToPost" DROP CONSTRAINT "_LikesToPost_B_fkey";

-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "postId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_LikesToPost";

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
