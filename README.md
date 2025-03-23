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
relaq/
├── app/                    # Next.js 應用程序目錄
│   ├── api/               # API 路由
│   ├── article/           # 文章相關頁面
│   ├── list/             # 店家列表頁面
│   ├── shop/             # 店家詳情頁面
│   └── page.tsx          # 首頁
├── components/            # 全局共用組件
├── lib/                   # 工具函數和常量
│   ├── api/               # api
│   ├── constants/        # 常量定義
│   └── utils/           # 工具函數
├── public/               # 靜態資源
```

## 主要功能

-   美甲美髮店家搜尋和過濾
-   美甲美髮相關文章管理系統
-   響應式設計
<!-- -   多語言支持 -->
-   SEO 優化
