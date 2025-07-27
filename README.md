# Relaq - 美甲美髮預約平台

## 專案簡介

Relaq 現代化的美甲美髮預約平台

<!-- ## 技術棧 -->

<!--
-   **框架**: Next.js 14
-   **語言**: TypeScript
-   **樣式**: Tailwind CSS
-   **UI 組件**: shadcn/ui
-   **狀態管理**: jotai
-   **表單處理**: React Hook Form
-   **資料驗證**: Zod
-   **日期處理**: date-fns
-   **HTML 清理**: DOMPurify -->

## 系統需求

-   Node.js 18.0 或更高版本
-   yarn

## 安裝

1. clone

```bash
git clone https://github.com/ANJUNI-Sarah/relaq.git
cd relaq
```

2. 安裝依賴

```bash
yarn install
```

## 開發

啟動開發服務器：

```bash
yarn dev
```

訪問 http://0.0.0.0:3000 查看應用程序。

## 專案結構

```
app/
├── (pages)/           # 頁面群組
├── api/               # API 路由
│   ├── bff/           # BFF 層 API 路由
│   │   ├── shops.ts   # 與商店相關的 API
│   │   ├── users.ts   # 與用戶相關的 API
│   │   └── ...        # 其他 API 路由
│   └── ...            # 其他 API 路由
├── _components/       # 頁面專用組件
└── globals.css        # 全局樣式

bff/
├── routes/            # BFF API 路由邏輯
│   ├── shops.ts       # 與商店相關的邏輯
│   ├── users.ts       # 與用戶相關的邏輯
│   └── ...            # 其他路由邏輯
├── services/          # 業務邏輯層
│   ├── shop-service.ts
│   ├── user-service.ts
│   └── ...            # 其他服務
└── utils/             # BFF 專用工具函式
    ├── api-client.ts  # 封裝後端 API 請求
    └── ...            # 其他工具函式

components/
├── ui/                # 共用 UI 元件
│   ├── button.tsx
│   ├── input.tsx
│   └── modal.tsx
└── layout/            # 布局相關元件
    ├── header.tsx
    └── footer.tsx

hooks/
├── use-fetch.ts       # 共用的 Hooks
├── use-modal.ts
└── use-auth.ts

lib/
├── utils.ts           # 工具函式
├── constants/         # 常量定義
│   ├── api.ts
│   └── colors.ts
├── types/             # 型別定義
│   ├── user.ts
│   └── product.ts
└── schemas/           # 資料驗證
    ├── user.ts
    └── product.ts

public/
├── images/            # 靜態圖片資源
└── ...                # 其他靜態資源

styles/
├── globals.css        # 全局樣式
└── ...                # 其他樣式檔案
```

## 主要功能

-   美甲美髮店家搜尋和過濾
-   美甲美髮相關文章管理系統
-   響應式設計
<!-- -   多語言支持 -->
-   SEO 優化
