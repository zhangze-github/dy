# React 虚拟列表表格

一个高性能的 React 虚拟列表表格组件，支持海量数据渲染。

## ✨ 功能特性

- 🚀 **虚拟滚动**：只渲染可见区域的数据，性能卓越
- 📊 **大数据支持**：轻松处理 10 万+ 行数据
- 🎨 **自定义渲染**：支持自定义单元格渲染函数
- 💅 **美观 UI**：现代化响应式设计
- ⚙️ **灵活配置**：可调节行高、容器高度等参数
- 🎯 **TypeScript 友好**：易于类型扩展

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

浏览器会自动打开 http://localhost:8080

### 3. 生产构建

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

## 📖 使用示例

### 基本用法

```jsx
import VirtualTable from './VirtualTable';

const App = () => {
  const data = [
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    // ... 更多数据
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '20%',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '40%',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: '40%',
    },
  ];

  return (
    <VirtualTable 
      data={data}
      columns={columns}
      rowHeight={50}
      containerHeight={600}
    />
  );
};
```

### 自定义单元格渲染

```jsx
const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    width: '30%',
    render: (value, row, index) => (
      <span style={{
        color: value === '在职' ? 'green' : 'red'
      }}>
        {value}
      </span>
    ),
  },
];
```

## 🔧 API 文档

### VirtualTable Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 表格数据 | Array | [] |
| columns | 列配置 | Column[] | [] |
| rowHeight | 行高（像素） | number | 50 |
| containerHeight | 容器高度（像素） | number | 600 |
| overscan | 预渲染行数（性能优化） | number | 5 |

### Column 配置

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| title | 列标题 | string | 是 |
| dataIndex | 数据字段名 | string | 是 |
| width | 列宽度 | string | 否 |
| render | 自定义渲染函数 | (value, row, index) => ReactNode | 否 |

## 🎯 性能优化

- **虚拟滚动**：只渲染可见区域 + overscan 的数据行
- **React.useMemo**：缓存计算结果，避免重复计算
- **transform 定位**：使用 GPU 加速的 transform 而非 top/left
- **overscan 预渲染**：提前渲染可见区域外的几行，提升滚动流畅度

## 📁 项目结构

```
/workspace/
├── src/
│   ├── VirtualTable.jsx      # 虚拟表格组件
│   ├── VirtualTable.css      # 表格样式
│   ├── App.jsx               # 示例应用
│   ├── App.css               # 应用样式
│   └── index.jsx             # 入口文件
├── public/
│   └── index.html            # HTML 模板
├── webpack.config.js         # Webpack 配置
├── .babelrc                  # Babel 配置
└── package.json              # 依赖配置
```

## 🌟 特色亮点

1. **极致性能**：10 万行数据丝滑滚动
2. **简单易用**：API 设计清晰，上手快速
3. **高度可定制**：支持自定义渲染、样式等
4. **现代化 UI**：渐变背景、动画效果、响应式设计

## 📝 技术栈

- React 18
- Webpack 5
- Babel
- CSS3

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC
