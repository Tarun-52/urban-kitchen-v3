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
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[project]/src/app/api/upload/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/https [external] (https, cjs)");
;
;
const runtime = 'nodejs';
async function POST(request) {
    try {
        const cloudName = ("TURBOPACK compile-time value", "kixnmz25") || 'kixnmz25';
        const uploadPreset = ("TURBOPACK compile-time value", "urban_kitchen_preset") || 'urban_kitchen_preset';
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: false,
                message: 'No file'
            }, {
                status: 400
            });
        }
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);
        const fileName = file.name || 'image.png';
        const mimeType = file.type || 'image/png';
        const boundary = '----CloudinaryBoundary' + Date.now();
        const endLine = '\r\n';
        const parts = [];
        // File part
        const fileHeader = '--' + boundary + endLine + 'Content-Disposition: form-data; name="file"; filename="' + fileName + '"' + endLine + 'Content-Type: ' + mimeType + endLine + endLine;
        parts.push(Buffer.from(fileHeader));
        parts.push(fileBuffer);
        parts.push(Buffer.from(endLine));
        // Upload preset part
        const presetHeader = '--' + boundary + endLine + 'Content-Disposition: form-data; name="upload_preset"' + endLine + endLine + uploadPreset + endLine;
        parts.push(Buffer.from(presetHeader));
        // Folder part
        const folderHeader = '--' + boundary + endLine + 'Content-Disposition: form-data; name="folder"' + endLine + endLine + 'products' + endLine;
        parts.push(Buffer.from(folderHeader));
        // Closing boundary
        parts.push(Buffer.from('--' + boundary + '--' + endLine));
        const body = Buffer.concat(parts);
        const options = {
            hostname: 'api.cloudinary.com',
            path: '/v1_1/' + cloudName + '/image/upload',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=' + boundary,
                'Content-Length': body.length.toString()
            }
        };
        return new Promise((resolve)=>{
            const req = __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__["default"].request(options, (res)=>{
                let data = '';
                res.on('data', (chunk)=>{
                    data += chunk;
                });
                res.on('end', ()=>{
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            const parsed = JSON.parse(data);
                            resolve(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                status: true,
                                message: 'Uploaded successfully',
                                data: {
                                    url: parsed.secure_url,
                                    name: fileName
                                }
                            }));
                        } catch  {
                            resolve(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                status: false,
                                message: 'Parse error'
                            }, {
                                status: 500
                            }));
                        }
                    } else {
                        resolve(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            status: false,
                            message: 'Cloudinary ' + res.statusCode + ': ' + data.substring(0, 300)
                        }, {
                            status: 500
                        }));
                    }
                });
            });
            req.on('error', (err)=>{
                resolve(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    status: false,
                    message: err.message
                }, {
                    status: 500
                }));
            });
            req.write(body);
            req.end();
        });
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: false,
            message: msg
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__12s~efo._.js.map