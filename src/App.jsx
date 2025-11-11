import React, { useState, useMemo } from 'react';
import VirtualTable from './VirtualTable';
import './App.css';

// 生成大量测试数据
const generateData = (count) => {
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];
  const departments = ['技术部', '产品部', '市场部', '运营部', '人事部', '财务部'];
  const statuses = ['在职', '离职', '休假'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: names[Math.floor(Math.random() * names.length)] + (index + 1),
    age: 20 + Math.floor(Math.random() * 40),
    department: departments[Math.floor(Math.random() * departments.length)],
    salary: (5000 + Math.floor(Math.random() * 20000)).toFixed(2),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    email: `user${index + 1}@example.com`,
    phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
    joinDate: new Date(2015 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('zh-CN')
  }));
};

const App = () => {
  const [dataCount, setDataCount] = useState(10000);
  const [rowHeight, setRowHeight] = useState(50);
  const [containerHeight, setContainerHeight] = useState(600);

  // 生成数据
  const tableData = useMemo(() => generateData(dataCount), [dataCount]);

  // 定义列
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '8%',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '10%',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: '8%',
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: '12%',
    },
    {
      title: '工资',
      dataIndex: 'salary',
      width: '12%',
      render: (value) => `¥${value}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '10%',
      render: (value) => (
        <span style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          backgroundColor: value === '在职' ? '#d4edda' : value === '离职' ? '#f8d7da' : '#fff3cd',
          color: value === '在职' ? '#155724' : value === '离职' ? '#721c24' : '#856404',
        }}>
          {value}
        </span>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: '15%',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: '12%',
    },
    {
      title: '入职日期',
      dataIndex: 'joinDate',
      width: '13%',
    },
  ];

  return (
    <div className="app">
      <div className="app-header">
        <h1>🚀 React 虚拟列表表格</h1>
        <p>高性能虚拟滚动，轻松处理海量数据</p>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>
            数据量: 
            <input 
              type="number" 
              value={dataCount} 
              onChange={(e) => setDataCount(Number(e.target.value))}
              min="100"
              max="1000000"
            />
          </label>
        </div>
        
        <div className="control-group">
          <label>
            行高: 
            <input 
              type="number" 
              value={rowHeight} 
              onChange={(e) => setRowHeight(Number(e.target.value))}
              min="30"
              max="100"
            />
            px
          </label>
        </div>
        
        <div className="control-group">
          <label>
            容器高度: 
            <input 
              type="number" 
              value={containerHeight} 
              onChange={(e) => setContainerHeight(Number(e.target.value))}
              min="300"
              max="1000"
            />
            px
          </label>
        </div>

        <button 
          className="refresh-btn"
          onClick={() => setDataCount(dataCount + 1)}
        >
          🔄 刷新数据
        </button>
      </div>

      <div className="table-wrapper">
        <VirtualTable 
          data={tableData}
          columns={columns}
          rowHeight={rowHeight}
          containerHeight={containerHeight}
          overscan={5}
        />
      </div>

      <div className="feature-list">
        <h3>✨ 功能特性</h3>
        <ul>
          <li>✅ 虚拟滚动：只渲染可见区域的数据，性能卓越</li>
          <li>✅ 大数据支持：轻松处理 10 万+ 行数据</li>
          <li>✅ 自定义渲染：支持自定义单元格渲染</li>
          <li>✅ 响应式设计：美观的现代化 UI</li>
          <li>✅ 灵活配置：可调节行高、容器高度等参数</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
