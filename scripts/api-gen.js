const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const swagger2openapi = require("swagger2openapi");
require("dotenv").config();

// 確保目錄存在
const GENERATED_DIR = path.join(__dirname, "../generated");
const TYPES_DIR = path.join(GENERATED_DIR, "types");
if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
}
if (!fs.existsSync(TYPES_DIR)) {
    fs.mkdirSync(TYPES_DIR, { recursive: true });
}

// 檢查環境變數
if (!process.env.NEXT_PUBLIC_CLIENT_API_URL) {
    console.error("❌ 錯誤：未設置 NEXT_PUBLIC_CLIENT_API_URL 環境變數");
    console.error("請在 .env 檔案中設置 NEXT_PUBLIC_CLIENT_API_URL");
    console.error("範例：NEXT_PUBLIC_CLIENT_API_URL=http://127.0.0.1:8000");
    process.exit(1);
}

// 移除末尾的斜線
const baseUrl = process.env.NEXT_PUBLIC_CLIENT_API_URL.replace(/\/$/, "");
// API 文檔 URL
const API_URL = `${baseUrl}/api-redocs/?format=openapi`;

// 轉換 Swagger 2.x 到 OpenAPI 3.x
async function convertToOpenAPI3(inputPath) {
    try {
        console.log("🔄 正在將 Swagger 2.x 轉換為 OpenAPI 3.x...");
        const swagger2 = JSON.parse(fs.readFileSync(inputPath, "utf8"));
        const options = {
            patch: true,
            warnOnly: true,
        };

        const result = await swagger2openapi.convertObj(swagger2, options);
        const openapi3Path = path.join(GENERATED_DIR, "openapi3.json");

        // 只保留需要的資訊
        const simplifiedSchema = {
            openapi: result.openapi.openapi,
            paths: result.openapi.paths,
            components: {
                schemas: result.openapi.components?.schemas || {},
            },
        };

        fs.writeFileSync(
            openapi3Path,
            JSON.stringify(simplifiedSchema, null, 2)
        );
        console.log("✅ 轉換完成");
        return openapi3Path;
    } catch (error) {
        console.error("❌ 轉換到 OpenAPI 3.x 時發生錯誤:", error.message);
        throw error;
    }
}

