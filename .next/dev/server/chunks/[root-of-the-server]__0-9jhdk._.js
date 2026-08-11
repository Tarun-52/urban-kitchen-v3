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
"[project]/src/app/api/dashboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        // ── Basic Counts ──
        const [totalOrders, totalLeads, totalProducts, totalCustomers, totalEmployees, activeAmcContracts] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.count(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].lead.count(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.count({
                where: {
                    status: 'active'
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.count({
                where: {
                    role: {
                        roleName: 'customer'
                    }
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].employee.count({
                where: {
                    status: 'active'
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].amcContract.count({
                where: {
                    status: 'active'
                }
            })
        ]);
        // ── Total Revenue (from delivered/paid orders) ──
        const revenueOrders = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findMany({
            where: {
                orderStatus: {
                    in: [
                        'delivered',
                        'confirmed',
                        'shipped'
                    ]
                },
                paymentStatus: 'paid'
            },
            select: {
                total: true,
                createdAt: true
            }
        });
        const totalRevenue = revenueOrders.reduce((sum, o)=>sum + o.total, 0);
        // ── Monthly Revenue (last 12 months) ──
        const monthlyRevenue = [];
        const now = new Date();
        for(let i = 11; i >= 0; i--){
            const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
            const monthLabel = startOfMonth.toLocaleString('en-US', {
                month: 'short',
                year: '2-digit'
            });
            const monthOrders = revenueOrders.filter((o)=>o.createdAt >= startOfMonth && o.createdAt <= endOfMonth);
            const monthRevenue = monthOrders.reduce((sum, o)=>sum + o.total, 0);
            monthlyRevenue.push({
                month: monthLabel,
                revenue: Math.round(monthRevenue * 100) / 100
            });
        }
        // ── Order Status Distribution ──
        const orderStatusCounts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.groupBy({
            by: [
                'orderStatus'
            ],
            _count: {
                orderStatus: true
            }
        });
        const orderStatusDistribution = orderStatusCounts.map((s)=>({
                status: s.orderStatus,
                count: s._count.orderStatus
            }));
        // ── Lead Status Distribution ──
        const leadStatusCounts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].lead.groupBy({
            by: [
                'status'
            ],
            _count: {
                status: true
            }
        });
        const leadStatusDistribution = leadStatusCounts.map((s)=>({
                status: s.status,
                count: s._count.status
            }));
        // ── Recent Orders (last 5) ──
        const recentOrders = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                items: {
                    select: {
                        product: {
                            select: {
                                name: true
                            }
                        },
                        qty: true,
                        price: true
                    }
                }
            }
        });
        // ── Recent Leads (last 5) ──
        const recentLeads = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].lead.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                assignee: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        // ── AMC Stats ──
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        const expiringContracts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].amcContract.count({
            where: {
                status: 'active',
                endDate: {
                    lte: thirtyDaysFromNow,
                    gte: new Date()
                }
            }
        });
        const amcStats = {
            active: activeAmcContracts,
            expiringSoon: expiringContracts,
            totalValue: await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].amcContract.aggregate({
                where: {
                    status: 'active'
                },
                _sum: {
                    amount: true
                }
            }).then((r)=>r._sum.amount || 0)
        };
        // ── Low Stock Products ──
        const lowStockProducts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].product.findMany({
            where: {
                status: 'active',
                stock: {
                    lte: 5
                }
            },
            select: {
                id: true,
                name: true,
                stock: true,
                price: true,
                category: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                stock: 'asc'
            },
            take: 10
        });
        // ── Payment Method Distribution ──
        const paymentMethodCounts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].order.groupBy({
            by: [
                'paymentMethod'
            ],
            _count: {
                paymentMethod: true
            }
        });
        const paymentDistribution = paymentMethodCounts.map((p)=>({
                method: p.paymentMethod || 'cod',
                count: p._count.paymentMethod
            }));
        // ── Category-wise Product Count ──
        const categories = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].category.findMany({
            include: {
                _count: {
                    select: {
                        products: true
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });
        const categoryDistribution = categories.map((c)=>({
                name: c.name,
                count: c._count.products
            }));
        // ── Pending Service Requests ──
        const pendingServiceRequests = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].serviceRequest.count({
            where: {
                status: {
                    in: [
                        'open',
                        'in_progress'
                    ]
                }
            }
        });
        // ── Pending Tasks ──
        const pendingTasks = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].task.count({
            where: {
                status: {
                    in: [
                        'pending',
                        'in_progress'
                    ]
                }
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: true,
            message: 'Dashboard statistics fetched successfully',
            data: {
                overview: {
                    totalRevenue: Math.round(totalRevenue * 100) / 100,
                    totalOrders,
                    totalLeads,
                    totalProducts,
                    totalCustomers,
                    totalEmployees,
                    activeAmcContracts,
                    pendingServiceRequests,
                    pendingTasks
                },
                monthlyRevenue,
                orderStatusDistribution,
                leadStatusDistribution,
                paymentDistribution,
                categoryDistribution,
                recentOrders,
                recentLeads,
                amcStats,
                lowStockProducts
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: false,
            message: 'Failed to fetch dashboard statistics'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0-9jhdk._.js.map