# 開發指南 / Development Guide

## 目錄 / Table of Contents
- [專案概述 / Project Overview](#專案概述--project-overview)
- [技術架構 / Technical Architecture](#技術架構--technical-architecture)
- [專案結構 / Project Structure](#專案結構--project-structure)
- [環境設置 / Environment Setup](#環境設置--environment-setup)
- [開發流程 / Development Workflow](#開發流程--development-workflow)
- [核心功能說明 / Core Features](#核心功能說明--core-features)
- [資料流程 / Data Flow](#資料流程--data-flow)
- [認證系統 / Authentication System](#認證系統--authentication-system)
- [路由配置 / Routing Configuration](#路由配置--routing-configuration)
- [主題與樣式 / Theme and Styling](#主題與樣式--theme-and-styling)
- [API 整合 / API Integration](#api-整合--api-integration)
- [最佳實踐 / Best Practices](#最佳實踐--best-practices)
- [故障排除 / Troubleshooting](#故障排除--troubleshooting)

---

## 專案概述 / Project Overview

### 中文
這是一個基於 Refine 框架開發的企業級後台管理系統。Refine 是一個 React 框架，專門用於快速構建內部工具、管理面板、儀表板和 B2B 應用程式。

**主要特色：**
- 完整的 CRUD 操作（創建、讀取、更新、刪除）
- JWT 認證系統
- Material-UI 介面設計
- 深色/淺色主題切換
- 資料表格與分頁
- 表單驗證
- 響應式設計

### English
This is an enterprise-level admin panel built with Refine framework. Refine is a React framework specifically designed for rapidly building internal tools, admin panels, dashboards, and B2B applications.

**Key Features:**
- Complete CRUD operations (Create, Read, Update, Delete)
- JWT Authentication system
- Material-UI interface design
- Dark/Light theme toggle
- Data tables with pagination
- Form validation
- Responsive design

---

## 技術架構 / Technical Architecture

### 核心技術棧 / Core Tech Stack

| 技術 / Technology | 版本 / Version | 用途 / Purpose |
|-------------------|----------------|----------------|
| **React** | 19.1.0 | 前端框架 / Frontend Framework |
| **TypeScript** | 5.8.3 | 類型安全 / Type Safety |
| **Refine** | 5.0.8 | 管理系統框架 / Admin Framework |
| **Material-UI** | 6.1.7 | UI 組件庫 / UI Component Library |
| **React Router** | 7.0.2 | 路由管理 / Routing |
| **React Hook Form** | 7.57.0 | 表單處理 / Form Handling |
| **Vite** | 6.3.5 | 構建工具 / Build Tool |

### 架構圖 / Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│              React Application                      │
│  ┌──────────────────────────────────────────────┐  │
│  │         Refine Core (App.tsx)                │  │
│  │  - Resource Management                       │  │
│  │  - Authentication Flow                       │  │
│  │  - Routing                                   │  │
│  └──────────────┬──────────────┬─────────────────┘  │
│                 │              │                     │
│  ┌──────────────▼────┐  ┌──────▼──────────────┐    │
│  │   Providers       │  │   UI Layer          │    │
│  │                   │  │                     │    │
│  │ - Auth Provider   │  │ - Material-UI       │    │
│  │ - Data Provider   │  │ - Custom Components │    │
│  │ - Router Provider │  │ - Theme Provider    │    │
│  └──────────┬────────┘  └─────────────────────┘    │
└─────────────┼──────────────────────────────────────┘
              │
┌─────────────▼───────────────────────────────────────┐
│          Backend API (REST)                         │
│  - /auth/login                                      │
│  - /blog_posts                                      │
│  - /categories                                      │
└─────────────────────────────────────────────────────┘
```

---

## 專案結構 / Project Structure

```
demo-refine/
├── public/                      # 靜態資源 / Static assets
│   └── favicon.ico
│
├── src/                         # 原始碼 / Source code
│   ├── App.tsx                  # 應用程式入口 / App entry point
│   ├── index.tsx                # React 入口 / React entry
│   │
│   ├── components/              # 可重用組件 / Reusable components
│   │   ├── header/             # 頁首組件 / Header component
│   │   │   └── index.tsx       # - 深淺色主題切換 / Theme toggle
│   │   │                       # - 用戶資訊顯示 / User info display
│   │   └── title/              # 標題組件 / Title component
│   │       └── index.tsx
│   │
│   ├── contexts/                # React Context / Context providers
│   │   └── color-mode/         # 主題模式 Context / Theme mode context
│   │       └── index.tsx       # - 深淺色主題管理 / Dark/Light theme
│   │                           # - LocalStorage 持久化 / Persistence
│   │
│   ├── pages/                   # 頁面組件 / Page components
│   │   ├── blog-posts/         # 部落格文章管理 / Blog post management
│   │   │   ├── list.tsx        # - 列表頁（DataGrid）/ List page
│   │   │   ├── create.tsx      # - 創建頁（表單）/ Create page
│   │   │   ├── edit.tsx        # - 編輯頁（表單）/ Edit page
│   │   │   ├── show.tsx        # - 詳情頁 / Show page
│   │   │   └── index.ts        # - 匯出 / Exports
│   │   │
│   │   ├── categories/         # 分類管理 / Category management
│   │   │   ├── list.tsx        # - 列表頁 / List page
│   │   │   ├── create.tsx      # - 創建頁 / Create page
│   │   │   ├── edit.tsx        # - 編輯頁 / Edit page
│   │   │   ├── show.tsx        # - 詳情頁 / Show page
│   │   │   └── index.ts        # - 匯出 / Exports
│   │   │
│   │   ├── login/              # 登入頁 / Login page
│   │   │   └── index.tsx
│   │   ├── register/           # 註冊頁 / Register page
│   │   │   └── index.tsx
│   │   └── forgotPassword/     # 忘記密碼頁 / Forgot password
│   │       └── index.tsx
│   │
│   └── providers/               # 資料與邏輯提供者 / Providers
│       ├── auth.ts             # 認證邏輯 / Authentication logic
│       ├── data.ts             # 資料存取層 / Data access layer
│       └── constants.ts        # 常數配置 / Constants
│
├── Dockerfile                   # Docker 配置 / Docker configuration
├── vite.config.ts              # Vite 配置 / Vite config
├── tsconfig.json               # TypeScript 配置 / TS config
├── package.json                # 專案依賴 / Dependencies
└── README.MD                   # 專案說明 / Project readme
```

---

## 環境設置 / Environment Setup

### 必要條件 / Prerequisites

```bash
# Node.js 版本要求 / Node.js version required
Node.js >= 18.0.0
npm >= 9.0.0 或 / or yarn >= 1.22.0
```

### 安裝步驟 / Installation Steps

#### 1. 克隆專案 / Clone Repository
```bash
git clone <repository-url>
cd demo-refine
```

#### 2. 安裝依賴 / Install Dependencies
```bash
# 使用 npm / Using npm
npm install

# 或使用 yarn / Or using yarn
yarn install
```

#### 3. 配置環境變數 / Configure Environment Variables
編輯 `src/providers/constants.ts` 檔案：
Edit `src/providers/constants.ts` file:

```typescript
export const API_URL = "http://127.0.0.1:8080/api"; // 修改為你的 API 地址 / Change to your API URL
export const TOKEN_KEY = "refine-auth";
export const USER_KEY = "refine-user";
```

#### 4. 啟動開發伺服器 / Start Development Server
```bash
npm run dev
```

應用程式將在 `http://localhost:5173` 啟動。
Application will start at `http://localhost:5173`.

---

## 開發流程 / Development Workflow

### 可用指令 / Available Scripts

```bash
# 開發模式 / Development mode
npm run dev
# 啟動開發伺服器，支援熱重載 / Start dev server with hot reload

# 建置生產版本 / Build for production
npm run build
# 執行 TypeScript 編譯和 Vite 建置 / Run TS compilation and Vite build

# 啟動生產伺服器 / Start production server
npm run start
# 啟動建置後的應用 / Start the built application

# Refine CLI
npm run refine
# 執行 Refine CLI 指令 / Run Refine CLI commands
```

### 開發工作流程 / Development Workflow

1. **創建新功能 / Create New Feature**
   - 在 `src/pages/` 創建新的頁面目錄
   - Create a new page directory in `src/pages/`

2. **定義資源 / Define Resource**
   - 在 `App.tsx` 的 `resources` 陣列中添加新資源
   - Add new resource in `resources` array in `App.tsx`

3. **實作 CRUD 頁面 / Implement CRUD Pages**
   - `list.tsx`: 列表頁 / List page
   - `create.tsx`: 創建頁 / Create page
   - `edit.tsx`: 編輯頁 / Edit page
   - `show.tsx`: 詳情頁 / Show page

4. **配置路由 / Configure Routes**
   - 在 `App.tsx` 的 `<Routes>` 中添加對應路由
   - Add corresponding routes in `<Routes>` in `App.tsx`

---

## 核心功能說明 / Core Features

### 1. 部落格文章管理 / Blog Post Management

**功能特色 / Features:**
- ✅ 文章列表（支援分頁、排序）/ List with pagination & sorting
- ✅ 創建文章（表單驗證）/ Create with form validation
- ✅ 編輯文章 / Edit posts
- ✅ 刪除文章 / Delete posts
- ✅ 查看文章詳情 / View post details
- ✅ 分類關聯 / Category association
- ✅ 狀態管理（發布/草稿）/ Status management (published/draft)

**資料模型 / Data Model:**
```typescript
interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: {
    id: number;
    title: string;
  };
  status: "published" | "draft" | "rejected";
  createdAt: string;
}
```

### 2. 分類管理 / Category Management

**功能特色 / Features:**
- ✅ 分類列表 / Category list
- ✅ 創建分類 / Create category
- ✅ 編輯分類 / Edit category
- ✅ 刪除分類 / Delete category

**資料模型 / Data Model:**
```typescript
interface Category {
  id: number;
  title: string;
}
```

### 3. 用戶認證 / User Authentication

**功能特色 / Features:**
- ✅ 登入 / Login
- ✅ 登出 / Logout
- ✅ 註冊 / Register
- ✅ 忘記密碼 / Forgot password
- ✅ 受保護路由 / Protected routes
- ✅ JWT Token 管理 / JWT token management

---

## 資料流程 / Data Flow

### 1. 資料提供者 (Data Provider) 流程

```
Component (list.tsx)
    │
    ├─→ useDataGrid() Hook
    │      │
    │      └─→ Refine Core
    │             │
    │             └─→ Data Provider (data.ts)
    │                    │
    │                    ├─→ Add JWT Token (Interceptor)
    │                    │
    │                    └─→ Backend API
    │                           │
    │                           └─→ Response
    │                                  │
    └────────────────────────────────┘
```

### 2. 認證流程 (Authentication Flow)

```
Login Page
    │
    └─→ authProvider.login()
           │
           ├─→ POST /auth/login
           │      │
           │      └─→ Get JWT Token
           │
           ├─→ Store in localStorage
           │      - TOKEN_KEY
           │      - USER_KEY
           │
           └─→ Redirect to "/"
                  │
                  └─→ Protected Route
                         │
                         └─→ authProvider.check()
                                │
                                └─→ Validate Token
```

---

## 認證系統 / Authentication System

### Auth Provider 架構 / Auth Provider Architecture

檔案位置 / File Location: `src/providers/auth.ts`

#### 主要方法 / Main Methods:

1. **login** - 用戶登入 / User login
```typescript
login: async ({ email, username, password }) => {
  // POST to /auth/login
  // Store token and user info in localStorage
  // Return success or error
}
```

2. **logout** - 用戶登出 / User logout
```typescript
logout: async () => {
  // Remove token and user from localStorage
  // Redirect to /login
}
```

3. **check** - 檢查認證狀態 / Check authentication
```typescript
check: async () => {
  // Verify token exists in localStorage
  // Return authenticated status
}
```

4. **getIdentity** - 取得用戶資訊 / Get user identity
```typescript
getIdentity: async () => {
  // Get user info from localStorage
  // Return user object with id, name, email, avatar
}
```

### Token 管理 / Token Management

**儲存位置 / Storage Location:** `localStorage`

- `refine-auth`: JWT Token
- `refine-user`: 用戶資訊 / User information

**自動注入 / Auto Injection:**
所有 API 請求自動注入 JWT Token（透過 Axios Interceptor）
All API requests automatically inject JWT Token (via Axios Interceptor)

```typescript
// src/providers/data.ts
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

---

## 路由配置 / Routing Configuration

### 路由結構 / Route Structure

```
/                           → 重導向至 /blog-posts / Redirect to /blog-posts
├── /blog-posts            → 文章列表 / Blog post list (Protected)
│   ├── /create            → 創建文章 / Create post (Protected)
│   ├── /edit/:id          → 編輯文章 / Edit post (Protected)
│   └── /show/:id          → 文章詳情 / Post details (Protected)
│
├── /categories            → 分類列表 / Category list (Protected)
│   ├── /create            → 創建分類 / Create category (Protected)
│   ├── /edit/:id          → 編輯分類 / Edit category (Protected)
│   └── /show/:id          → 分類詳情 / Category details (Protected)
│
├── /login                 → 登入頁 / Login page (Public)
├── /register              → 註冊頁 / Register page (Public)
└── /forgot-password       → 忘記密碼 / Forgot password (Public)
```

### 受保護路由 / Protected Routes

所有受保護的路由都被 `<Authenticated>` 組件包裹：
All protected routes are wrapped by `<Authenticated>` component:

```typescript
<Route
    element={
        <Authenticated
            fallback={<CatchAllNavigate to="/login" />}
        >
            <ThemedLayout Header={Header}>
                <Outlet />
            </ThemedLayout>
        </Authenticated>
    }
>
    {/* Protected routes */}
</Route>
```

---

## 主題與樣式 / Theme and Styling

### 主題提供者 / Theme Provider

檔案位置 / File Location: `src/contexts/color-mode/index.tsx`

**功能 / Features:**
- 🌙 深色模式 / Dark mode
- ☀️ 淺色模式 / Light mode
- 💾 LocalStorage 持久化 / Persistence with localStorage
- 🎨 Material-UI RefineThemes

### 可用主題色 / Available Theme Colors

```typescript
// 淺色主題 / Light themes
RefineThemes.Blue
RefineThemes.Purple
RefineThemes.Magenta
RefineThemes.Red
RefineThemes.Orange
RefineThemes.Yellow

// 深色主題 / Dark themes
RefineThemes.BlueDark
RefineThemes.PurpleDark
RefineThemes.MagentaDark
RefineThemes.RedDark
RefineThemes.OrangeDark
RefineThemes.YellowDark
```

### 自訂主題 / Customize Theme

編輯 `src/contexts/color-mode/index.tsx`:
Edit `src/contexts/color-mode/index.tsx`:

```typescript
<ThemeProvider
    theme={
        mode === "light" 
            ? RefineThemes.Purple     // 改變淺色主題 / Change light theme
            : RefineThemes.PurpleDark  // 改變深色主題 / Change dark theme
    }
>
```

---

## API 整合 / API Integration

### API 配置 / API Configuration

檔案位置 / File Location: `src/providers/constants.ts`

```typescript
export const API_URL = "http://127.0.0.1:8080/api";
export const TOKEN_KEY = "refine-auth";
export const USER_KEY = "refine-user";
```

### API 端點 / API Endpoints

#### 認證相關 / Authentication
```
POST   /auth/login           # 登入 / Login
POST   /auth/register        # 註冊 / Register
POST   /auth/forgot-password # 忘記密碼 / Forgot password
```

#### 部落格文章 / Blog Posts
```
GET    /blog_posts           # 取得列表 / Get list
GET    /blog_posts/:id       # 取得單筆 / Get one
POST   /blog_posts           # 創建 / Create
PUT    /blog_posts/:id       # 更新 / Update
PATCH  /blog_posts/:id       # 部分更新 / Partial update
DELETE /blog_posts/:id       # 刪除 / Delete
```

#### 分類 / Categories
```
GET    /categories           # 取得列表 / Get list
GET    /categories/:id       # 取得單筆 / Get one
POST   /categories           # 創建 / Create
PUT    /categories/:id       # 更新 / Update
PATCH  /categories/:id       # 部分更新 / Partial update
DELETE /categories/:id       # 刪除 / Delete
```

### 請求格式 / Request Format

#### 認證請求 / Authentication Request
```json
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 認證回應 / Authentication Response
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

---

## 最佳實踐 / Best Practices

### 1. 代碼組織 / Code Organization

✅ **DO 建議做法:**
```typescript
// 將相關功能組織在一起 / Group related functionality
src/pages/blog-posts/
├── list.tsx
├── create.tsx
├── edit.tsx
├── show.tsx
└── index.ts  // 統一匯出 / Centralized exports
```

❌ **DON'T 不建議:**
```typescript
// 不要將所有頁面放在同一個檔案 / Don't put all pages in one file
src/pages/
└── blog-posts.tsx  // 包含所有 CRUD 操作 / Contains all CRUD
```

### 2. 表單處理 / Form Handling

✅ **DO 建議做法:**
```typescript
// 使用 React Hook Form 與 Controller
const { control, register, formState: { errors } } = useForm();

<TextField
    {...register("title", {
        required: "This field is required",
        minLength: { value: 3, message: "Min 3 characters" }
    })}
    error={!!errors.title}
    helperText={errors.title?.message}
/>
```

### 3. 資料獲取 / Data Fetching

✅ **DO 建議做法:**
```typescript
// 使用 Refine hooks
const { dataGridProps } = useDataGrid();
const { data, isLoading } = useOne({ resource: "posts", id: 1 });
```

❌ **DON'T 不建議:**
```typescript
// 不要直接使用 fetch 或 axios
useEffect(() => {
    fetch('/api/posts').then(/* ... */);
}, []);
```

### 4. 類型安全 / Type Safety

✅ **DO 建議做法:**
```typescript
// 定義介面 / Define interfaces
interface BlogPost {
    id: number;
    title: string;
    content: string;
    category: Category;
}

const { data } = useOne<BlogPost>({ resource: "posts", id: 1 });
```

### 5. 錯誤處理 / Error Handling

✅ **DO 建議做法:**
```typescript
// 使用 try-catch 處理錯誤 / Handle errors with try-catch
try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch");
    }
} catch (error) {
    console.error(error);
    return { success: false, error };
}
```

---

## 故障排除 / Troubleshooting

### 常見問題 / Common Issues

#### 1. 認證失敗 / Authentication Fails

**問題 / Problem:** 登入後仍然重導向到登入頁
Login redirects back to login page

**解決方案 / Solution:**
```typescript
// 檢查 localStorage 中是否有 token / Check if token exists in localStorage
localStorage.getItem('refine-auth')

// 檢查 API 回應格式 / Check API response format
// 必須包含 accessToken 和 user / Must include accessToken and user
{
  "accessToken": "...",
  "user": { ... }
}
```

#### 2. CORS 錯誤 / CORS Error

**問題 / Problem:** API 請求被 CORS 政策阻擋
API requests blocked by CORS policy

**解決方案 / Solution:**
後端需要設置 CORS headers:
Backend needs to set CORS headers:

```typescript
// Express.js 範例 / Express.js example
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
```

#### 3. 建置錯誤 / Build Errors

**問題 / Problem:** TypeScript 編譯錯誤
TypeScript compilation errors

**解決方案 / Solution:**
```bash
# 清除快取 / Clear cache
rm -rf node_modules
rm package-lock.json
npm install

# 檢查 TypeScript 版本 / Check TypeScript version
npm list typescript
```

#### 4. 開發伺服器啟動失敗 / Dev Server Fails

**問題 / Problem:** Port 已被占用
Port already in use

**解決方案 / Solution:**
```bash
# 方法 1: 更改端口 / Method 1: Change port
npm run dev -- --port 3000

# 方法 2: 殺掉佔用端口的進程 / Method 2: Kill process on port
# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

#### 5. DataGrid 無資料 / DataGrid No Data

**問題 / Problem:** 表格不顯示資料
Table doesn't show data

**解決方案 / Solution:**
```typescript
// 1. 檢查 API 回應格式 / Check API response format
// Refine 預期格式 / Expected format:
{
  "data": [...],
  "total": 100
}

// 2. 檢查 resource 名稱 / Check resource name
// App.tsx 中的 name 必須匹配 API 端點
// name in App.tsx must match API endpoint
{
  name: "blog_posts",  // API: /blog_posts
}
```

---

## Docker 部署 / Docker Deployment

### 建置 Docker 映像 / Build Docker Image

```bash
# 建置映像 / Build image
docker build -t demo-refine:latest .

# 運行容器 / Run container
docker run -p 3000:3000 demo-refine:latest
```

### Docker Compose (範例)

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

---

## 效能優化 / Performance Optimization

### 建議 / Recommendations

1. **代碼分割 / Code Splitting**
   - Vite 自動進行代碼分割 / Vite automatically splits code
   - 使用 React.lazy() 進行路由層級分割 / Use React.lazy() for route-level splitting

2. **快取策略 / Caching Strategy**
   - Refine 自動快取資料 / Refine automatically caches data
   - 使用 `queryOptions` 自訂快取行為 / Customize caching with `queryOptions`

3. **圖片優化 / Image Optimization**
   - 使用適當的圖片格式 / Use appropriate image formats
   - 實作懶加載 / Implement lazy loading

---

## 測試 / Testing

### 建議的測試工具 / Recommended Testing Tools

```bash
# 安裝測試依賴 / Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### 測試範例 / Test Example

```typescript
// BlogPostList.test.tsx
import { render, screen } from '@testing-library/react';
import { BlogPostList } from './list';

test('renders blog post list', () => {
  render(<BlogPostList />);
  expect(screen.getByText(/blog posts/i)).toBeInTheDocument();
});
```

---

## 貢獻指南 / Contributing Guidelines

1. Fork 專案 / Fork the project
2. 創建功能分支 / Create feature branch: `git checkout -b feature/AmazingFeature`
3. 提交變更 / Commit changes: `git commit -m 'Add some AmazingFeature'`
4. 推送到分支 / Push to branch: `git push origin feature/AmazingFeature`
5. 開啟 Pull Request / Open a Pull Request

---

## 參考資源 / References

### 官方文件 / Official Documentation
- [Refine Documentation](https://refine.dev/docs)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [React Router Documentation](https://reactrouter.com/)
- [React Hook Form Documentation](https://react-hook-form.com/)

### 相關指南 / Related Guides
- [Refine Tutorial](https://refine.dev/docs/tutorial/introduction/index/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 授權 / License

MIT

---

## 聯繫方式 / Contact

如有問題或建議，請開啟 Issue 或 Pull Request。
For questions or suggestions, please open an Issue or Pull Request.

---

**最後更新 / Last Updated:** 2026-01-18
