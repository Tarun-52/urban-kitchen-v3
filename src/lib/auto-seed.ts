import { prisma } from "./db";

let alreadySeeded = false;

export async function autoSeedProducts() {
  if (alreadySeeded) return;

  const count = await prisma.product.count();

  if (count > 0) {
    alreadySeeded = true;
    return;
  }

  const category = await prisma.category.upsert({
    where: { slug: "commercial-burners" },
    update: {},
    create: {
      name: "Commercial Burners",
      slug: "commercial-burners",
      description: "Commercial kitchen burner equipment",
      status: "active",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Triple Burner Cooking Range – SS304",
        slug: "triple-burner-cooking-range-ss304",
        description: "Heavy-duty triple burner cooking range.",
        shortDescription: "SS304 triple burner range",
        price: 28500,
        steelGrade: "SS304",
        capacity: "3 Burners",
        dimensions: "900×600×850mm",
        featuredImage: "/products/triple-burner.jpg",
        categoryId: category.id,
        status: "active",
        stock: 25,
        featured: true,
      },
      {
        name: "Two Burner Cooking Range – SS304",
        slug: "two-burner-cooking-range-ss304",
        description: "Heavy-duty two burner cooking range.",
        shortDescription: "SS304 two burner range",
        price: 22500,
        steelGrade: "SS304",
        capacity: "2 Burners",
        dimensions: "700×600×850mm",
        featuredImage: "/products/two-burner.jpg",
        categoryId: category.id,
        status: "active",
        stock: 20,
        featured: false,
      },
    ],
  });

  alreadySeeded = true;
}