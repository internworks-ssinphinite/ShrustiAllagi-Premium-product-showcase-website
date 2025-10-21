import prisma from "../config/prismaClient.js";

async function seed() {
  try {
    // Seed Users
    const user1 = await prisma.user.create({
      data: {
        name: "Shrusti",
        email: "shrusti@example.com",
        password: "hashedpassword123", // ideally hashed using bcrypt
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "hashedpassword123",
      },
    });

    // Seed Products
    const product1 = await prisma.product.create({
      data: {
        title: "Classic Gold Watch",
        description: "Luxury watch",
        price: 25000,
        images: "[]",
        category: "watches",
        stock: 5,
      },
    });

    const product2 = await prisma.product.create({
      data: {
        title: "Elegant Bracelet",
        description: "Gold plated bracelet",
        price: 12000,
        images: "[]",
        category: "accessories",
        stock: 10,
      },
    });

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seed function
seed();
