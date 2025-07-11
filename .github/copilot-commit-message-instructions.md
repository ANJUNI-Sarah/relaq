# GitHub Copilot Commit Message Instructions for Relaq

## Commit 訊息規範

本專案使用 [Conventional Commits](https://www.conventionalcommits.org/) 規範來維持一致的提交歷史。

## 基本格式

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### 必填欄位

#### Type (類型)
- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文檔更新
- `style`: 代碼格式修改（不影響功能的變更）
- `refactor`: 代碼重構（既不是新功能也不是錯誤修復）
- `perf`: 性能優化
- `test`: 測試相關
- `build`: 建構系統或外部依賴變更
- `ci`: CI/CD 配置文件和腳本變更
- `chore`: 其他不修改源代碼或測試文件的變更
- `revert`: 回滾先前的提交

#### Scope (範圍) - 可選
專案模組或組件名稱，建議使用以下範圍：

**頁面相關:**
- `home`: 首頁
- `shop`: 店家相關頁面
- `article`: 文章相關頁面
- `list`: 列表頁面
- `search`: 搜尋功能

**組件相關:**
- `ui`: UI 組件
- `components`: 業務組件
- `header`: 頭部組件
- `pagination`: 分頁組件
- `card`: 卡片組件

**功能相關:**
- `api`: API 路由
- `hooks`: 自訂 Hooks
- `utils`: 工具函數
- `types`: 型別定義
- `styles`: 樣式相關

**建構相關:**
- `build`: 建構配置
- `deploy`: 部署相關
- `docker`: Docker 配置
- `deps`: 依賴管理

#### Description (描述)
- 使用現在式、命令語氣
- 不要大寫首字母
- 結尾不要加句號
- 限制在 50 字符以內
- 使用中文或英文（保持一致性）

## Commit 訊息範例

### 功能開發
```bash
feat(shop): add rating system for shops
feat(api): implement shop search with filters
feat(components): add image carousel component
feat(ui): create custom date picker component
```

### 錯誤修復
```bash
fix(pagination): resolve incorrect page count calculation
fix(api): handle empty search results properly
fix(shop): fix image loading error on detail page
fix(styles): correct mobile responsive layout
```

### 文檔更新
```bash
docs(readme): update installation instructions
docs(api): add API endpoint documentation
docs(components): document prop types for ShopCard
```

### 樣式調整
```bash
style(components): format code according to prettier rules
style(shop): adjust spacing in shop detail layout
style: fix indentation in multiple files
```

### 重構
```bash
refactor(hooks): simplify useSearch hook implementation
refactor(api): extract common error handling logic
refactor(components): convert class components to functional components
```

### 性能優化
```bash
perf(list): implement virtual scrolling for shop list
perf(images): optimize image loading with lazy loading
perf(api): add caching for frequently accessed data
```

### 測試
```bash
test(components): add unit tests for ShopCard component
test(api): add integration tests for shop endpoints
test(utils): increase test coverage for utility functions
```

### 建構與配置
```bash
build(deps): upgrade Next.js to version 14.2.16
build(docker): optimize Docker image size
ci: add automated testing workflow
chore(deps): update development dependencies
```

## 詳細描述格式

### Body (主體) - 可選
提供更詳細的變更說明：
- 解釋變更的原因和背景
- 描述實現的方法
- 說明對現有功能的影響

```
feat(shop): add rating system for shops

- Implement 5-star rating display component
- Add rating calculation logic in shop service
- Update shop card to show average rating
- Add rating filter in shop search

The rating system allows users to see shop quality
and helps improve search relevance.
```

### Footer (頁腳) - 可選
用於記錄破壞性變更和關閉 Issues：

```
feat(api): redesign shop search API

BREAKING CHANGE: The search API now returns paginated results.
The response format has changed from array to object with
data and pagination fields.

Closes #123
Fixes #456
```

## 特殊情況處理

### 破壞性變更 (Breaking Changes)
在 footer 中使用 `BREAKING CHANGE:` 標記：

```
feat(api)!: change shop data structure

BREAKING CHANGE: Shop model now includes required 'category' field.
All existing API consumers need to update their implementations.
```

### 多個變更
如果一個 commit 包含多個相關變更，可以在 body 中列出：

```
feat(shop): enhance shop detail page

- Add image gallery with zoom functionality
- Implement shop hours display
- Add social media links section
- Improve mobile responsive design
```

### 回滾 Commit
```bash
revert: feat(shop): add rating system

This reverts commit abc123def456.
The rating system caused performance issues in production.
```

## 自動化工具建議

### 提交前檢查
建議使用以下工具確保 commit 訊息品質：
- `commitlint`: 檢查 commit 訊息格式
- `husky`: Git hooks 管理
- `lint-staged`: 對暫存文件運行 linters

### 生成變更日誌
- `standard-version`: 自動生成版本號和 CHANGELOG
- `conventional-changelog`: 基於 commit 訊息生成變更日誌

## 常見錯誤避免

### ❌ 不好的範例
```bash
fix: bug fix
feat: new feature
update: update files
WIP: work in progress
quick fix
```

### ✅ 好的範例
```bash
fix(shop): resolve image loading timeout issue
feat(search): implement advanced filter options
docs(readme): update API documentation
style(components): format according to prettier rules
```

## Commit 頻率建議

- **小而頻繁**: 每個 commit 應該包含一個邏輯上完整的變更
- **功能完整**: 確保每個 commit 不會破壞應用程序
- **測試通過**: 提交前確保所有測試通過
- **程式碼審查**: 大型變更應該分解為多個小的 commit

## 團隊協作

### Code Review 期間
- 根據審查意見，使用 `git commit --amend` 修改最後一次提交
- 或者創建新的修復 commit: `fix(review): address code review comments`

### 合併策略
- 使用 `squash and merge` 將功能分支的多個 commit 合併為一個
- 確保合併後的 commit 訊息遵循規範

遵循這些規範將幫助團隊維護清晰的項目歷史，並支援自動化工具的使用。