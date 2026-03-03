# fullstack-starter 未来规划

## 项目定位

**个人/团队代码资产积累系统**

- 不是面向公众的开源 UI 库
- 不是通用项目脚手架
- 而是**个人代码银行**：跨项目积累可复用代码，持续增值

## 核心价值

### 工作流程
1. `git clone` 本仓库 → 启动新项目
2. 开发中写出可复用代码 → 提交到 `packages/` 或 `templates/`
3. `pnpm contribute` → PR 回本仓库（存款）
4. 下次新项目 → `pnpm new` 选择模板 / `import` 使用 packages（取款）
5. 本仓库有更新 → `pnpm sync` 同步到现有项目（利息）

### 复利效应
- 第 1 个项目：积累 5 个模板 + 10 个组件
- 第 2 个项目：复用 3 个模板 + 6 个组件，新增 4 个模板 + 8 个组件
- 第 3 个项目：复用 6 个模板 + 12 个组件，新增 3 个模板 + 5 个组件
- **时间越长，价值越大**

## 已完成功能（v0.1.0 ~ v0.12.0）

### CLI 工具链
- ✅ `pnpm new`：从模板创建项目
- ✅ `pnpm templatize`：将项目保存为模板
- ✅ `pnpm remove`：删除项目
- ✅ `pnpm rename`：重命名项目
- ✅ `pnpm contribute`：向上游贡献改动
- ✅ `pnpm dev/build/start`：交互式运行脚本

### UI 组件库（@starter/ui）
- ✅ Layout（7 种布局模式）
- ✅ MenuList（可折叠菜单）
- ✅ Popover（浮层原语）
- ✅ Tooltip（悬停提示）
- ✅ Sidebar + SidebarNav（侧边栏导航）
- ✅ CascadeMenu（级联弹出菜单）
- ✅ UIProvider（portal 容器）

### 技术架构
- ✅ pnpm monorepo
- ✅ vanilla-extract（零运行时 CSS）
- ✅ peerDependencies 策略（避免重复安装）
- ✅ git hooks 自动过滤（cli-release → main）
- ✅ 双向工作流（create ↔ templatize ↔ contribute）

## 近期规划（v0.13.0 ~ v0.15.0）

### v0.13.0 — sync 命令（最高优先级）

**目标**：让现有项目能同步上游的 packages 和 templates 更新

**功能**：
```bash
pnpm sync

# 交互流程：
# ? 检测到上游有更新，选择要同步的内容:
#   [x] templates/features/payment (+3 ~1)
#   [x] templates/components/chart (+5)
#   [ ] templates/backend/nestjs-graphql (+12)
#
# ✓ 同步完成！
```

**实现要点**：
- 读取 `.starter-remote` 或 `package.json.starterRepo` 获取上游地址
- 自动配置 `upstream` remote 并 fetch
- 对比 `upstream/main` 与当前的 `templates/` 差异
- 用户选择要同步的内容
- 使用 `git checkout upstream/main -- <path>` 同步

**涉及文件**：
- `scripts/sync.mjs`：sync 命令实现
- `package.json`：添加 `sync` 脚本

### v0.14.0 — 模板分类细化

**目标**：支持更细粒度的模板管理

**当前结构**：
```
templates/
├── frontend/nextjs-basic/
└── examples/ui/
```

**优化后**：
```
templates/
├── frontend/
│   ├── nextjs-basic/          # 基础模板
│   ├── nextjs-dashboard/      # 后台管理
│   └── nextjs-landing/        # 落地页
├── backend/
│   ├── nestjs-basic/          # REST API
│   └── nestjs-graphql/        # GraphQL API
├── features/                   # 功能模块
│   ├── auth/                  # 认证模块
│   ├── payment/               # 支付模块
│   └── upload/                # 文件上传
└── examples/                   # 示例项目
    └── ui/                    # UI 组件示例
```

**增强 templatize**：
```bash
# 支持指定类型和名称
pnpm templatize --type features --name auth

# 交互流程：
# ? 选择源目录: src/features/auth
# ? 模板类型: features
# ? 模板名称: auth
# ✓ 已保存到 templates/features/auth/
```

**增强 new**：
```bash
# 支持按类型筛选
pnpm new

# 交互流程：
# ? 选择模板类型:
#   > frontend
#     backend
#     features
#     examples
#
# ? 选择模板:
#   > nextjs-basic
#     nextjs-dashboard
#     nextjs-landing
```

### v0.15.0 — 模板元数据系统

**目标**：为每个模板添加元数据，支持搜索、统计、依赖分析

**模板元数据**：
```json
// templates/features/auth/template.json
{
  "name": "auth",
  "type": "feature",
  "version": "1.0.0",
  "description": "JWT + Refresh Token 认证模块",
  "tags": ["auth", "jwt", "nestjs"],
  "dependencies": {
    "packages": ["@nestjs/jwt", "bcrypt"],
    "templates": [],
    "peerDependencies": ["@starter/utils"]
  },
  "createdAt": "2026-03-03",
  "updatedAt": "2026-03-03",
  "usedInProjects": ["project-a", "project-b"],
  "author": "rock"
}
```

