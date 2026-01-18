# Demo Refine - 企業級後台管理系統 / Enterprise Admin Panel

<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img alt="refine logo" src="https://refine.ams3.cdn.digitaloceanspaces.com/readme/refine-readme-banner.png">
    </a>
</div>

<div align="center">

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Refine](https://img.shields.io/badge/Refine-5.0.8-1890FF)](https://refine.dev/)
[![Material-UI](https://img.shields.io/badge/MUI-6.1.7-007FFF?logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**[English](#english) | [繁體中文](#繁體中文)**

</div>

---

## 繁體中文

### 📋 專案簡介

這是一個基於 [Refine](https://github.com/refinedev/refine) 框架打造的現代化企業級後台管理系統。Refine 是一個強大的 React 框架，專為快速開發內部工具、管理面板、儀表板和 B2B 應用而設計。

本專案展示了如何使用 Refine 建構一個功能完整的內容管理系統，包含部落格文章管理、分類管理和完整的使用者認證系統。

### ✨ 主要特色

- 🔐 **完整認證系統** - JWT token 認證、登入/登出、註冊、忘記密碼
- 📝 **部落格文章管理** - 完整的 CRUD 操作（創建、讀取、更新、刪除）
- 🏷️ **分類管理** - 文章分類的完整管理功能
- 🎨 **Material-UI 設計** - 美觀且現代的使用者介面
- 🌓 **深淺色主題** - 支援深色/淺色模式切換，並持久化保存
- 📊 **資料表格** - 強大的 DataGrid，支援排序、篩選、分頁
- ✅ **表單驗證** - React Hook Form 整合，完整的表單驗證
- 📱 **響應式設計** - 完美適配各種螢幕尺寸
- 🚀 **快速開發** - Vite 建置工具，極速的開發體驗
- 🔄 **REST API 整合** - 簡單易用的資料提供者

### 🛠️ 技術棧

| 技術 | 版本 | 說明 |
|------|------|------|
| React | 19.1.0 | 前端框架 |
| TypeScript | 5.8.3 | 類型安全的 JavaScript |
| Refine | 5.0.8 | 企業級管理系統框架 |
| Material-UI (MUI) | 6.1.7 | React UI 組件庫 |
| React Router | 7.0.2 | 路由管理 |
| React Hook Form | 7.57.0 | 高效能表單處理 |
| Vite | 6.3.5 | 下一代前端建置工具 |
| ESLint | 9.25.0 | 代碼品質檢查 |

### 📁 專案結構

```
demo-refine/
├── src/
│   ├── App.tsx                 # 應用程式主入口
│   ├── index.tsx               # React 渲染入口
│   ├── components/             # 可重用組件
│   │   ├── header/            # 頁首組件（主題切換、用戶資訊）
│   │   └── title/             # 標題組件
│   ├── contexts/              # React Context
│   │   └── color-mode/        # 主題模式管理
│   ├── pages/                 # 頁面組件
│   │   ├── blog-posts/        # 部落格文章（列表/創建/編輯/詳情）
│   │   ├── categories/        # 分類管理（列表/創建/編輯/詳情）
│   │   ├── login/             # 登入頁
│   │   ├── register/          # 註冊頁
│   │   └── forgotPassword/    # 忘記密碼頁
│   └── providers/             # 提供者
│       ├── auth.ts            # 認證邏輯
│       ├── data.ts            # 資料存取層
│       └── constants.ts       # 常數配置
├── public/                    # 靜態資源
├── Dockerfile                 # Docker 配置
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
└── package.json              # 專案依賴
```

### 🚀 快速開始

#### 環境需求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

#### 安裝步驟

```bash
# 1. 克隆專案
git clone <repository-url>
cd demo-refine

# 2. 安裝依賴
npm install

# 3. 配置 API 端點（可選）
# 編輯 src/providers/constants.ts
export const API_URL = "http://127.0.0.1:8080/api";

# 4. 啟動開發伺服器
npm run dev
```

應用程式將在 http://localhost:5173 啟動。

#### 預設登入資訊

```
Email: demo@refine.dev
Password: demodemo
```

### 📜 可用指令

```bash
npm run dev      # 啟動開發伺服器（支援熱重載）
npm run build    # 建置生產版本
npm run start    # 啟動生產伺服器
npm run refine   # 執行 Refine CLI 指令
```

### 🎯 主要功能

#### 1. 部落格文章管理
- ✅ 文章列表展示（DataGrid）
- ✅ 創建新文章（表單驗證）
- ✅ 編輯現有文章
- ✅ 刪除文章
- ✅ 查看文章詳情
- ✅ 文章分類關聯
- ✅ 文章狀態管理（發布/草稿/拒絕）

#### 2. 分類管理
- ✅ 分類列表
- ✅ 創建分類
- ✅ 編輯分類
- ✅ 刪除分類

#### 3. 使用者認證
- ✅ JWT Token 認證
- ✅ 登入/登出
- ✅ 使用者註冊
- ✅ 忘記密碼
- ✅ 受保護路由
- ✅ 自動 Token 注入

#### 4. UI/UX 特色
- ✅ Material Design 3
- ✅ 深色/淺色主題切換
- ✅ 響應式設計
- ✅ 載入狀態顯示
- ✅ 錯誤處理
- ✅ 成功/失敗通知

### 🔌 API 整合

本專案使用 REST API，預設端點：`http://127.0.0.1:8080/api`

#### 認證端點
```
POST /auth/login           # 使用者登入
POST /auth/register        # 使用者註冊
POST /auth/forgot-password # 忘記密碼
```

#### 資源端點
```
GET/POST       /blog_posts      # 取得列表/創建
GET/PUT/DELETE /blog_posts/:id  # 取得/更新/刪除單筆

GET/POST       /categories      # 取得列表/創建
GET/PUT/DELETE /categories/:id  # 取得/更新/刪除單筆
```

### 📖 詳細文件

完整的開發指南請參閱：[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

內容包含：
- 詳細架構說明
- 開發流程指南
- 認證系統詳解
- 資料流程說明
- API 整合教學
- 最佳實踐建議
- 故障排除指南

### 🐳 Docker 部署

```bash
# 建置 Docker 映像
docker build -t demo-refine:latest .

# 運行容器
docker run -p 3000:3000 demo-refine:latest
```

### 📚 學習資源

- [Refine 官方文件](https://refine.dev/docs)
- [Material-UI 文件](https://mui.com/material-ui/getting-started/)
- [React Router 文件](https://reactrouter.com/)
- [React Hook Form 文件](https://react-hook-form.com/)

### 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

### 📄 授權

MIT License

---

## English

### 📋 Project Overview

This is a modern enterprise-level admin panel built with the [Refine](https://github.com/refinedev/refine) framework. Refine is a powerful React framework designed for rapidly building internal tools, admin panels, dashboards, and B2B applications.

This project demonstrates how to build a fully functional content management system using Refine, including blog post management, category management, and a complete user authentication system.

### ✨ Key Features

- 🔐 **Complete Authentication** - JWT token auth, login/logout, register, forgot password
- 📝 **Blog Post Management** - Full CRUD operations (Create, Read, Update, Delete)
- 🏷️ **Category Management** - Complete category management functionality
- 🎨 **Material-UI Design** - Beautiful and modern user interface
- 🌓 **Dark/Light Theme** - Theme toggle with persistent storage
- 📊 **Data Tables** - Powerful DataGrid with sorting, filtering, pagination
- ✅ **Form Validation** - React Hook Form integration with full validation
- 📱 **Responsive Design** - Perfect adaptation to all screen sizes
- 🚀 **Fast Development** - Vite build tool for lightning-fast dev experience
- 🔄 **REST API Integration** - Easy-to-use data provider

### 🛠️ Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| React | 19.1.0 | Frontend framework |
| TypeScript | 5.8.3 | Type-safe JavaScript |
| Refine | 5.0.8 | Enterprise admin framework |
| Material-UI (MUI) | 6.1.7 | React UI component library |
| React Router | 7.0.2 | Routing management |
| React Hook Form | 7.57.0 | High-performance form handling |
| Vite | 6.3.5 | Next-generation build tool |
| ESLint | 9.25.0 | Code quality checker |

### 📁 Project Structure

```
demo-refine/
├── src/
│   ├── App.tsx                 # Main application entry
│   ├── index.tsx               # React render entry
│   ├── components/             # Reusable components
│   │   ├── header/            # Header (theme toggle, user info)
│   │   └── title/             # Title component
│   ├── contexts/              # React Context
│   │   └── color-mode/        # Theme mode management
│   ├── pages/                 # Page components
│   │   ├── blog-posts/        # Blog posts (list/create/edit/show)
│   │   ├── categories/        # Categories (list/create/edit/show)
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   └── forgotPassword/    # Forgot password page
│   └── providers/             # Providers
│       ├── auth.ts            # Authentication logic
│       ├── data.ts            # Data access layer
│       └── constants.ts       # Constants configuration
├── public/                    # Static assets
├── Dockerfile                 # Docker configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

### 🚀 Quick Start

#### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 or yarn >= 1.22.0

#### Installation

```bash
# 1. Clone repository
git clone <repository-url>
cd demo-refine

# 2. Install dependencies
npm install

# 3. Configure API endpoint (optional)
# Edit src/providers/constants.ts
export const API_URL = "http://127.0.0.1:8080/api";

# 4. Start development server
npm run dev
```

The application will start at http://localhost:5173.

#### Default Login Credentials

```
Email: demo@refine.dev
Password: demodemo
```

### 📜 Available Scripts

```bash
npm run dev      # Start development server (with hot reload)
npm run build    # Build for production
npm run start    # Start production server
npm run refine   # Run Refine CLI commands
```

### 🎯 Core Features

#### 1. Blog Post Management
- ✅ Post list display (DataGrid)
- ✅ Create new post (with validation)
- ✅ Edit existing post
- ✅ Delete post
- ✅ View post details
- ✅ Post category association
- ✅ Post status management (published/draft/rejected)

#### 2. Category Management
- ✅ Category list
- ✅ Create category
- ✅ Edit category
- ✅ Delete category

#### 3. User Authentication
- ✅ JWT Token authentication
- ✅ Login/Logout
- ✅ User registration
- ✅ Forgot password
- ✅ Protected routes
- ✅ Automatic token injection

#### 4. UI/UX Features
- ✅ Material Design 3
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Success/Error notifications

### 🔌 API Integration

This project uses REST API with default endpoint: `http://127.0.0.1:8080/api`

#### Authentication Endpoints
```
POST /auth/login           # User login
POST /auth/register        # User registration
POST /auth/forgot-password # Forgot password
```

#### Resource Endpoints
```
GET/POST       /blog_posts      # Get list/Create
GET/PUT/DELETE /blog_posts/:id  # Get/Update/Delete one

GET/POST       /categories      # Get list/Create
GET/PUT/DELETE /categories/:id  # Get/Update/Delete one
```

### 📖 Detailed Documentation

For complete development guide, see: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

Includes:
- Detailed architecture explanation
- Development workflow guide
- Authentication system details
- Data flow explanation
- API integration tutorial
- Best practices recommendations
- Troubleshooting guide

### 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t demo-refine:latest .

# Run container
docker run -p 3000:3000 demo-refine:latest
```

### 📚 Learning Resources

- [Refine Documentation](https://refine.dev/docs)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [React Router Documentation](https://reactrouter.com/)
- [React Hook Form Documentation](https://react-hook-form.com/)

### 🤝 Contributing

Issues and Pull Requests are welcome!

### 📄 License

MIT License

---

**Last Updated:** 2026-01-18
