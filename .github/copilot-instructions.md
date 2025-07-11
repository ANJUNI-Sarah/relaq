# GitHub Copilot Instructions for Relaq

## 專案概述
Relaq 是一個現代化的美甲美髮預約平台，使用 Next.js 14、TypeScript 和 Tailwind CSS 構建。

## 技術棧與架構
- **框架**: Next.js 14 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS + shadcn/ui
- **狀態管理**: React Hooks + Context
- **表單**: React Hook Form + Zod
- **資料庫**: PostgreSQL
- **部署**: Docker

## 編碼規範與偏好

### TypeScript
- 使用嚴格的 TypeScript 配置
- 優先使用 interface 而非 type（除非需要聯合型別）
- 為所有組件 props 定義明確的型別
- 使用泛型來提高程式碼複用性

### React 組件
- 使用函數式組件和 Hooks
- 組件命名使用 PascalCase
- 檔案命名使用 kebab-case
- 優先使用 React.FC 型別註解
- 使用 forwardRef 處理 ref 傳遞

### 樣式與 UI
- 使用 Tailwind CSS 進行樣式設計
- 遵循 Mobile-First 響應式設計原則
- 使用 shadcn/ui 組件作為基礎
- 使用 clsx 或 cn 函數組合樣式類
- 色彩使用 CSS Variables 定義的主題色

### API 與資料處理
- API 路由遵循 RESTful 原則
- 使用 Zod 進行資料驗證
- 錯誤處理要完整且有意義
- 返回標準化的 JSON 格式

### 檔案結構偏好
```
app/
├── (pages)/           # 頁面群組
├── api/              # API 路由
├── components/       # 頁面專用組件
└── globals.css       # 全局樣式

components/
├── ui/              # shadcn/ui 基礎組件
└── *.tsx           # 業務組件

lib/
├── utils.ts        # 工具函數
├── constants/      # 常量定義
└── types/         # 型別定義
```

## 程式碼生成指引

### 新增組件時
1. 創建型別定義
2. 實現組件邏輯
3. 添加適當的樣式
4. 確保響應式設計
5. 添加必要的註釋

### API 路由開發
1. 定義請求/響應型別
2. 實現資料驗證
3. 添加錯誤處理
4. 確保安全性檢查

### 資料庫相關
- 使用 generated/api.ts 中的型別
- 確保資料驗證和清理
- 實現適當的錯誤處理

## 最佳實踐

### 性能優化
- 使用 React.memo 包裝純組件
- 適當使用 useMemo 和 useCallback
- 圖片使用 Next.js Image 組件
- 實現代碼分割和懶載入

### 可訪問性
- 使用語義化的 HTML 標籤
- 添加適當的 ARIA 標籤
- 確保鍵盤導航支援
- 維持適當的色彩對比度

### SEO 優化
- 使用 Next.js Metadata API
- 實現結構化資料
- 確保頁面載入速度
- 添加適當的 alt 文字

## 程式碼審查重點

### 必須檢查項目
- [ ] TypeScript 型別安全
- [ ] 響應式設計實現
- [ ] 錯誤處理完整性
- [ ] 性能影響評估
- [ ] 可訪問性標準
- [ ] 安全性考量

### 程式碼品質指標
- 函數長度不超過 50 行
- 組件 props 數量控制在 10 個以內
- 使用有意義的變數和函數名稱
- 避免深層巢狀結構

## 常用工具函數

### 樣式組合
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 資料驗證
```typescript
import { z } from "zod"

export const shopSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  // ...其他欄位
})
```

## 常見模式與範例

### 頁面組件範例
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '頁面標題',
  description: '頁面描述',
}

export default function PageName() {
  return (
    <div className="container mx-auto px-4">
      {/* 頁面內容 */}
    </div>
  )
}
```

### API 路由範例
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const requestSchema = z.object({
  // 定義請求結構
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = requestSchema.parse(body)
    
    // 處理邏輯
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error message' },
      { status: 400 }
    )
  }
}
```

## 錯誤處理策略

### 用戶端錯誤
- 使用 Error Boundary 捕獲組件錯誤
- 實現友善的錯誤訊息顯示
- 提供重試機制

### 伺服器端錯誤
- 記錄詳細的錯誤日誌
- 返回標準化的錯誤響應
- 避免洩露敏感資訊

請在協助開發時遵循以上指引，確保程式碼品質和專案一致性。