**新增命令**：
```bash
# 搜索模板
pnpm search auth
# Output: 找到 2 个模板: features/auth, examples/auth-demo

# 查看模板详情
pnpm info features/auth
# Output:
# 名称: auth
# 类型: feature
# 描述: JWT + Refresh Token 认证模块
# 依赖: @nestjs/jwt, bcrypt
# 使用次数: 2 次
# 最后更新: 2026-03-03

# 统计
pnpm stats
# Output:
# 总模板数: 23
# 最常用: data-table (8次), auth (6次)
# 最近添加: payment (2天前)
```

## 中期规划（v0.16.0 ~ v0.20.0）

### v0.16.0 — NestJS 基础模板

**目标**：完成 backend 模板，支持全栈开发

**内容**：
- `templates/backend/nestjs-basic/`
- 包含 health 端点、环境变量配置、日志系统
- 集成 @starter/utils

### v0.17.0 — 常用功能模块模板

**目标**：积累高频复用的功能模块

**计划模板**：
- `templates/features/auth/`：JWT 认证
- `templates/features/upload/`：文件上传（本地/OSS）
- `templates/features/email/`：邮件发送
- `templates/features/cache/`：Redis 缓存

### v0.18.0 — UI 组件持续积累

**目标**：扩充 @starter/ui 组件库

**计划组件**：
- DataTable（数据表格）
- FormBuilder（表单构建器）
- Chart（图表封装）
- Upload（文件上传）
- Modal（对话框）
- Drawer（抽屉）

### v0.19.0 — Hooks 库建设

**目标**：积累常用 React Hooks

**计划 Hooks**：
- useDebounce
- useThrottle
- useLocalStorage
- useSessionStorage
- useFetch
- useInfiniteScroll
- useMediaQuery
- useClickOutside

### v0.20.0 — Utils 库建设

**目标**：积累常用工具函数

**计划 Utils**：
- format（日期、货币、数字格式化）
- validate（表单验证）
- crypto（加密、哈希）
- string（字符串处理）
- array（数组处理）
- object（对象处理）

## 长期规划（v1.0.0+）

### v1.0.0 — 稳定版本

**里程碑**：
- 50+ 模板
- 30+ UI 组件
- 20+ Hooks
- 完整的文档
- 在 5+ 真实项目中验证

### 持续优化方向

**1. 智能化**
- 自动检测可复用代码并提示
- 依赖分析和冲突检测
- 版本兼容性检查

**2. 协作化**
- 支持团队共享（私有 npm registry）
- 代码审查流程
- 使用统计和分析

**3. 生态化**
- 插件系统
- 自定义模板生成器
- 社区模板市场（可选）

## 维护策略

### 必须做的
1. **每个新项目都用它启动**（强制使用，形成习惯）
2. **项目结束时必须 contribute**（写入工作流）
3. **定期整理模板**（每季度 review 一次）
4. **保持文档同步**（.claude/docs/ 记录设计决策）

### 可选做的
- 发布到 npm（私有或公开）
- 编写详细文档站点
- 开源分享（不是重点）

### 不做的
- 不与 shadcn/ui 等成熟方案竞争
- 不追求大而全（保持精简）
- 不过度抽象（实用优先）

## 价值预测

### 1 年后
- 积累 **20-30 个**高质量模板
- 新项目启动时间从 **2 天 → 2 小时**
- 代码质量更统一

### 3 年后
- 积累 **50-100 个**模板
- 形成完整的**技术栈体系**
- 成为个人/团队的**核心竞争力**

### 5 年后
- 这个仓库就是你的**技术简历**
- 每个模板都是一个**最佳实践案例**
- 可以基于此写书/课程/咨询服务

## 成功标准

### 短期（3 个月）
- [ ] 完成 sync 命令
- [ ] 用本项目启动 1 个真实项目
- [ ] 积累 5+ 个模板

### 中期（1 年）
- [ ] 用本项目启动 3+ 个真实项目
- [ ] 积累 20+ 个模板
- [ ] 积累 15+ 个 UI 组件
- [ ] 新项目启动时间 < 4 小时

### 长期（3 年）
- [ ] 用本项目启动 10+ 个真实项目
- [ ] 积累 50+ 个模板
- [ ] 积累 30+ 个 UI 组件
- [ ] 新项目启动时间 < 2 小时
- [ ] 代码复用率 > 60%

## 风险与应对

### 风险 1：使用频率低
**应对**：
- 强制每个新项目都用它启动
- 设置提醒（每月 review）
- 降低使用门槛（优化 CLI）

### 风险 2：模板质量下降
**应对**：
- 定期 review 和重构
- 在真实项目中验证
- 保持文档同步

### 风险 3：技术栈变化
**应对**：
- 模板支持多版本
- 渐进式迁移
- 保持架构灵活性

## 总结

这个项目的价值 = **使用次数 × 积累质量 × 时间**

- **不是**一个开源项目（不需要推广）
- **不是**一个产品（不需要用户）
- **而是**一个工具（为自己服务）

**核心理念**：
- 每写一行可复用代码，都是在投资未来
- 每启动一个新项目，都是在收获回报
- 时间越长，复利越大

**最终目标**：
- 让自己成为"10x 开发者"
- 不是因为写得快，而是因为**不重复造轮子**
