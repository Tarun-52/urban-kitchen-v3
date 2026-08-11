module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/seed/new-products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
const foodPreparationProducts = [
    {
        name: 'Commercial Mixer',
        slug: 'commercial-mixer',
        price: 45000,
        shortDescription: 'Heavy-duty commercial mixer for large-scale food preparation. Perfect for hotels and restaurants.',
        steelGrade: 'SS304',
        capacity: '20 Litre',
        stock: 15,
        featured: true,
        featuredImage: '/products/Commercial-Mixer.jpg'
    },
    {
        name: 'Potato Peeler',
        slug: 'potato-peeler',
        price: 28000,
        shortDescription: 'Automatic potato peeling machine with high efficiency. Reduces manual labor significantly.',
        steelGrade: 'SS304',
        capacity: '10-15 Kg',
        stock: 12,
        featured: true,
        featuredImage: '/products/Potato-Peeler.jpg'
    },
    {
        name: 'Vegetable Washer',
        slug: 'vegetable-washer',
        price: 35000,
        shortDescription: 'Industrial vegetable washing machine for thorough cleaning of bulk vegetables.',
        steelGrade: 'SS304',
        capacity: '25 Kg',
        stock: 10,
        featured: true,
        featuredImage: '/products/Vegetable-Washer.jpg'
    },
    {
        name: 'Tilting Wet Grinder',
        slug: 'tilting-wet-grinder',
        price: 32000,
        shortDescription: 'Tilting type wet grinder for easy pouring. Ideal for batter preparation in commercial kitchens.',
        steelGrade: 'SS304',
        capacity: '10 Litre',
        stock: 14,
        featured: true,
        featuredImage: '/products/Tilting-Wet-Grinder.jpg'
    },
    {
        name: 'Wet Grinder',
        slug: 'wet-grinder',
        price: 25000,
        shortDescription: 'Commercial wet grinder for preparing batter, masala paste and other wet grinding needs.',
        steelGrade: 'SS304',
        capacity: '7 Litre',
        stock: 18,
        featured: false,
        featuredImage: '/products/Wet-Grinder.jpg'
    },
    {
        name: 'Juice Extractor',
        slug: 'juice-extractor',
        price: 22000,
        shortDescription: 'High-performance juice extractor for fresh juice production. Stainless steel construction.',
        steelGrade: 'SS304',
        capacity: '15-20 L/hr',
        stock: 10,
        featured: true,
        featuredImage: '/products/Juice-Extractor.jpg'
    },
    {
        name: 'Vegetable Cutter',
        slug: 'vegetable-cutter',
        price: 18000,
        shortDescription: 'Multi-purpose vegetable cutting machine with interchangeable blades for various cuts.',
        steelGrade: 'SS304',
        capacity: '10 Kg',
        stock: 16,
        featured: false,
        featuredImage: '/products/Vegetable-Cutter.jpg'
    },
    {
        name: 'Attu Kneader',
        slug: 'attu-kneader',
        price: 15000,
        shortDescription: 'Dough kneading machine for bulk attu and flour preparation. Saves time and effort.',
        steelGrade: 'SS304',
        capacity: '7 Litre',
        stock: 20,
        featured: false,
        featuredImage: '/products/Attu-Kneader.jpg'
    },
    {
        name: 'Mass Curd Maker',
        slug: 'mass-curd-maker',
        price: 20000,
        shortDescription: 'Commercial curd maker for bulk curd and yogurt production. Consistent quality output.',
        steelGrade: 'SS304',
        capacity: '50 Litre',
        stock: 8,
        featured: true,
        featuredImage: '/products/Mass-Curd-Maker.jpg'
    },
    {
        name: 'Work Table With Sink',
        slug: 'work-table-with-sink',
        price: 18000,
        shortDescription: 'Stainless steel work table with built-in sink. Essential for food preparation stations.',
        steelGrade: 'SS304',
        capacity: '4 x 2.5 Ft',
        stock: 12,
        featured: false,
        featuredImage: '/products/Work-Table-With-Sink.jpg'
    }
];
const cookingRangesProducts = [
    {
        name: 'Bar B Que',
        slug: 'bar-b-que',
        price: 55000,
        shortDescription: 'Commercial BBQ grill for outdoor and indoor grilling. Heavy-duty construction for continuous use.',
        steelGrade: 'SS304',
        capacity: '4 Burner',
        stock: 8,
        featured: true,
        featuredImage: '/products/BAR-B-QUE.jpg'
    },
    {
        name: 'Roteserie Grill',
        slug: 'roteserie-grill',
        price: 65000,
        shortDescription: 'Automatic rotisserie grill for even roasting. Perfect for chicken, kebabs and more.',
        steelGrade: 'SS304',
        capacity: '12 Skewers',
        stock: 6,
        featured: true,
        featuredImage: '/products/Roteserie-Grill.jpg'
    },
    {
        name: 'Shawarma Machine',
        slug: 'shawarma-machine',
        price: 48000,
        shortDescription: 'Vertical shawarma machine with gas burners. Even heating for perfect shawarma preparation.',
        steelGrade: 'SS304',
        capacity: '3 Spits',
        stock: 10,
        featured: true,
        featuredImage: '/products/Shawarma-Machine.jpg'
    },
    {
        name: 'Roasted Chicken Display',
        slug: 'roasted-chicken-display',
        price: 75000,
        shortDescription: 'Heated display counter for roasted chicken. Keeps food warm while attracting customers.',
        steelGrade: 'SS304',
        capacity: '8 Shelves',
        stock: 5,
        featured: true,
        featuredImage: '/products/Roasted-Chicken-Display.jpg'
    },
    {
        name: 'Tandoor',
        slug: 'tandoor',
        price: 35000,
        shortDescription: 'Commercial gas tandoor for authentic tandoori cooking. High heat retention clay lining.',
        steelGrade: 'SS304',
        capacity: 'Standard',
        stock: 12,
        featured: true,
        featuredImage: '/products/Tandoor.jpg'
    },
    {
        name: 'Tava',
        slug: 'tava',
        price: 12000,
        shortDescription: 'Heavy-duty commercial tava for making chapati, paratha and flatbreads in bulk.',
        steelGrade: 'SS304',
        capacity: '18 Inch',
        stock: 20,
        featured: false,
        featuredImage: '/products/Tava.jpg'
    },
    {
        name: 'Dosa Tava',
        slug: 'dosa-tava',
        price: 15000,
        shortDescription: 'Specialized dosa tava with even heat distribution. Non-stick surface for perfect dosas.',
        steelGrade: 'SS304',
        capacity: '24 Inch',
        stock: 15,
        featured: true,
        featuredImage: '/products/Dosa-Tava.jpg'
    }
];
async function GET() {
    try {
        // Find Food Preparation category
        const prepCategory = await prisma.category.findFirst({
            where: {
                OR: [
                    {
                        slug: 'preparation-equipment'
                    },
                    {
                        name: {
                            contains: 'Preparation',
                            mode: 'insensitive'
                        }
                    },
                    {
                        name: {
                            contains: 'Food Preparation',
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });
        // Find Cooking Ranges category
        const cookingCategory = await prisma.category.findFirst({
            where: {
                OR: [
                    {
                        slug: 'cooking-ranges'
                    },
                    {
                        slug: 'cooking-equipment'
                    },
                    {
                        name: {
                            contains: 'Cooking',
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });
        if (!prepCategory && !cookingCategory) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: false,
                message: 'Categories not found. Please create "Food Preparation" and "Cooking Ranges" categories first.'
            }, {
                status: 404
            });
        }
        let createdCount = 0;
        const results = [];
        // Add Food Preparation products
        if (prepCategory) {
            for (const product of foodPreparationProducts){
                const exists = await prisma.product.findFirst({
                    where: {
                        slug: product.slug
                    }
                });
                if (!exists) {
                    await prisma.product.create({
                        data: {
                            ...product,
                            status: 'active',
                            categoryId: prepCategory.id
                        }
                    });
                    createdCount++;
                    results.push(`Created: ${product.name} (Food Preparation)`);
                } else {
                    results.push(`Skipped (exists): ${product.name}`);
                }
            }
        } else {
            results.push('WARNING: Food Preparation category not found');
        }
        // Add Cooking Ranges products
        if (cookingCategory) {
            for (const product of cookingRangesProducts){
                const exists = await prisma.product.findFirst({
                    where: {
                        slug: product.slug
                    }
                });
                if (!exists) {
                    await prisma.product.create({
                        data: {
                            ...product,
                            status: 'active',
                            categoryId: cookingCategory.id
                        }
                    });
                    createdCount++;
                    results.push(`Created: ${product.name} (Cooking Ranges)`);
                } else {
                    results.push(`Skipped (exists): ${product.name}`);
                }
            }
        } else {
            results.push('WARNING: Cooking Ranges category not found');
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: true,
            message: `Seeded ${createdCount} products`,
            data: {
                categoriesFound: {
                    foodPreparation: prepCategory ? prepCategory.name : 'NOT FOUND',
                    cookingRanges: cookingCategory ? cookingCategory.name : 'NOT FOUND'
                },
                productsCreated: createdCount,
                details: results
            }
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: false,
            message: error.message || 'Seed failed'
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__05yo.f9._.js.map