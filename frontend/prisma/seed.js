const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { seedCategories } = require("./seeds/categories");
const { seedFeatures } = require("./seeds/features");
const { seedPackages } = require("./seeds/packages");

async function main() {
  await seedCategories(prisma);
  await seedFeatures(prisma);
  await seedPackages(prisma);

  console.log("Seeding complete!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});