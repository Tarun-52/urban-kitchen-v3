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
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db,
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
const db = prisma;
}),
"[project]/src/lib/auto-seed.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoSeedProducts",
    ()=>autoSeedProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
let alreadySeeded = false;
async function autoSeedProducts() {
    if (alreadySeeded) return;
    const count = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.count();
    if (count > 0) {
        alreadySeeded = true;
        return;
    }
    const category = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].category.upsert({
        where: {
            slug: "commercial-burners"
        },
        update: {},
        create: {
            name: "Commercial Burners",
            slug: "commercial-burners",
            description: "Commercial kitchen burner equipment",
            status: "active"
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].product.createMany({
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
                featured: true
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
                featured: false
            }
        ]
    });
    alreadySeeded = true;
}
}),
"[project]/src/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auto$2d$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auto-seed.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auto$2d$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["autoSeedProducts"])();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const featured = searchParams.get("featured");
        const status = searchParams.get("status");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const skip = (page - 1) * limit;
        const where = {};
        if (category) {
            where.category = {
                slug: category
            };
        }
        if (search) {
            where.OR = [
                {
                    name: {
                        contains: search
                    }
                },
                {
                    description: {
                        contains: search
                    }
                },
                {
                    shortDescription: {
                        contains: search
                    }
                },
                {
                    steelGrade: {
                        contains: search
                    }
                }
            ];
        }
        if (featured === "true") {
            where.featured = true;
        }
        if (status) {
            where.status = status;
        } else {
            where.status = "active";
        }
        const [products, total] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
                where,
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true
                        }
                    },
                    images: {
                        orderBy: {
                            sortOrder: "asc"
                        }
                    },
                    variants: {
                        orderBy: {
                            sortOrder: "asc"
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip,
                take: limit
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.count({
                where
            })
        ]);
        const enrichedProducts = products.map((product)=>{
            if (product.variants && product.variants.length > 0) {
                const prices = product.variants.map((v)=>v.price);
                const defaultVariant = product.variants.find((v)=>v.isDefault) || product.variants[0];
                return {
                    ...product,
                    priceRange: {
                        min: Math.min(...prices),
                        max: Math.max(...prices)
                    },
                    defaultVariant
                };
            }
            return product;
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: true,
            success: true,
            message: "Products fetched successfully",
            data: {
                products: enrichedProducts,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            },
            products: enrichedProducts
        });
    } catch (error) {
        console.error("Products fetch error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: false,
            success: false,
            message: "Failed to fetch products",
            error: error instanceof Error ? {
                message: error.message,
                stack: error.stack
            } : error
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { name, categoryId, description, shortDescription, longDescription, price, steelGrade, capacity, dimensions, stock, moq, leadTime, featuredImage, status, featured, slug, variants } = body;
        if (!name || !categoryId || !description || !price) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: false,
                message: "Name, categoryId, description, and price are required"
            }, {
                status: 400
            });
        }
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findUnique({
            where: {
                id: categoryId
            }
        });
        if (!category) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: false,
                message: "Category not found"
            }, {
                status: 404
            });
        }
        const productSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{
            const newProduct = await tx.product.create({
                data: {
                    name,
                    slug: productSlug,
                    categoryId,
                    description,
                    shortDescription: shortDescription || null,
                    longDescription: longDescription || null,
                    price: parseFloat(price),
                    steelGrade: steelGrade || null,
                    capacity: capacity || null,
                    dimensions: dimensions || null,
                    stock: stock ? parseInt(stock) : 0,
                    moq: moq ? parseInt(moq) : 1,
                    leadTime: leadTime || null,
                    featuredImage: featuredImage || null,
                    status: status || "active",
                    featured: featured || false
                },
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true
                        }
                    }
                }
            });
            if (variants && Array.isArray(variants) && variants.length > 0) {
                await tx.productVariant.createMany({
                    data: variants.map((variant)=>({
                            productId: newProduct.id,
                            name: variant.name,
                            sku: variant.sku || null,
                            price: parseFloat(String(variant.price)),
                            stock: parseInt(String(variant.stock)) || 0,
                            weight: variant.weight || null,
                            dimensions: variant.dimensions || null,
                            isDefault: variant.isDefault || false,
                            sortOrder: variant.sortOrder || 0
                        }))
                });
            }
            return tx.product.findUnique({
                where: {
                    id: newProduct.id
                },
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true
                        }
                    },
                    variants: {
                        orderBy: {
                            sortOrder: "asc"
                        }
                    }
                }
            });
        });
        const responseData = product ? (()=>{
            if (product.variants && product.variants.length > 0) {
                const prices = product.variants.map((v)=>v.price);
                const defaultVariant = product.variants.find((v)=>v.isDefault) || product.variants[0];
                return {
                    ...product,
                    priceRange: {
                        min: Math.min(...prices),
                        max: Math.max(...prices)
                    },
                    defaultVariant
                };
            }
            return product;
        })() : null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: true,
            message: "Product created successfully",
            data: responseData
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Product create error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: false,
            message: "Failed to create product"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0i61rfe._.js.map