// 清理臨時檔案
function cleanupTempFiles() {
    console.log("🧹 正在清理臨時檔案...");
    const filesToDelete = ["openapi.json", "openapi3.json"];

    filesToDelete.forEach((file) => {
        const filePath = path.join(GENERATED_DIR, file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
}

// 解析 Schema 引用
function resolveSchemaRef(schema, openapi3Json) {
    if (!schema) return null;

    if (schema.$ref) {
        const refPath = schema.$ref.split("/").slice(1); // 移除開頭的 #
        let resolved = openapi3Json;

        for (const segment of refPath) {
            if (!resolved || !resolved[segment]) {
                console.error(
                    `無法解析路徑段 "${segment}"，引用路徑 "${schema.$ref}"`
                );
                console.error(
                    "可用的鍵值：",
                    Object.keys(resolved || {}).join(", ")
                );
                process.exit(1);
            }
            resolved = resolved[segment];
        }
        return resolved;
    }
    return schema;
}

// 生成獨立的類型定義
function generateIndependentType(
    schema,
    openapi3Json,
    typeName,
    parentPath = ""
) {
    const types = new Map();

    function processSchema(schema, typeName) {
        const resolvedSchema = resolveSchemaRef(schema, openapi3Json);

        if (resolvedSchema.type === "object") {
            // 為物件的每個屬性生成獨立類型
            const properties = {};
            Object.entries(resolvedSchema.properties || {}).forEach(
                ([key, prop]) => {
                    if (prop.type === "object") {
                        const subTypeName = `${typeName}_${key}`;
                        const subType = processSchema(prop, subTypeName);
                        properties[key] = { type: subTypeName };
                        types.set(subTypeName, subType);
                    } else if (
                        prop.type === "array" &&
                        prop.items.type === "object"
                    ) {
                        const itemTypeName = `${typeName}_${key}_item`;
                        const itemType = processSchema(
                            prop.items,
                            itemTypeName
                        );
                        properties[key] = { type: `${itemTypeName}[]` };
                        types.set(itemTypeName, itemType);
                    } else {
                        properties[key] = prop;
                    }
                }
            );
            return {
                type: "object",
                properties,
                required: resolvedSchema.required,
            };
        }

        return resolvedSchema;
    }

    const mainType = processSchema(schema, typeName);
    types.set(typeName, mainType);

    return types;
}

// 修改生成類型定義的函數
function generateTypeDefinition(schema, openapi3Json, typeName = "") {
    if (!schema) return "any";

    const resolvedSchema = resolveSchemaRef(schema, openapi3Json);
    let typeDefinitions = [];

    if (resolvedSchema.type === "object") {
        // 處理物件內的屬性
        const properties = Object.entries(resolvedSchema.properties || {})
            .map(([key, prop]) => {
                const isRequired = (resolvedSchema.required || []).includes(
                    key
                );
                let propertyType;

                if (prop.type === "object") {
                    // 為巢狀物件創建獨立型別
                    const subTypeName = `${typeName}_${key}`;
                    const subType = generateTypeDefinition(
                        prop,
                        openapi3Json,
                        subTypeName
                    );
                    typeDefinitions.push(subType);
                    propertyType = subTypeName;
                } else if (prop.type === "array") {
                    // 處理陣列
                    if (prop.items.type === "object") {
                        // 陣列中的物件型別
                        const itemTypeName = `${typeName}_${key}_item`;
                        const itemType = generateTypeDefinition(
                            prop.items,
                            openapi3Json,
                            itemTypeName
                        );
                        typeDefinitions.push(itemType);
                        propertyType = `${itemTypeName}[]`;
                    } else {
                        propertyType = `${generateBasicType(prop.items)}[]`;
                    }
                } else {
                    propertyType = generateBasicType(prop);
                }

                return `    ${key}${isRequired ? "" : "?"}: ${propertyType}`;
            })
            .join(";\n");

        const mainType = `export type ${typeName} = {\n${properties}\n};\n`;
        typeDefinitions.push(mainType);

        return typeDefinitions.join("\n");
    }

    if (resolvedSchema.type === "array") {
        if (resolvedSchema.items.type === "object") {
            const itemTypeName = `${typeName}_item`;
            const itemTypeDefinition = generateTypeDefinition(
                resolvedSchema.items,
                openapi3Json,
                itemTypeName
            );
            return `${itemTypeDefinition}\n\nexport type ${typeName} = ${itemTypeName}[];\n`;
        }
        return `${generateBasicType(resolvedSchema.items)}[]`;
    }

    return generateBasicType(resolvedSchema);
}

// 生成基本類型
function generateBasicType(schema) {
    const typeMapping = {
        string: schema.format === "date-time" ? "string" : "string",
        number: "number",
        integer: "number",
        boolean: "boolean",
    };

    if (schema.enum) {
        return schema.enum
            .map((v) => (typeof v === "string" ? `'${v}'` : v))
            .join(" | ");
    }

    return typeMapping[schema.type] || "any";
}

// 生成類型定義
async function generateTypes() {
    try {
        // 檢查 API 伺服器是否可訪問
        console.log("🔍 正在檢查 API 伺服器是否可訪問...");
        try {
            execSync(`curl -s -f ${baseUrl}/api-redocs/`, { stdio: "pipe" });
            console.log("✅ API 伺服器可以訪問");
        } catch (error) {
            console.error("❌ 錯誤：無法連接到 API 伺服器");
            console.error(`請確保 API 伺服器正在運行於 ${baseUrl}`);
            console.error("詳細錯誤：", error.message);
            process.exit(1);
        }

        // 下載 OpenAPI 文檔
        console.log("📥 正在下載 OpenAPI 規範...");
        console.log(`API URL：${API_URL}`);

        const swagger2Path = path.join(GENERATED_DIR, "openapi.json");
        try {
            execSync(`curl -s -f ${API_URL} -o ${swagger2Path}`, {
                stdio: "pipe",
            });
        } catch (error) {
            console.error("❌ 下載 OpenAPI 規範時發生錯誤");
            console.error("請檢查 API 文檔端點是否正確");
            console.error("詳細錯誤：", error.message);
            process.exit(1);
        }

        // 驗證下載的檔案
        if (
            !fs.existsSync(swagger2Path) ||
            fs.statSync(swagger2Path).size === 0
        ) {
            console.error("❌ 錯誤：OpenAPI 規範檔案為空或未下載");
            process.exit(1);
        }

        // 檢查檔案內容是否為有效的 JSON
        let swagger2Json;
        try {
            const fileContent = fs.readFileSync(swagger2Path, "utf8");
            swagger2Json = JSON.parse(fileContent);
        } catch (error) {
            console.error("❌ 錯誤：下載的檔案不是有效的 JSON");
            console.error(
                "內容預覽：",
                fs.readFileSync(swagger2Path, "utf8").substring(0, 200)
            );
            process.exit(1);
        }

        // 直接使用 Swagger 2.0 的定義
        const definitions = swagger2Json.definitions;

        // 轉換到 OpenAPI 3.x
        const openapi3Path = await convertToOpenAPI3(swagger2Path);
        const openapi3Json = JSON.parse(fs.readFileSync(openapi3Path, "utf8"));

        // 生成 API 路徑映射
        console.log("🔨 正在生成 API 路徑映射...");
        try {
            // 收集所有路徑和操作 ID
            const pathMapping = {};
            Object.entries(openapi3Json.paths).forEach(([path, methods]) => {
                Object.entries(methods).forEach(([method, operation]) => {
                    if (operation.operationId) {
                        pathMapping[operation.operationId] = {
                            path,
                            method,
                            operation,
                        };
                    }
                });
            });

            // 生成獨立的類型定義檔案
            console.log("📝 正在生成類型定義檔案...");
            Object.entries(pathMapping).forEach(
                ([operationId, { operation }]) => {
                    // 生成響應類型文件
                    if (
                        operation.responses?.["200"]?.content?.[
                            "application/json"
                        ]?.schema
                    ) {
                        const responseSchema =
                            operation.responses["200"].content[
                                "application/json"
                            ].schema;
                        const typeName = `${capitalizeFirstLetter(
                            operationId
                        )}_response`;

                        const typeDefinition = generateTypeDefinition(
                            responseSchema,
                            openapi3Json,
                            typeName
                        );
                        const responseContent = `// 由 api-gen.js 生成
// 請勿手動編輯此檔案

${typeDefinition}`;
                        fs.writeFileSync(
                            path.join(TYPES_DIR, `${operationId}_response.ts`),
                            responseContent
                        );
                    }

                    // 生成請求類型文件
                    if (
                        operation.requestBody?.content?.["application/json"]
                            ?.schema
                    ) {
                        const requestSchema =
                            operation.requestBody.content["application/json"]
                                .schema;
                        const typeName = `${capitalizeFirstLetter(
                            operationId
                        )}_request`;

                        const typeDefinition = generateTypeDefinition(
                            requestSchema,
                            openapi3Json,
                            typeName
                        );
                        const requestContent = `// 由 api-gen.js 生成
// 請勿手動編輯此檔案

${typeDefinition}`;
                        fs.writeFileSync(
                            path.join(TYPES_DIR, `${operationId}_request.ts`),
                            requestContent
                        );
                    }
                }
            );

            // 生成 API 路徑檔案
            const apiContent = `// 由 api-gen.js 生成
// 請勿手動編輯此檔案

export const PATHS = {
${Object.entries(pathMapping)
    .map(
        ([operationId, { path }]) =>
            `    ${operationId.toUpperCase()}: \`/api${path}\` as const,`
    )
    .join("\n")}
} as const;

// API 方法
export const API_METHODS = {
${Object.entries(pathMapping)
    .map(
        ([operationId, { method }]) =>
            `    ${operationId.toUpperCase()}: "${method.toUpperCase()}",`
    )
    .join("\n")}    
} as const;
`;

            // 生成 types/index.ts
            const typesIndexContent = `// 由 api-gen.js 生成
// 請勿手動編輯此檔案

${Object.keys(pathMapping)
    .map((operationId) => {
        const hasResponse = fs.existsSync(
            path.join(TYPES_DIR, `${operationId}_response.ts`)
        );
        const hasRequest = fs.existsSync(
            path.join(TYPES_DIR, `${operationId}_request.ts`)
        );

        // 檢查是否為列表類型的響應
        const operation = pathMapping[operationId].operation;
        const responseSchema =
            operation.responses?.["200"]?.content?.["application/json"]?.schema;
        const isArrayResponse =
            responseSchema?.type === "array" &&
            responseSchema.items.type === "object";

        const exports = [];

        if (hasResponse) {
            if (isArrayResponse) {
                const singularName = operationId.replace(/_list.*$/, "");
                const capitalizedSingularName =
                    capitalizeFirstLetter(singularName);
                exports.push(
                    `export type { ${capitalizedSingularName}, ${capitalizeFirstLetter(
                        operationId
                    )}_response } from './${operationId}_response';`
                );
            } else {
                exports.push(
                    `export type { ${capitalizeFirstLetter(
                        operationId
                    )}_response } from './${operationId}_response';`
                );
            }
        }

        if (hasRequest) {
            exports.push(
                `export type { ${capitalizeFirstLetter(
                    operationId
                )}_request } from './${operationId}_request';`
            );
        }

        return exports.join("\n");
    })
    .filter(Boolean)
    .join("\n")}
`;

            // 寫入生成的類型定義
            fs.writeFileSync(path.join(GENERATED_DIR, "api.ts"), apiContent);
            fs.writeFileSync(
                path.join(TYPES_DIR, "index.ts"),
                typesIndexContent
            );
        } catch (error) {
            console.error("❌ 生成 TypeScript 類型時發生錯誤");
            console.error("詳細錯誤：", error.message);
            process.exit(1);
        }

        // 清理臨時檔案
        cleanupTempFiles();

        console.log("✅ API 類型生成成功！");
    } catch (error) {
        console.error("❌ 意外錯誤：", error.message);
        process.exit(1);
    }
}

// 輔助函數：首字母大寫
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 運行生成腳本
generateTypes();
