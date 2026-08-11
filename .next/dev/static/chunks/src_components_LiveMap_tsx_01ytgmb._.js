(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/LiveMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
"use client";
;
;
const LeafletEmployeeMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/admin/LeafletEmployeeMap.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/admin/LeafletEmployeeMap.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = LeafletEmployeeMap;
function LiveMap({ location = null, center, height = "420px", markers = [] }) {
    const locations = markers.length > 0 ? markers.map((marker, index)=>({
            id: marker.id || String(index),
            employeeId: marker.name || marker.employeeId || "EMP001",
            latitude: marker.location?.lat || marker.lat || center?.lat || 28.6139,
            longitude: marker.location?.lng || marker.lng || center?.lng || 77.209,
            accuracy: null,
            createdAt: new Date().toISOString()
        })) : location ? [
        {
            id: "current-location",
            employeeId: "Current Location",
            latitude: location.lat,
            longitude: location.lng,
            accuracy: null,
            createdAt: new Date().toISOString()
        }
    ] : center ? [
        {
            id: "center-location",
            employeeId: "Center Location",
            latitude: center.lat,
            longitude: center.lng,
            accuracy: null,
            createdAt: new Date().toISOString()
        }
    ] : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height,
            width: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeafletEmployeeMap, {
            locations: locations
        }, void 0, false, {
            fileName: "[project]/src/components/LiveMap.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/LiveMap.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_c1 = LiveMap;
var _c, _c1;
__turbopack_context__.k.register(_c, "LeafletEmployeeMap");
__turbopack_context__.k.register(_c1, "LiveMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LiveMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/LiveMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_LiveMap_tsx_01ytgmb._.js.map