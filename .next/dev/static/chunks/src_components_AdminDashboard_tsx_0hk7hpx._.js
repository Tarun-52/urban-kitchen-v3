(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/AdminDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/admin/types.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$DashboardTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/DashboardTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$ProductsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/ProductsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$CategoriesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/CategoriesTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$OrdersTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/OrdersTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$LeadsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/LeadsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$QuotationsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/QuotationsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$CustomersTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/CustomersTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$UsersTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/UsersTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$EmployeesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/EmployeesTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AttendanceTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/AttendanceTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$LeavesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/LeavesTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AmcTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/AmcTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$ServiceTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/ServiceTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$InquiriesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/InquiriesTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$SettingsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/SettingsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$ActivityTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/ActivityTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$CrmModules$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/CrmModules.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$HrmModulesNew$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/HrmModulesNew.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$Dialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/Dialogs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$BlogTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/BlogTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$EmployeeLiveLocationTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin/EmployeeLiveLocationTab.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// ─── Role-Based Sidebar Filtering ─────────────────────────
const MANAGER_HIDDEN_ITEMS = new Set([
    // HRM items hidden from managers
    'hrm-permissions',
    'hrm-recruitment',
    'hrm-job-openings',
    'hrm-interviews',
    'hrm-performance',
    'hrm-appraisals',
    'hrm-training',
    'hrm-assets',
    'hrm-documents'
]);
function filterItemsByRole(items, roleName) {
    if (roleName === 'admin') return items;
    return items.filter((item)=>!MANAGER_HIDDEN_ITEMS.has(item.key));
}
function filterSectionsByRole(sections, roleName) {
    return sections.map((s)=>({
            ...s,
            items: filterItemsByRole(s.items, roleName)
        })).filter((s)=>s.items.length > 0);
}
function filterGroupByRole(group, roleName) {
    return {
        ...group,
        sections: filterSectionsByRole(group.sections, roleName)
    };
}
function AdminDashboard() {
    _s();
    const { adminTab, setAdminTab, setUser, setView, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])();
    const roleName = user?.role?.roleName || 'admin';
    const [sidebarCollapsed, setSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ─── Shared State ───────────────────────────────────────
    const [dashboardData, setDashboardData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [leads, setLeads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [employees, setEmployees] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [amcContracts, setAmcContracts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [serviceRequests, setServiceRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // ─── Dialog States ──────────────────────────────────────
    const [productDialog, setProductDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editProduct, setEditProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [categoryDialog, setCategoryDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editCategory, setEditCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [categoryToDelete, setCategoryToDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [orderDialog, setOrderDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedOrder, setSelectedOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [leadDialog, setLeadDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [leadDetailDialog, setLeadDetailDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedLead, setSelectedLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quotationDialog, setQuotationDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editQuotation, setEditQuotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [employeeDialog, setEmployeeDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [amcDialog, setAmcDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [serviceDialog, setServiceDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ─── Form States ────────────────────────────────────────
    const [productForm, setProductForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emptyProductForm"]);
    const [categoryForm, setCategoryForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emptyCategoryForm"]);
    const [productVariants, setProductVariants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [leadForm, setLeadForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        company: '',
        phone: '',
        email: '',
        city: '',
        requirement: '',
        message: '',
        source: 'website',
        assignedTo: ''
    });
    const [quotationCustomerName, setQuotationCustomerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [quotationCustomerCompany, setQuotationCustomerCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [quotationCustomerEmail, setQuotationCustomerEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [quotationCustomerPhone, setQuotationCustomerPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [quotationCustomerAddress, setQuotationCustomerAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [quotationCustomerGst, setQuotationCustomerGst] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [quotationItems, setQuotationItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            desc: '',
            hsn: '',
            qty: '1',
            unit: 'Nos',
            rate: '',
            discount: '0',
            gstPercent: '18'
        }
    ]);
    const [quotationValidUntil, setQuotationValidUntil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [quotationNotes, setQuotationNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [quotationDeliveryPeriod, setQuotationDeliveryPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('2-3 weeks');
    const [quotationInstallation, setQuotationInstallation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Included');
    const [quotationWarranty, setQuotationWarranty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('12 months against manufacturing defects');
    const [quotationDetailDialog, setQuotationDetailDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedQuotation, setSelectedQuotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sendingQuotation, setSendingQuotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quotationTemplate, setQuotationTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('modern');
    const [companyCustomization, setCompanyCustomization] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        logo: '',
        name: 'Urban Kitchen Manufacturing & Solutions',
        address: 'Sector 12, Industrial Area, New Delhi',
        contact: '+91-7080488840',
        email: 'sales@urbankitchen.com',
        website: 'www.urbankitchen.com',
        gstNumber: '07AABCU9603R1ZM',
        signature: '',
        terms: '',
        brandColor: '#59ff00',
        footerNotes: 'Thank you for your business!'
    });
    const [employeeForm, setEmployeeForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        phone: '',
        password: '',
        department: '',
        designation: '',
        salary: '',
        joiningDate: ''
    });
    const [amcForm, setAmcForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        customerId: '',
        plan: '',
        startDate: '',
        endDate: '',
        amount: '',
        coverage: ''
    });
    const [serviceForm, setServiceForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        customerId: '',
        contractId: '',
        issue: '',
        priority: 'medium',
        assignedTechnician: ''
    });
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ─── Tab-specific States ────────────────────────────────
    const [quotationList, setQuotationList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userList, setUserList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [roleList, setRoleList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userDialog, setUserDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editUser, setEditUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userForm, setUserForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        phone: '',
        password: '',
        roleId: '',
        status: 'active'
    });
    const [roleFilter, setRoleFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [empEditDialog, setEmpEditDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editEmp, setEditEmp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [empEditForm, setEmpEditForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        phone: '',
        password: '',
        department: '',
        designation: '',
        salary: '',
        joiningDate: '',
        status: 'active'
    });
    const [attendanceRecords, setAttendanceRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [leaveList, setLeaveList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [leaveFilter, setLeaveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [inquiryList, setInquiryList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [settingsObj, setSettingsObj] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [settingsLoading, setSettingsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activityList, setActivityList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [crmExpanded, setCrmExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hrmExpanded, setHrmExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sidebarSearch, setSidebarSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [headerSearch, setHeaderSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [orderStatusFilter, setOrderStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [productCategoryFilter, setProductCategoryFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [searchQueries, setSearchQueries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [unreadCount, setUnreadCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [notifOpen, setNotifOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ─── Blog States ─────────────────────────────────────────
    const [blogs, setBlogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [blogDialog, setBlogDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editBlog, setEditBlog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [blogForm, setBlogForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emptyBlogForm"]);
    const [blogStatusFilter, setBlogStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    // ─── Fetch helpers ──────────────────────────────────────
    const doFetchProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboard.useCallback[doFetchProducts]": ()=>{
            const params = new URLSearchParams();
            if (searchQueries.products) params.set('search', searchQueries.products);
            if (productCategoryFilter !== 'all') params.set('category', productCategoryFilter);
            params.set('status', 'active');
            params.set('limit', '50');
            fetch(`/api/products?${params}`).then({
                "AdminDashboard.useCallback[doFetchProducts]": (r)=>r.json()
            }["AdminDashboard.useCallback[doFetchProducts]"]).then({
                "AdminDashboard.useCallback[doFetchProducts]": (j)=>{
                    if (j.status) setProducts(j.data.products);
                }
            }["AdminDashboard.useCallback[doFetchProducts]"]).catch(console.error);
        }
    }["AdminDashboard.useCallback[doFetchProducts]"], [
        searchQueries.products,
        productCategoryFilter
    ]);
    const doFetchCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboard.useCallback[doFetchCategories]": ()=>{
            fetch('/api/categories').then({
                "AdminDashboard.useCallback[doFetchCategories]": (r)=>r.json()
            }["AdminDashboard.useCallback[doFetchCategories]"]).then({
                "AdminDashboard.useCallback[doFetchCategories]": (j)=>{
                    if (j.status) setCategories(j.data);
                }
            }["AdminDashboard.useCallback[doFetchCategories]"]).catch(console.error);
        }
    }["AdminDashboard.useCallback[doFetchCategories]"], []);
    const doFetchOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboard.useCallback[doFetchOrders]": ()=>{
            const params = new URLSearchParams();
            if (orderStatusFilter !== 'all') params.set('status', orderStatusFilter);
            if (searchQueries.orders) params.set('search', searchQueries.orders);
            params.set('limit', '50');
            fetch(`/api/orders?${params}`).then({
                "AdminDashboard.useCallback[doFetchOrders]": (r)=>r.json()
            }["AdminDashboard.useCallback[doFetchOrders]"]).then({
                "AdminDashboard.useCallback[doFetchOrders]": (j)=>{
                    if (j.status) setOrders(j.data.orders);
                }
            }["AdminDashboard.useCallback[doFetchOrders]"]).catch(console.error);
        }
    }["AdminDashboard.useCallback[doFetchOrders]"], [
        orderStatusFilter,
        searchQueries.orders
    ]);
    const doFetchLeads = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboard.useCallback[doFetchLeads]": ()=>{
            fetch('/api/leads?limit=50').then({
                "AdminDashboard.useCallback[doFetchLeads]": (r)=>r.json()
            }["AdminDashboard.useCallback[doFetchLeads]"]).then({
                "AdminDashboard.useCallback[doFetchLeads]": (j)=>{
                    if (j.status) setLeads(j.data.leads);
                }
            }["AdminDashboard.useCallback[doFetchLeads]"]).catch(console.error);
        }
    }["AdminDashboard.useCallback[doFetchLeads]"], []);
    const doFetchEmployees = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboard.useCallback[doFetchEmployees]": ()=>{
            fetch('/api/employees?limit=50').then({
                "AdminDashboard.useCallback[doFetchEmployees]": (r)=>r.json()
            }["AdminDashboard.useCallback[doFetchEmployees]"]).then({
                "AdminDashboard.useCallback[doFetchEmployees]": (j)=>{
                    if (j.status) setEmployees(j.data.employees);
                }
            }["AdminDashboard.useCallback[doFetchEmployees]"]).catch(console.error);
        }
    }["AdminDashboard.useCallback[doFetchEmployees]"], []);
    const doFetchAmc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboard.useCallback[doFetchAmc]": ()=>{
            Promise.all([
                fetch('/api/amc?limit=50'),
                fetch('/api/service-requests?limit=50')
            ]).then({
                "AdminDashboard.useCallback[doFetchAmc]": ([amcR, srR])=>Promise.all([
                        amcR.json(),
                        srR.json()
                    ])
            }["AdminDashboard.useCallback[doFetchAmc]"]).then({
                "AdminDashboard.useCallback[doFetchAmc]": ([amcJ, srJ])=>{
                    if (amcJ.status) setAmcContracts(amcJ.data.contracts);
                    if (srJ.status) setServiceRequests(srJ.data.serviceRequests);
                }
            }["AdminDashboard.useCallback[doFetchAmc]"]).catch(console.error);
        }
    }["AdminDashboard.useCallback[doFetchAmc]"], []);
    const doFetchUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboard.useCallback[doFetchUsers]": ()=>{
            const params = new URLSearchParams();
            if (roleFilter !== 'all') params.set('role', roleFilter);
            fetch(`/api/users?${params}`).then({
                "AdminDashboard.useCallback[doFetchUsers]": (r)=>r.json()
            }["AdminDashboard.useCallback[doFetchUsers]"]).then({
                "AdminDashboard.useCallback[doFetchUsers]": (j)=>{
                    if (j.status) {
                        setUserList(j.data.users || j.data || []);
                        if (j.data.roles) setRoleList(j.data.roles);
                    }
                }
            }["AdminDashboard.useCallback[doFetchUsers]"]).catch(console.error);
        }
    }["AdminDashboard.useCallback[doFetchUsers]"], [
        roleFilter
    ]);
    const doFetchNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboard.useCallback[doFetchNotifications]": ()=>{
            const userId = user?.id || '';
            fetch(`/api/notifications?userId=${userId}&limit=50`).then({
                "AdminDashboard.useCallback[doFetchNotifications]": (r)=>r.json()
            }["AdminDashboard.useCallback[doFetchNotifications]"]).then({
                "AdminDashboard.useCallback[doFetchNotifications]": (j)=>{
                    if (j.status) {
                        setNotifications(j.data.notifications || []);
                        setUnreadCount(j.data.unreadCount || 0);
                    }
                }
            }["AdminDashboard.useCallback[doFetchNotifications]"]).catch(console.error);
        }
    }["AdminDashboard.useCallback[doFetchNotifications]"], [
        user
    ]);
    // ─── Effects ────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            fetch('/api/dashboard').then({
                "AdminDashboard.useEffect": (r)=>r.json()
            }["AdminDashboard.useEffect"]).then({
                "AdminDashboard.useEffect": (j)=>{
                    if (j.status) setDashboardData(j.data);
                }
            }["AdminDashboard.useEffect"]).catch(console.error);
        }
    }["AdminDashboard.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            doFetchNotifications();
        }
    }["AdminDashboard.useEffect"], [
        doFetchNotifications
    ]);
    // Auto-refresh notifications every 30s
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            const interval = setInterval(doFetchNotifications, 30000);
            return ({
                "AdminDashboard.useEffect": ()=>clearInterval(interval)
            })["AdminDashboard.useEffect"];
        }
    }["AdminDashboard.useEffect"], [
        doFetchNotifications
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'products') {
                doFetchProducts();
                doFetchCategories();
            }
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        doFetchProducts,
        doFetchCategories
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'categories') doFetchCategories();
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        doFetchCategories
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'orders') doFetchOrders();
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        doFetchOrders
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'leads') doFetchLeads();
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        doFetchLeads
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'employees') doFetchEmployees();
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        doFetchEmployees
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'amc' || adminTab === 'service') doFetchAmc();
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        doFetchAmc
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'quotations') fetch('/api/quotations?limit=50').then({
                "AdminDashboard.useEffect": (r)=>r.json()
            }["AdminDashboard.useEffect"]).then({
                "AdminDashboard.useEffect": (j)=>{
                    if (j.status) setQuotationList(j.data.quotations || j.data || []);
                }
            }["AdminDashboard.useEffect"]).catch(console.error);
        }
    }["AdminDashboard.useEffect"], [
        adminTab
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'customers' || adminTab === 'users') doFetchUsers();
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        doFetchUsers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'attendance') fetch('/api/attendance?limit=50').then({
                "AdminDashboard.useEffect": (r)=>r.json()
            }["AdminDashboard.useEffect"]).then({
                "AdminDashboard.useEffect": (j)=>{
                    if (j.status) setAttendanceRecords(j.data.records || j.data.attendance || j.data || []);
                }
            }["AdminDashboard.useEffect"]).catch(console.error);
        }
    }["AdminDashboard.useEffect"], [
        adminTab
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'leaves') {
                const params = leaveFilter !== 'all' ? `?status=${leaveFilter}` : '';
                fetch(`/api/leaves${params}`).then({
                    "AdminDashboard.useEffect": (r)=>r.json()
                }["AdminDashboard.useEffect"]).then({
                    "AdminDashboard.useEffect": (j)=>{
                        if (j.status) setLeaveList(j.data.leaves || j.data || []);
                    }
                }["AdminDashboard.useEffect"]).catch(console.error);
            }
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        leaveFilter
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'inquiries') fetch('/api/inquiries?limit=50').then({
                "AdminDashboard.useEffect": (r)=>r.json()
            }["AdminDashboard.useEffect"]).then({
                "AdminDashboard.useEffect": (j)=>{
                    if (j.status) setInquiryList(j.data.inquiries || j.data || []);
                }
            }["AdminDashboard.useEffect"]).catch(console.error);
        }
    }["AdminDashboard.useEffect"], [
        adminTab
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'settings') fetch('/api/settings').then({
                "AdminDashboard.useEffect": (r)=>r.json()
            }["AdminDashboard.useEffect"]).then({
                "AdminDashboard.useEffect": (j)=>{
                    if (j.status) setSettingsObj(j.data || {});
                }
            }["AdminDashboard.useEffect"]).catch(console.error);
        }
    }["AdminDashboard.useEffect"], [
        adminTab
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'activity') {
                Promise.all([
                    fetch('/api/orders?limit=10'),
                    fetch('/api/leads?limit=10')
                ]).then({
                    "AdminDashboard.useEffect": ([oR, lR])=>Promise.all([
                            oR.json(),
                            lR.json()
                        ])
                }["AdminDashboard.useEffect"]).then({
                    "AdminDashboard.useEffect": ([oJ, lJ])=>{
                        const a = [];
                        if (oJ.status) (oJ.data.orders || []).forEach({
                            "AdminDashboard.useEffect": (o)=>a.push({
                                    type: 'order',
                                    description: `Order ${o.orderNumber} by ${o.customer?.name}`,
                                    status: o.orderStatus,
                                    date: o.createdAt
                                })
                        }["AdminDashboard.useEffect"]);
                        if (lJ.status) (lJ.data.leads || []).forEach({
                            "AdminDashboard.useEffect": (l)=>a.push({
                                    type: 'lead',
                                    description: `Lead: ${l.name} (${l.company || 'N/A'})`,
                                    status: l.status,
                                    date: l.createdAt
                                })
                        }["AdminDashboard.useEffect"]);
                        a.sort({
                            "AdminDashboard.useEffect": (a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()
                        }["AdminDashboard.useEffect"]);
                        setActivityList(a);
                    }
                }["AdminDashboard.useEffect"]).catch(console.error);
            }
        }
    }["AdminDashboard.useEffect"], [
        adminTab
    ]);
    // Fetch leads/employees for CRM/HRM sub-tabs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            const isCrmSubTab = adminTab.startsWith('crm-');
            const isHrmSubTab = adminTab.startsWith('hrm-');
            if (isCrmSubTab || isHrmSubTab) {
                doFetchLeads();
                doFetchEmployees();
            }
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        doFetchLeads,
        doFetchEmployees
    ]);
    // ─── Image Upload Handler ──────────────────────────────
    const handleImageUpload = async (file)=>{
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            if (!res.ok) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Upload failed (HTTP ${res.status})`);
                return null;
            }
            const json = await res.json();
            if (json.status && json.data?.url) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Image uploaded successfully');
                return json.data.url;
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Upload failed');
                return null;
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to upload image');
            return null;
        } finally{
            setUploading(false);
        }
    };
    // ─── Compute Quotation Totals ──────────────────────────
    const computeQuotationTotals = ()=>{
        let subtotal = 0, totalDiscount = 0, totalGst = 0;
        quotationItems.forEach((item)=>{
            const qty = parseFloat(item.qty) || 0, rate = parseFloat(item.rate) || 0, discount = parseFloat(item.discount) || 0;
            // GST is always 18%
            const gstPercent = 18;
            const lineTotal = qty * rate, discAmt = lineTotal * discount / 100, afterDisc = lineTotal - discAmt, gstAmt = afterDisc * gstPercent / 100;
            subtotal += lineTotal;
            totalDiscount += discAmt;
            totalGst += gstAmt;
        });
        const afterDiscount = subtotal - totalDiscount, cgst = totalGst / 2, sgst = totalGst / 2, grandTotal = afterDiscount + totalGst;
        return {
            subtotal,
            totalDiscount,
            afterDiscount,
            totalGst,
            cgst,
            sgst,
            grandTotal
        };
    };
    // ─── CRUD Handlers ──────────────────────────────────────
    const handleSaveProduct = async ()=>{
        try {
            const url = editProduct ? `/api/products/${editProduct.id}` : '/api/products';
            const method = editProduct ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...productForm,
                    variants: productVariants
                })
            });
            const json = await res.json();
            if (json.status) {
                setProductDialog(false);
                setEditProduct(null);
                doFetchProducts();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(editProduct ? 'Product updated' : 'Product created');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Failed');
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to save product');
        }
    };
    const handleDeleteProduct = async (id)=>{
        if (!confirm('Delete this product?')) return;
        try {
            await fetch(`/api/products/${id}`, {
                method: 'DELETE'
            });
            doFetchProducts();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Product deleted');
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to delete product');
        }
    };
    const handleSaveCategory = async ()=>{
        try {
            const url = editCategory ? `/api/categories/${editCategory.id}` : '/api/categories';
            const method = editCategory ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryForm)
            });
            const json = await res.json();
            if (json.status) {
                setCategoryDialog(false);
                setEditCategory(null);
                doFetchCategories();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(editCategory ? 'Category updated' : 'Category created');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Failed');
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to save category');
        }
    };
    const handleDeleteCategory = async (id)=>{
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE'
            });
            const json = await res.json();
            if (json.status) {
                doFetchCategories();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Category deleted');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Cannot delete');
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed');
        }
        setDeleteCategoryDialog(false);
        setCategoryToDelete(null);
    };
    const handleUpdateOrderStatus = async (id, orderStatus)=>{
        try {
            await fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderStatus
                })
            });
            doFetchOrders();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Order status updated');
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed');
        }
    };
    const handleSaveLead = async ()=>{
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(leadForm)
            });
            const json = await res.json();
            if (json.status) {
                setLeadDialog(false);
                doFetchLeads();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Lead created');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Failed');
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed');
        }
    };
    const handleUpdateLeadStatus = async (id, status)=>{
        try {
            await fetch(`/api/leads/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status
                })
            });
            doFetchLeads();
            if (selectedLead) {
                fetch(`/api/leads/${id}`).then((r)=>r.json()).then((j)=>{
                    if (j.status) setSelectedLead(j.data);
                }).catch(console.error);
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Lead status updated');
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed');
        }
    };
    const handleSaveQuotation = async ()=>{
        try {
            const custName = quotationCustomerName || selectedLead?.name || '';
            if (!custName) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Customer name is required');
                return;
            }
            const hasValidItems = quotationItems.some((item)=>item.desc && item.rate);
            if (!hasValidItems) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Add at least one item');
                return;
            }
            const totals = computeQuotationTotals();
            const itemsWithAmount = quotationItems.map((item)=>{
                const qty = parseFloat(item.qty) || 0, rate = parseFloat(item.rate) || 0, discount = parseFloat(item.discount) || 0;
                const gstPercent = 18;
                const lineTotal = qty * rate, discAmt = lineTotal * discount / 100, afterDisc = lineTotal - discAmt, gstAmt = afterDisc * gstPercent / 100;
                return {
                    ...item,
                    gstPercent: '18',
                    amount: afterDisc + gstAmt
                };
            });
            const payload = {
                leadId: selectedLead?.id || (editQuotation?.leadId ?? null),
                customerName: custName,
                customerCompany: quotationCustomerCompany || selectedLead?.company || '',
                customerEmail: quotationCustomerEmail || selectedLead?.email || '',
                customerPhone: quotationCustomerPhone || selectedLead?.phone || '',
                customerAddress: quotationCustomerAddress || (selectedLead?.city ? `${selectedLead.city}, India` : ''),
                customerGst: quotationCustomerGst,
                amount: totals.grandTotal,
                subtotal: totals.subtotal,
                discountAmount: totals.totalDiscount,
                cgstAmount: totals.cgst,
                sgstAmount: totals.sgst,
                totalGst: totals.totalGst,
                items: JSON.stringify(itemsWithAmount),
                notes: quotationNotes,
                terms: JSON.stringify([
                    'Prices are exclusive of freight & insurance charges unless stated otherwise.',
                    'GST @18% applicable as per government norms.',
                    '50% advance payment with order, balance before dispatch.',
                    'Delivery subject to confirmation at the time of order.',
                    'Goods once sold will not be taken back.',
                    'Subject to Delhi jurisdiction.',
                    'This quotation is valid for 30 days from the date of issue.'
                ]),
                bankDetails: JSON.stringify({
                    bankName: 'HDFC Bank',
                    accountName: 'Urban Kitchen Manufacturing & Solutions',
                    accountNo: '50100XXXXX1234',
                    ifsc: 'HDFC0001234',
                    branch: 'Sector 12, Industrial Area, New Delhi'
                }),
                validUntil: quotationValidUntil || null,
                deliveryPeriod: quotationDeliveryPeriod,
                installation: quotationInstallation,
                warranty: quotationWarranty
            };
            let res;
            if (editQuotation) {
                res = await fetch(`/api/quotations/${editQuotation.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
            } else {
                res = await fetch('/api/quotations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
            }
            const json = await res.json();
            if (json.status) {
                setQuotationDialog(false);
                setEditQuotation(null);
                doFetchLeads();
                if (adminTab === 'quotations') fetch('/api/quotations?limit=50').then((r)=>r.json()).then((j)=>{
                    if (j.status) setQuotationList(j.data.quotations || j.data || []);
                }).catch(console.error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(editQuotation ? 'Quotation updated' : 'Quotation created');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Failed');
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed');
        }
    };
    const handleSaveEmployee = async ()=>{
        try {
            const res = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeForm)
            });
            const json = await res.json();
            if (json.status) {
                setEmployeeDialog(false);
                doFetchEmployees();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Employee created');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Failed');
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed');
        }
    };
    const handleSaveAmc = async ()=>{
        try {
            const res = await fetch('/api/amc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(amcForm)
            });
            const json = await res.json();
            if (json.status) {
                setAmcDialog(false);
                doFetchAmc();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('AMC contract created');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Failed');
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed');
        }
    };
    const handleSaveServiceRequest = async ()=>{
        try {
            const res = await fetch('/api/service-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceForm)
            });
            const json = await res.json();
            if (json.status) {
                setServiceDialog(false);
                doFetchAmc();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Service request created');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Failed');
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed');
        }
    };
    const handleUpdateServiceRequest = async (id, data)=>{
        try {
            await fetch('/api/service-requests', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requestId: id,
                    ...data
                })
            });
            doFetchAmc();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Service request updated');
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed');
        }
    };
    const handleLogout = ()=>{
        setUser(null);
        setView('home');
    };
    const handleSearch = (key, value)=>{
        setSearchQueries((prev)=>({
                ...prev,
                [key]: value
            }));
    };
    // ─── Blog CRUD ──────────────────────────────────────────
    const doFetchBlogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AdminDashboard.useCallback[doFetchBlogs]": ()=>{
            const params = new URLSearchParams();
            params.set('admin', 'true');
            params.set('limit', '50');
            if (blogStatusFilter !== 'all') params.set('status', blogStatusFilter);
            if (searchQueries.blog) params.set('search', searchQueries.blog);
            fetch(`/api/blog?${params}`).then({
                "AdminDashboard.useCallback[doFetchBlogs]": (r)=>r.json()
            }["AdminDashboard.useCallback[doFetchBlogs]"]).then({
                "AdminDashboard.useCallback[doFetchBlogs]": (j)=>{
                    if (j.status) setBlogs(j.data.posts || []);
                }
            }["AdminDashboard.useCallback[doFetchBlogs]"]).catch(console.error);
        }
    }["AdminDashboard.useCallback[doFetchBlogs]"], [
        blogStatusFilter,
        searchQueries.blog
    ]);
    const openNewBlog = ()=>{
        setEditBlog(null);
        setBlogForm(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emptyBlogForm"]);
        setBlogDialog(true);
    };
    const openEditBlog = (b)=>{
        setEditBlog(b);
        setBlogForm({
            title: b.title || '',
            slug: b.slug || '',
            excerpt: b.excerpt || '',
            content: b.content || '',
            featuredImage: b.featuredImage || '',
            category: b.category || '',
            categoryId: b.categoryId || b.categoryRef?.id || '',
            tags: b.tags || '',
            status: b.status || 'draft',
            featured: b.featured || false,
            seoTitle: b.seoTitle || '',
            seoDescription: b.seoDescription || ''
        });
        setBlogDialog(true);
    };
    const handleSaveBlog = async ()=>{
        try {
            const url = editBlog ? `/api/blog/${editBlog.id}` : '/api/blog';
            const method = editBlog ? 'PUT' : 'POST';
            const body = {
                ...blogForm,
                authorId: user?.id || null
            };
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const json = await res.json();
            if (json.status) {
                setBlogDialog(false);
                setEditBlog(null);
                doFetchBlogs();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(editBlog ? 'Blog post updated' : 'Blog post created');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(json.message || 'Failed');
            }
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to save blog post');
        }
    };
    const handleDeleteBlog = async (id)=>{
        if (!confirm('Delete this blog post?')) return;
        try {
            await fetch(`/api/blog/${id}`, {
                method: 'DELETE'
            });
            doFetchBlogs();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Blog post deleted');
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to delete blog post');
        }
    };
    // Blog tab fetch effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (adminTab === 'blog') doFetchBlogs();
        }
    }["AdminDashboard.useEffect"], [
        adminTab,
        doFetchBlogs
    ]);
    // ─── Open helpers ───────────────────────────────────────
    const openEditProduct = (p)=>{
        setEditProduct(p);
        setProductForm({
            name: p.name,
            categoryId: p.categoryId,
            description: p.description || '',
            shortDescription: p.shortDescription || '',
            longDescription: p.longDescription || '',
            price: String(p.price),
            stock: String(p.stock),
            status: p.status,
            steelGrade: p.steelGrade || '',
            capacity: p.capacity || '',
            dimensions: p.dimensions || '',
            moq: p.moq ? String(p.moq) : '',
            leadTime: p.leadTime || '',
            featuredImage: p.featuredImage || '',
            featured: p.featured || false
        });
        setProductVariants((p.variants || []).map((v)=>({
                id: v.id,
                name: v.name || '',
                sku: v.sku || '',
                price: String(v.price ?? ''),
                stock: String(v.stock ?? ''),
                weight: v.weight || '',
                dimensions: v.dimensions || '',
                isDefault: v.isDefault || false,
                sortOrder: v.sortOrder || 0
            })));
        setProductDialog(true);
    };
    const openNewProduct = ()=>{
        setEditProduct(null);
        setProductForm(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emptyProductForm"]);
        setProductVariants([]);
        setProductDialog(true);
    };
    const openEditCategory = (c)=>{
        setEditCategory(c);
        setCategoryForm({
            name: c.name,
            slug: c.slug || '',
            image: c.image || '',
            parentId: c.parentId || '',
            description: c.description || '',
            displayType: c.displayType || 'products',
            menuOrder: String(c.menuOrder ?? '0'),
            thumbnail: c.thumbnail || '',
            bannerImage: c.bannerImage || '',
            seoTitle: c.seoTitle || '',
            seoDescription: c.seoDescription || '',
            status: c.status || 'active'
        });
        setCategoryDialog(true);
    };
    const openNewCategory = ()=>{
        setEditCategory(null);
        setCategoryForm(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emptyCategoryForm"]);
        setCategoryDialog(true);
    };
    const openDeleteCategory = (c)=>{
        setCategoryToDelete(c);
        setDeleteCategoryDialog(true);
    };
    const openLeadDetail = (lead)=>{
        fetch(`/api/leads/${lead.id}`).then((r)=>r.json()).then((j)=>{
            if (j.status) {
                setSelectedLead(j.data);
                setLeadDetailDialog(true);
            }
        }).catch(console.error);
    };
    const openNewQuotation = ()=>{
        setSelectedLead(null);
        setEditQuotation(null);
        setQuotationCustomerName('');
        setQuotationCustomerCompany('');
        setQuotationCustomerEmail('');
        setQuotationCustomerPhone('');
        setQuotationCustomerAddress('');
        setQuotationCustomerGst('');
        setQuotationItems([
            {
                desc: '',
                hsn: '',
                qty: '1',
                unit: 'Nos',
                rate: '',
                discount: '0',
                gstPercent: '18'
            }
        ]);
        setQuotationValidUntil('');
        setQuotationNotes('');
        setQuotationDeliveryPeriod('2-3 weeks');
        setQuotationInstallation('Included');
        setQuotationWarranty('12 months against manufacturing defects');
        setQuotationDialog(true);
    };
    const openEditQuotation = async (q)=>{
        try {
            const res = await fetch(`/api/quotations/${q.id}`);
            const json = await res.json();
            if (!json.status) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to load quotation');
                return;
            }
            const data = json.data;
            setEditQuotation(data);
            setQuotationCustomerName(data.customerName || '');
            setQuotationCustomerCompany(data.customerCompany || '');
            setQuotationCustomerEmail(data.customerEmail || '');
            setQuotationCustomerPhone(data.customerPhone || '');
            setQuotationCustomerAddress(data.customerAddress || '');
            setQuotationCustomerGst(data.customerGst || '');
            const parsedItems = data.items ? typeof data.items === 'string' ? JSON.parse(data.items) : data.items : [];
            setQuotationItems(parsedItems.length > 0 ? parsedItems.map((it)=>({
                    desc: it.desc || '',
                    hsn: it.hsn || '',
                    qty: String(it.qty || '1'),
                    unit: it.unit || 'Nos',
                    rate: String(it.rate || ''),
                    discount: String(it.discount || '0'),
                    gstPercent: String(it.gstPercent || '18')
                })) : [
                {
                    desc: '',
                    hsn: '',
                    qty: '1',
                    unit: 'Nos',
                    rate: '',
                    discount: '0',
                    gstPercent: '18'
                }
            ]);
            setQuotationValidUntil(data.validUntil ? data.validUntil.split('T')[0] : '');
            setQuotationNotes(data.notes || '');
            setQuotationDeliveryPeriod(data.deliveryPeriod || '');
            setQuotationInstallation(data.installation || '');
            setQuotationWarranty(data.warranty || '');
            setQuotationDialog(true);
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to load quotation');
        }
    };
    const openOrderDetail = (order)=>{
        fetch(`/api/orders/${order.id}`).then((r)=>r.json()).then((j)=>{
            if (j.status) {
                setSelectedOrder(j.data);
                setOrderDialog(true);
            }
        }).catch(console.error);
    };
    const onOpenQuotationFromLead = ()=>{
        setQuotationCustomerName(selectedLead?.name || '');
        setQuotationCustomerCompany(selectedLead?.company || '');
        setQuotationCustomerEmail(selectedLead?.email || '');
        setQuotationCustomerPhone(selectedLead?.phone || '');
        setQuotationCustomerAddress(selectedLead?.city ? `${selectedLead.city}, India` : '');
        setQuotationCustomerGst('');
        setQuotationItems([
            {
                desc: '',
                hsn: '',
                qty: '1',
                unit: 'Nos',
                rate: '',
                discount: '0',
                gstPercent: '18'
            }
        ]);
        setQuotationValidUntil('');
        setQuotationNotes('');
        setQuotationDeliveryPeriod('2-3 weeks');
        setQuotationInstallation('Included');
        setQuotationWarranty('12 months against manufacturing defects');
        setQuotationDialog(true);
    };
    // ─── Lead detail refresh hook ──────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            ;
            window.__refreshLeadDetail = ({
                "AdminDashboard.useEffect": (data)=>{
                    setSelectedLead(data);
                    doFetchLeads();
                }
            })["AdminDashboard.useEffect"];
            return ({
                "AdminDashboard.useEffect": ()=>{
                    delete window.__refreshLeadDetail;
                }
            })["AdminDashboard.useEffect"];
        }
    }["AdminDashboard.useEffect"], [
        doFetchLeads
    ]);
    // ─── Role-filtered sidebar groups ──────────────────────────
    const filteredCrmGroup = filterGroupByRole(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CRM_GROUP"], roleName);
    const filteredHrmGroup = filterGroupByRole(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HRM_GROUP"], roleName);
    // ─── Sidebar state ──────────────────────────────────────
    const isCrmTab = filteredCrmGroup.sections.flatMap((s)=>s.items).some((i)=>i.key === adminTab);
    const isHrmTab = filteredHrmGroup.sections.flatMap((s)=>s.items).some((i)=>i.key === adminTab);
    const effectiveCrmExpanded = isCrmTab ? true : crmExpanded;
    const effectiveHrmExpanded = isHrmTab ? true : hrmExpanded;
    // ─── Tab Router ─────────────────────────────────────────
    const renderTabContent = ()=>{
        switch(adminTab){
            case 'dashboard':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$DashboardTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    dashboardData: dashboardData,
                    openOrderDetail: openOrderDetail,
                    openLeadDetail: openLeadDetail
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 364,
                    columnNumber: 30
                }, this);
            case 'products':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$ProductsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    products: products,
                    categories: categories,
                    searchQueries: searchQueries,
                    productCategoryFilter: productCategoryFilter,
                    setProductCategoryFilter: setProductCategoryFilter,
                    handleSearch: handleSearch,
                    openNewProduct: openNewProduct,
                    openEditProduct: openEditProduct,
                    handleDeleteProduct: handleDeleteProduct
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 365,
                    columnNumber: 29
                }, this);
            case 'categories':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$CategoriesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    categories: categories,
                    openNewCategory: openNewCategory,
                    openEditCategory: openEditCategory,
                    openDeleteCategory: openDeleteCategory
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 366,
                    columnNumber: 31
                }, this);
            case 'orders':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$OrdersTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    orders: orders,
                    orderStatusFilter: orderStatusFilter,
                    setOrderStatusFilter: setOrderStatusFilter,
                    searchQueries: searchQueries,
                    handleSearch: handleSearch,
                    openOrderDetail: openOrderDetail,
                    handleUpdateOrderStatus: handleUpdateOrderStatus
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 367,
                    columnNumber: 27
                }, this);
            case 'leads':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$LeadsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    leads: leads,
                    employees: employees,
                    setLeadForm: setLeadForm,
                    setLeadDialog: setLeadDialog,
                    openLeadDetail: openLeadDetail,
                    handleUpdateLeadStatus: handleUpdateLeadStatus,
                    onLeadReassigned: doFetchLeads
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 368,
                    columnNumber: 26
                }, this);
            case 'quotations':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$QuotationsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    quotationList: quotationList,
                    openNewQuotation: openNewQuotation,
                    openEditQuotation: openEditQuotation,
                    selectedQuotation: selectedQuotation,
                    setSelectedQuotation: setSelectedQuotation,
                    quotationDetailDialog: quotationDetailDialog,
                    setQuotationDetailDialog: setQuotationDetailDialog,
                    sendingQuotation: sendingQuotation
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 369,
                    columnNumber: 31
                }, this);
            case 'customers':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$CustomersTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    userList: userList,
                    roleList: roleList,
                    userDialog: userDialog,
                    setUserDialog: setUserDialog,
                    editUser: editUser,
                    setEditUser: setEditUser,
                    userForm: userForm,
                    setUserForm: setUserForm,
                    roleFilter: roleFilter,
                    setRoleFilter: setRoleFilter,
                    doFetchUsers: doFetchUsers
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 370,
                    columnNumber: 30
                }, this);
            case 'users':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$UsersTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    userList: userList,
                    roleList: roleList,
                    userDialog: userDialog,
                    setUserDialog: setUserDialog,
                    editUser: editUser,
                    setEditUser: setEditUser,
                    userForm: userForm,
                    setUserForm: setUserForm,
                    roleFilter: roleFilter,
                    setRoleFilter: setRoleFilter,
                    doFetchUsers: doFetchUsers
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 371,
                    columnNumber: 26
                }, this);
            case 'employees':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$EmployeesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    employees: employees,
                    empEditDialog: empEditDialog,
                    setEmpEditDialog: setEmpEditDialog,
                    editEmp: editEmp,
                    setEditEmp: setEditEmp,
                    empEditForm: empEditForm,
                    setEmpEditForm: setEmpEditForm,
                    employeeDialog: employeeDialog,
                    setEmployeeDialog: setEmployeeDialog,
                    employeeForm: employeeForm,
                    setEmployeeForm: setEmployeeForm,
                    doFetchEmployees: doFetchEmployees
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 372,
                    columnNumber: 30
                }, this);
            case 'attendance':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AttendanceTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    attendanceRecords: attendanceRecords
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 373,
                    columnNumber: 31
                }, this);
            case 'employee-live-location':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$EmployeeLiveLocationTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 374,
                    columnNumber: 43
                }, this);
            case 'leaves':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$LeavesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    leaveList: leaveList,
                    leaveFilter: leaveFilter,
                    setLeaveFilter: setLeaveFilter
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 375,
                    columnNumber: 27
                }, this);
            case 'amc':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$AmcTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    amcContracts: amcContracts,
                    setAmcForm: setAmcForm,
                    setAmcDialog: setAmcDialog
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 376,
                    columnNumber: 24
                }, this);
            case 'service':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$ServiceTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    serviceRequests: serviceRequests,
                    setServiceForm: setServiceForm,
                    setServiceDialog: setServiceDialog,
                    handleUpdateServiceRequest: handleUpdateServiceRequest
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 377,
                    columnNumber: 28
                }, this);
            case 'blog':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$BlogTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    blogs: blogs,
                    searchQuery: searchQueries.blog || '',
                    onSearchChange: (q)=>handleSearch('blog', q),
                    statusFilter: blogStatusFilter,
                    onStatusFilterChange: setBlogStatusFilter,
                    openNew: openNewBlog,
                    openEdit: openEditBlog,
                    handleDelete: handleDeleteBlog,
                    blogDialog: blogDialog,
                    setBlogDialog: setBlogDialog,
                    blogForm: blogForm,
                    setBlogForm: setBlogForm,
                    handleSaveBlog: handleSaveBlog,
                    editBlog: editBlog,
                    handleImageUpload: handleImageUpload
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 378,
                    columnNumber: 25
                }, this);
            case 'inquiries':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$InquiriesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    inquiryList: inquiryList,
                    setInquiryList: setInquiryList
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 379,
                    columnNumber: 30
                }, this);
            case 'settings':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$SettingsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    settingsObj: settingsObj,
                    setSettingsObj: setSettingsObj,
                    settingsLoading: settingsLoading
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 380,
                    columnNumber: 29
                }, this);
            case 'activity':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$ActivityTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    activityList: activityList
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 381,
                    columnNumber: 29
                }, this);
            default:
                {
                    if (adminTab.startsWith('crm-')) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$CrmModules$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            adminTab: adminTab,
                            leads: leads,
                            employees: employees
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 385,
                            columnNumber: 16
                        }, this);
                    }
                    if (adminTab.startsWith('hrm-')) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$HrmModulesNew$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            adminTab: adminTab,
                            employees: employees
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 389,
                            columnNumber: 16
                        }, this);
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$DashboardTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        dashboardData: dashboardData,
                        openOrderDetail: openOrderDetail,
                        openLeadDetail: openLeadDetail
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 392,
                        columnNumber: 14
                    }, this);
                }
        }
    };
    // ─── Notification handlers (must be before any conditional return) ──
    const notifRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleMarkRead = async (id)=>{
        try {
            await fetch('/api/notifications', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            doFetchNotifications();
        } catch (e) {
            console.error(e);
        }
    };
    const handleMarkAllRead = async ()=>{
        try {
            const userId = user?.id || '';
            await fetch('/api/notifications', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    markAllRead: true,
                    userId
                })
            });
            doFetchNotifications();
        } catch (e) {
            console.error(e);
        }
    };
    const handleNotifClick = (notif)=>{
        if (!notif.read) handleMarkRead(notif.id);
        if (notif.link) {
            setAdminTab(notif.link);
            setNotifOpen(false);
        }
    };
    // Click outside to close notification panel
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            const handleClickOutside = {
                "AdminDashboard.useEffect.handleClickOutside": (e)=>{
                    if (notifRef.current && !notifRef.current.contains(e.target)) {
                        setNotifOpen(false);
                    }
                }
            }["AdminDashboard.useEffect.handleClickOutside"];
            if (notifOpen) document.addEventListener('mousedown', handleClickOutside);
            return ({
                "AdminDashboard.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["AdminDashboard.useEffect"];
        }
    }["AdminDashboard.useEffect"], [
        notifOpen
    ]);
    const notifTypeIcon = (type)=>{
        switch(type){
            case 'order':
                return '🛒';
            case 'lead':
                return '👤';
            case 'quotation':
                return '📄';
            case 'employee':
                return '👔';
            case 'system':
                return '⚙️';
            case 'alert':
                return '⚠️';
            default:
                return '🔔';
        }
    };
    const notifTypeColor = (type)=>{
        switch(type){
            case 'order':
                return 'bg-blue-500/20 text-blue-400';
            case 'lead':
                return 'bg-purple-500/20 text-purple-400';
            case 'quotation':
                return 'bg-cyan-500/20 text-cyan-400';
            case 'employee':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'system':
                return 'bg-gray-500/20 text-gray-400';
            case 'alert':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-[#59ff00]/20 text-[#59ff00]';
        }
    };
    // ─── Employee redirect ────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (roleName === 'employee') {
                setView('employee-portal');
            }
        }
    }["AdminDashboard.useEffect"], [
        roleName,
        setView
    ]);
    if (roleName === 'employee') {
        return null;
    }
    // ─── Sidebar Nav Items Renderer ─────────────────────────
    const visibleMainNavItems = filterItemsByRole(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAIN_NAV_ITEMS"], roleName);
    const renderNavItems = (isMobile)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["filterSidebarItems"])(visibleMainNavItems, sidebarSearch).map(({ key, label, icon: Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>{
                        setAdminTab(key);
                        setMobileOpen(false);
                    },
                    className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${adminTab === key ? 'bg-[#59ff00]/10 text-[#59ff00] border border-[#59ff00]/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`,
                    title: sidebarCollapsed && !isMobile ? label : undefined,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "w-5 h-5 flex-shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 473,
                            columnNumber: 11
                        }, this),
                        (!sidebarCollapsed || isMobile) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 474,
                            columnNumber: 47
                        }, this)
                    ]
                }, key, true, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 470,
                    columnNumber: 9
                }, this))
        }, void 0, false);
    const renderGroupDropdown = (group, isExpanded, setExpanded, isActive, isMobile)=>{
        const filtered = {
            ...group,
            sections: group.sections.map((s)=>({
                    ...s,
                    items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$types$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["filterSidebarItems"])(s.items, sidebarSearch)
                })).filter((s)=>s.items.length > 0)
        };
        if (sidebarSearch && filtered.sections.flatMap((s)=>s.items).length === 0) return null;
        const GroupIcon = group.icon;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setExpanded(!isExpanded),
                    className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${isActive ? 'text-[#59ff00]' : 'text-gray-400 hover:text-white'} hover:bg-white/5`,
                    title: sidebarCollapsed && !isMobile ? group.label : undefined,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GroupIcon, {
                            className: "w-5 h-5 flex-shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 487,
                            columnNumber: 11
                        }, this),
                        (!sidebarCollapsed || isMobile) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex-1 text-left",
                                    children: group.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 488,
                                    columnNumber: 50
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    animate: {
                                        rotate: isExpanded ? 180 : 0
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 488,
                                        columnNumber: 191
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 488,
                                    columnNumber: 105
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 486,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: isExpanded && (!sidebarCollapsed || isMobile) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            height: 0,
                            opacity: 0
                        },
                        animate: {
                            height: 'auto',
                            opacity: 1
                        },
                        exit: {
                            height: 0,
                            opacity: 0
                        },
                        transition: {
                            duration: 0.25,
                            ease: 'easeInOut'
                        },
                        className: "overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ml-3 pl-3 border-l border-[#2a2a2a] space-y-0.5 py-1",
                            children: filtered.sections.map((section, si)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        section.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 text-[10px] font-bold tracking-widest px-3 py-1.5 mt-1",
                                            children: section.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 496,
                                            columnNumber: 39
                                        }, this),
                                        section.items.map(({ key, label, icon: ItemIcon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setAdminTab(key);
                                                    setMobileOpen(false);
                                                },
                                                className: `w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-all duration-200 text-xs font-medium ${adminTab === key ? 'bg-[#59ff00]/10 text-[#59ff00]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItemIcon, {
                                                        className: "w-4 h-4 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 71
                                                    }, this)
                                                ]
                                            }, key, true, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 498,
                                                columnNumber: 23
                                            }, this))
                                    ]
                                }, si, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 495,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 493,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 492,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 490,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AdminDashboard.tsx",
            lineNumber: 485,
            columnNumber: 7
        }, this);
    };
    // ═══════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-[#0b0b0b] overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `hidden lg:flex flex-col bg-[#101010] border-r border-[#2a2a2a] transition-all duration-300 relative ${sidebarCollapsed ? 'w-16' : 'w-64'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 flex items-center gap-3 border-b border-[#2a2a2a]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.jpg",
                                        alt: "Urban Kitchen",
                                        width: 36,
                                        height: 36,
                                        className: "w-9 h-9 rounded-lg object-contain flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 522,
                                        columnNumber: 13
                                    }, this),
                                    !sidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-white font-bold text-sm leading-tight",
                                                children: "Urban Kitchen"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 523,
                                                columnNumber: 69
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[#59ff00] text-[10px] font-medium tracking-wider uppercase",
                                                children: "Admin Panel"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 523,
                                                columnNumber: 146
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 523,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 521,
                                columnNumber: 11
                            }, this),
                            !sidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 525,
                                            columnNumber: 87
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            placeholder: "Search menu...",
                                            value: sidebarSearch,
                                            onChange: (e)=>setSidebarSearch(e.target.value),
                                            className: "pl-8 bg-[#0b0b0b] border-[#2a2a2a] text-white placeholder:text-gray-600 h-8 text-xs rounded-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 525,
                                            columnNumber: 178
                                        }, this),
                                        sidebarSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSidebarSearch(''),
                                            className: "absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 525,
                                                columnNumber: 545
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 525,
                                            columnNumber: 415
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 525,
                                    columnNumber: 61
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 525,
                                columnNumber: 34
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex-1 py-1 px-2 space-y-0.5 overflow-y-auto custom-scrollbar",
                                children: [
                                    renderNavItems(false),
                                    renderGroupDropdown(filteredCrmGroup, effectiveCrmExpanded, setCrmExpanded, isCrmTab, false),
                                    renderGroupDropdown(filteredHrmGroup, effectiveHrmExpanded, setHrmExpanded, isHrmTab, false)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 border-t border-[#2a2a2a]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogout,
                                    className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm",
                                    title: sidebarCollapsed ? 'Logout' : undefined,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                            className: "w-5 h-5 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 531,
                                            columnNumber: 292
                                        }, this),
                                        !sidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Logout"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 531,
                                            columnNumber: 358
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 531,
                                    columnNumber: 58
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 520,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSidebarCollapsed(!sidebarCollapsed),
                        className: "absolute top-5 z-10 w-6 h-6 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-[#59ff00] transition-colors",
                        style: {
                            right: '-12px'
                        },
                        children: sidebarCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            className: "w-3 h-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 533,
                            columnNumber: 295
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            className: "w-3 h-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 533,
                            columnNumber: 334
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 533,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 519,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                open: mobileOpen,
                onOpenChange: setMobileOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                    side: "left",
                    className: "bg-[#101010] border-[#2a2a2a] w-72 p-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                            className: "sr-only",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                children: "Navigation"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 539,
                                columnNumber: 44
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 539,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col h-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 flex items-center gap-3 border-b border-[#2a2a2a]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/logo.jpg",
                                            alt: "Urban Kitchen",
                                            width: 36,
                                            height: 36,
                                            className: "w-9 h-9 rounded-lg object-contain flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 541,
                                            columnNumber: 84
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-white font-bold text-sm leading-tight",
                                                    children: "Urban Kitchen"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 245
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[#59ff00] text-[10px] font-medium tracking-wider uppercase",
                                                    children: "Admin Panel"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 322
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 541,
                                            columnNumber: 212
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 541,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3 py-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 542,
                                                columnNumber: 66
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                placeholder: "Search menu...",
                                                value: sidebarSearch,
                                                onChange: (e)=>setSidebarSearch(e.target.value),
                                                className: "pl-8 bg-[#0b0b0b] border-[#2a2a2a] text-white placeholder:text-gray-600 h-8 text-xs rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 542,
                                                columnNumber: 157
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 542,
                                        columnNumber: 40
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 542,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "flex-1 py-1 px-2 space-y-0.5 overflow-y-auto custom-scrollbar",
                                    children: [
                                        renderNavItems(true),
                                        renderGroupDropdown(filteredCrmGroup, effectiveCrmExpanded, setCrmExpanded, isCrmTab, true),
                                        renderGroupDropdown(filteredHrmGroup, effectiveHrmExpanded, setHrmExpanded, isHrmTab, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 543,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 border-t border-[#2a2a2a]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleLogout,
                                        className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                className: "w-5 h-5 flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 548,
                                                columnNumber: 246
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Logout"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 548,
                                                columnNumber: 290
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 548,
                                        columnNumber: 60
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 548,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 540,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 538,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 537,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "flex items-center justify-between px-4 lg:px-6 py-3 border-b border-[#2a2a2a] bg-[#0b0b0b]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        className: "lg:hidden text-gray-400 hover:text-white",
                                        onClick: ()=>setMobileOpen(true),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 557,
                                            columnNumber: 136
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 557,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-white font-semibold text-lg capitalize",
                                                children: adminTab.replace(/_/g, ' ').replace(/crm-|hrm-/g, '')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 558,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-xs",
                                                children: "Urban Kitchen Admin Panel"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 558,
                                                columnNumber: 138
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 558,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 556,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:flex items-center gap-2 bg-[#181818] border border-[#2a2a2a] rounded-lg px-3 py-1.5 w-64",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "w-4 h-4 text-gray-500 flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 562,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search anything...",
                                                value: headerSearch,
                                                onChange: (e)=>setHeaderSearch(e.target.value),
                                                className: "bg-transparent text-white text-sm placeholder:text-gray-500 outline-none w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 562,
                                                columnNumber: 73
                                            }, this),
                                            headerSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setHeaderSearch(''),
                                                className: "text-gray-500 hover:text-white",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 562,
                                                    columnNumber: 394
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 562,
                                                columnNumber: 307
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 561,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:flex items-center gap-2 bg-[#181818] border border-[#2a2a2a] rounded-lg px-3 py-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 rounded-full bg-[#59ff00] animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 564,
                                                columnNumber: 124
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-400 text-xs",
                                                children: "Online"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 564,
                                                columnNumber: 191
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 564,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        ref: notifRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setNotifOpen(!notifOpen),
                                                className: "relative w-9 h-9 rounded-lg bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#59ff00]/30 transition-all",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 17
                                                    }, this),
                                                    unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center px-1",
                                                        children: unreadCount > 99 ? '99+' : unreadCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 566,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: notifOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: -8,
                                                        scale: 0.95
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        y: -8,
                                                        scale: 0.95
                                                    },
                                                    transition: {
                                                        duration: 0.15
                                                    },
                                                    className: "absolute right-0 top-12 w-96 max-h-[480px] bg-[#181818] border border-[#2a2a2a] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "text-white text-sm font-semibold",
                                                                            children: "Notifications"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                            lineNumber: 581,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-medium",
                                                                            children: [
                                                                                unreadCount,
                                                                                " new"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                            lineNumber: 582,
                                                                            columnNumber: 45
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 580,
                                                                    columnNumber: 23
                                                                }, this),
                                                                unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleMarkAllRead,
                                                                    className: "text-[#59ff00] text-[11px] font-medium hover:underline",
                                                                    children: "Mark all read"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 585,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 579,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "overflow-y-auto max-h-[380px] custom-scrollbar",
                                                            children: notifications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-center justify-center py-12",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                                        className: "w-10 h-10 text-gray-600 mb-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                        lineNumber: 591,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-500 text-sm",
                                                                        children: "No notifications yet"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                        lineNumber: 592,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-600 text-xs mt-1",
                                                                        children: "You're all caught up!"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                        lineNumber: 593,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                lineNumber: 590,
                                                                columnNumber: 25
                                                            }, this) : notifications.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    onClick: ()=>handleNotifClick(n),
                                                                    className: `flex items-start gap-3 px-4 py-3 border-b border-[#2a2a2a] last:border-0 cursor-pointer transition-colors ${n.read ? 'hover:bg-white/[0.02]' : 'bg-[#59ff00]/[0.03] hover:bg-[#59ff00]/[0.06]'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${notifTypeColor(n.type)}`,
                                                                            children: notifTypeIcon(n.type)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                            lineNumber: 602,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 min-w-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start justify-between gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: `text-sm font-medium leading-tight ${n.read ? 'text-gray-400' : 'text-white'}`,
                                                                                            children: n.title
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                            lineNumber: 607,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        !n.read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "w-2 h-2 rounded-full bg-[#59ff00] flex-shrink-0 mt-1.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                            lineNumber: 608,
                                                                                            columnNumber: 45
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                    lineNumber: 606,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-gray-500 text-xs mt-0.5 line-clamp-2",
                                                                                    children: n.message
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                    lineNumber: 610,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-gray-600 text-[10px] mt-1",
                                                                                    children: new Date(n.createdAt).toLocaleString('en-IN', {
                                                                                        day: '2-digit',
                                                                                        month: 'short',
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit'
                                                                                    })
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                    lineNumber: 611,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                            lineNumber: 605,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, n.id, true, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 597,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 588,
                                                            columnNumber: 21
                                                        }, this),
                                                        notifications.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "px-4 py-2.5 border-t border-[#2a2a2a] bg-[#101010]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    setNotifOpen(false);
                                                                },
                                                                className: "w-full text-center text-gray-400 text-xs hover:text-[#59ff00] transition-colors",
                                                                children: "Close"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 620,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 570,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 565,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 pl-2 border-l border-[#2a2a2a]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 rounded-full bg-[#59ff00]/20 border border-[#59ff00]/30 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#59ff00] text-xs font-bold",
                                                    children: "A"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 199
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 630,
                                                columnNumber: 85
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hidden xl:block",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white text-xs font-medium",
                                                        children: "Admin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 630,
                                                        columnNumber: 297
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-500 text-[10px]",
                                                        children: "Super Admin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 630,
                                                        columnNumber: 352
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 630,
                                                columnNumber: 264
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 630,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 560,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 555,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: renderTabContent()
                            }, adminTab, false, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 634,
                                columnNumber: 40
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 634,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 633,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 554,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2f$Dialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                productDialog: productDialog,
                setProductDialog: setProductDialog,
                editProduct: editProduct,
                productForm: productForm,
                setProductForm: setProductForm,
                productVariants: productVariants,
                setProductVariants: setProductVariants,
                categories: categories,
                uploading: uploading,
                handleImageUpload: handleImageUpload,
                handleSaveProduct: handleSaveProduct,
                fileInputRef: fileInputRef,
                categoryDialog: categoryDialog,
                setCategoryDialog: setCategoryDialog,
                editCategory: editCategory,
                categoryForm: categoryForm,
                setCategoryForm: setCategoryForm,
                handleSaveCategory: handleSaveCategory,
                deleteCategoryDialog: deleteCategoryDialog,
                setDeleteCategoryDialog: setDeleteCategoryDialog,
                categoryToDelete: categoryToDelete,
                setCategoryToDelete: setCategoryToDelete,
                handleDeleteCategory: handleDeleteCategory,
                orderDialog: orderDialog,
                setOrderDialog: setOrderDialog,
                selectedOrder: selectedOrder,
                leadDialog: leadDialog,
                setLeadDialog: setLeadDialog,
                leadForm: leadForm,
                setLeadForm: setLeadForm,
                employees: employees,
                handleSaveLead: handleSaveLead,
                leadDetailDialog: leadDetailDialog,
                setLeadDetailDialog: setLeadDetailDialog,
                selectedLead: selectedLead,
                handleUpdateLeadStatus: handleUpdateLeadStatus,
                onOpenQuotationFromLead: onOpenQuotationFromLead,
                quotationDialog: quotationDialog,
                setQuotationDialog: setQuotationDialog,
                editQuotation: editQuotation,
                quotationTemplate: quotationTemplate,
                setQuotationTemplate: setQuotationTemplate,
                companyCustomization: companyCustomization,
                setCompanyCustomization: setCompanyCustomization,
                quotationCustomerName: quotationCustomerName,
                setQuotationCustomerName: setQuotationCustomerName,
                quotationCustomerCompany: quotationCustomerCompany,
                setQuotationCustomerCompany: setQuotationCustomerCompany,
                quotationCustomerEmail: quotationCustomerEmail,
                setQuotationCustomerEmail: setQuotationCustomerEmail,
                quotationCustomerPhone: quotationCustomerPhone,
                setQuotationCustomerPhone: setQuotationCustomerPhone,
                quotationCustomerAddress: quotationCustomerAddress,
                setQuotationCustomerAddress: setQuotationCustomerAddress,
                quotationCustomerGst: quotationCustomerGst,
                setQuotationCustomerGst: setQuotationCustomerGst,
                quotationItems: quotationItems,
                setQuotationItems: setQuotationItems,
                quotationValidUntil: quotationValidUntil,
                setQuotationValidUntil: setQuotationValidUntil,
                quotationNotes: quotationNotes,
                setQuotationNotes: setQuotationNotes,
                quotationDeliveryPeriod: quotationDeliveryPeriod,
                setQuotationDeliveryPeriod: setQuotationDeliveryPeriod,
                quotationInstallation: quotationInstallation,
                setQuotationInstallation: setQuotationInstallation,
                quotationWarranty: quotationWarranty,
                setQuotationWarranty: setQuotationWarranty,
                computeQuotationTotals: computeQuotationTotals,
                handleSaveQuotation: handleSaveQuotation,
                employeeDialog: employeeDialog,
                setEmployeeDialog: setEmployeeDialog,
                employeeForm: employeeForm,
                setEmployeeForm: setEmployeeForm,
                handleSaveEmployee: handleSaveEmployee,
                amcDialog: amcDialog,
                setAmcDialog: setAmcDialog,
                amcForm: amcForm,
                setAmcForm: setAmcForm,
                handleSaveAmc: handleSaveAmc,
                serviceDialog: serviceDialog,
                setServiceDialog: setServiceDialog,
                serviceForm: serviceForm,
                setServiceForm: setServiceForm,
                handleSaveServiceRequest: handleSaveServiceRequest
            }, void 0, false, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 639,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AdminDashboard.tsx",
        lineNumber: 517,
        columnNumber: 5
    }, this);
}
_s(AdminDashboard, "1Zo2VjzPLC3+uUTGAmg94MukNtU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"]
    ];
});
_c = AdminDashboard;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_AdminDashboard_tsx_0hk7hpx._.js.map