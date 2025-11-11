import React, { useState, useRef, useEffect, useMemo } from 'react';
import './VirtualTable.css';

const VirtualTable = ({ 
  data = [], 
  columns = [], 
  rowHeight = 50,
  containerHeight = 600,
  overscan = 5 
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // 计算可见区域
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const endIndex = Math.min(
      data.length - 1,
      Math.ceil((scrollTop + containerHeight) / rowHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, rowHeight, containerHeight, data.length, overscan]);

  // 处理滚动事件
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  // 总高度
  const totalHeight = data.length * rowHeight;

  // 可见的数据
  const visibleData = useMemo(() => {
    return data.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [data, visibleRange]);

  // 偏移量
  const offsetY = visibleRange.startIndex * rowHeight;

  return (
    <div className="virtual-table-container">
      <div className="table-header">
        <div className="table-row header-row">
          {columns.map((column, index) => (
            <div 
              key={index} 
              className="table-cell header-cell"
              style={{ width: column.width || `${100 / columns.length}%` }}
            >
              {column.title}
            </div>
          ))}
        </div>
      </div>
      
      <div 
        className="table-body"
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: containerHeight }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleData.map((row, rowIndex) => {
              const actualIndex = visibleRange.startIndex + rowIndex;
              return (
                <div 
                  key={actualIndex} 
                  className="table-row body-row"
                  style={{ height: rowHeight }}
                >
                  {columns.map((column, colIndex) => (
                    <div 
                      key={colIndex} 
                      className="table-cell body-cell"
                      style={{ width: column.width || `${100 / columns.length}%` }}
                    >
                      {column.render 
                        ? column.render(row[column.dataIndex], row, actualIndex)
                        : row[column.dataIndex]
                      }
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="table-info">
        显示 {visibleRange.startIndex + 1} - {visibleRange.endIndex + 1} / 共 {data.length} 条
      </div>
    </div>
  );
};

export default VirtualTable;
