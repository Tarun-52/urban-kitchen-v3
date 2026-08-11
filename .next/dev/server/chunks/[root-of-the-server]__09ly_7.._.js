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
"[project]/src/app/api/products/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
    try {
        const { id } = await params;
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                id
            },
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
                        sortOrder: 'asc'
                    }
                },
                variants: {
                    orderBy: {
                        sortOrder: 'asc'
                    }
                }
            }
        });
        if (!product) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: false,
                message: 'Product not found'
            }, {
                status: 404
            });
        }
        // Compute priceRange and defaultVariant if variants exist
        let responseData = product;
        if (product.variants && product.variants.length > 0) {
            const prices = product.variants.map((v)=>v.price);
            const defaultVariant = product.variants.find((v)=>v.isDefault) || product.variants[0];
            responseData = {
                ...product,
                priceRange: {
                    min: Math.min(...prices),
                    max: Math.max(...prices)
                },
                defaultVariant
            };
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: true,
            message: 'Product fetched successfully',
            data: responseData
        });
    } catch (error) {
        console.error('Product fetch error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: false,
            message: 'Failed to fetch product'
        }, {
            status: 500
        });
    }
}
async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const existingProduct = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                id
            }
        });
        if (!existingProduct) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: false,
                message: 'Product not found'
            }, {
                status: 404
            });
        }
        const updateData = {};
        const allowedFields = [
            'name',
            'slug',
            'categoryId',
            'description',
            'shortDescription',
            'longDescription',
            'price',
            'steelGrade',
            'capacity',
            'dimensions',
            'stock',
            'moq',
            'leadTime',
            'featuredImage',
            'status',
            'featured',
            'variants'
        ];
        // Nullable string fields that should store null instead of empty string
        const nullableFields = [
            'shortDescription',
            'longDescription',
            'steelGrade',
            'capacity',
            'dimensions',
            'leadTime',
            'featuredImage'
        ];
        for (const field of allowedFields){
            if (field === 'variants') continue; // Handle variants separately
            if (body[field] !== undefined) {
                if (field === 'price') {
                    updateData[field] = parseFloat(body[field]);
                } else if (field === 'stock' || field === 'moq') {
                    updateData[field] = parseInt(body[field]);
                } else if (field === 'featured') {
                    updateData[field] = Boolean(body[field]);
                } else if (nullableFields.includes(field) && body[field] === '') {
                    updateData[field] = null;
                } else {
                    updateData[field] = body[field];
                }
            }
        }
        // Handle variants update in a transaction
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].$transaction(async (tx)=>{
            // Update the product fields first
            const updated = await tx.product.update({
                where: {
                    id
                },
                data: updateData,
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
                            sortOrder: 'asc'
                        }
                    }
                }
            });
            // Handle variants if provided
            if (body.variants !== undefined && Array.isArray(body.variants)) {
                const newVariants = body.variants;
                // Get existing variant IDs
                const existingVariants = await tx.productVariant.findMany({
                    where: {
                        productId: id
                    },
                    select: {
                        id: true
                    }
                });
                const existingVariantIds = new Set(existingVariants.map((v)=>v.id));
                // Determine which variant IDs are in the new list
                const newVariantIds = new Set(newVariants.filter((v)=>v.id).map((v)=>v.id));
                // Delete variants that are not in the new list
                const variantIdsToDelete = [
                    ...existingVariantIds
                ].filter((vid)=>!newVariantIds.has(vid));
                if (variantIdsToDelete.length > 0) {
                    await tx.productVariant.deleteMany({
                        where: {
                            id: {
                                in: variantIdsToDelete
                            }
                        }
                    });
                }
                // Upsert variants from the list
                for (const variant of newVariants){
                    const variantData = {
                        name: variant.name,
                        sku: variant.sku || null,
                        price: parseFloat(String(variant.price)),
                        stock: parseInt(String(variant.stock)) || 0,
                        weight: variant.weight || null,
                        dimensions: variant.dimensions || null,
                        isDefault: variant.isDefault || false,
                        sortOrder: variant.sortOrder || 0
                    };
                    if (variant.id && existingVariantIds.has(variant.id)) {
                        // Update existing variant
                        await tx.productVariant.update({
                            where: {
                                id: variant.id
                            },
                            data: variantData
                        });
                    } else {
                        // Create new variant
                        await tx.productVariant.create({
                            data: {
                                productId: id,
                                ...variantData
                            }
                        });
                    }
                }
                // Re-fetch with updated variants
                return tx.product.findUnique({
                    where: {
                        id
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
                                sortOrder: 'asc'
                            }
                        }
                    }
                });
            }
            return updated;
        });
        // Compute priceRange and defaultVariant for the response
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
            message: 'Product updated successfully',
            data: responseData
        });
    } catch (error) {
        console.error('Product update error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: false,
            message: 'Failed to update product'
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const existingProduct = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findUnique({
            where: {
                id
            }
        });
        if (!existingProduct) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: false,
                message: 'Product not found'
            }, {
                status: 404
            });
        }
        // Delete related images first (cascade should handle variants and images, but being explicit for images)
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productImage.deleteMany({
            where: {
                productId: id
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].productVariant.deleteMany({
            where: {
                productId: id
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.delete({
            where: {
                id
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: true,
            message: 'Product deleted successfully',
            data: null
        });
    } catch (error) {
        console.error('Product delete error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: false,
            message: 'Failed to delete product'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__09ly_7.._.js.map