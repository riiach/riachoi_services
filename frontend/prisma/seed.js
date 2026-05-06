const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    await prisma.feature.createMany({
        data: [
            {
                name: "Landing Page",
                description: "Responsive landing page",
                price: 300,
            },
            {
                name: "Contact Form",
                description: "Email contact form integration",
                price: 100,
            },
            {
                name: "Admin Dashboard",
                description: "Admin management dashboard",
                price: 500,
            },
            {
                name: "Blog Integration",
                description: "DropInBlog integration",
                price: 200,
            },
            {
                name: "SEO Optimization",
                description: "SEO setup and optimization",
                price: 150,
            },
        ],
    });

    console.log("Seed data inserted.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });