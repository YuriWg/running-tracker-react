import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Legend.css';

const Legend = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const svgRef = useRef(null);
  
  // 颜色定义
  const colors = {
    longRun: "#FF9966",   // 长距离
    mediumRun: "#FFD700", // 中距离
    shortRun: "#87CEEB",  // 短距离
    text: "#543A29",
    textSecondary: "#896B54",
    background: "#FDFAF6",
    border: "rgba(162, 139, 122, 0.15)"
  };
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    drawLegend();
  }, [isCollapsed]);
  
  // 绘制跑步图标
  const drawRunIcon = (container, data) => {
    // 螺旋线参数
    const turns = 2 + Math.min(3, data.distance / 5);
    const spacing = 3.5;
    const baseRadius = 3.5;
    const lineWidth = 2.5;
    
    // 颜色选择
    let spiralColor;
    if (data.distance >= 10) spiralColor = colors.longRun;
    else if (data.distance > 5) spiralColor = colors.mediumRun;
    else spiralColor = colors.shortRun;
    
    // 创建渐变
    const gradientId = "legendIconGradient";
    const defs = container.append("defs");
    const gradient = defs.append("radialGradient")
      .attr("id", gradientId)
      .attr("cx", "0")
      .attr("cy", "0")
      .attr("r", "100%")
      .attr("fx", "0")
      .attr("fy", "0")
      .attr("gradientUnits", "userSpaceOnUse");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", spiralColor)
      .attr("stop-opacity", 0.9);
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", spiralColor)
      .attr("stop-opacity", 0.5);
    
    // 最大角度
    const maxAngle = turns * 2 * Math.PI;
    const angleStep = 0.1;
    
    // 创建螺旋线生成器
    const spiral = d3.lineRadial()
      .angle(d => d)
      .radius(d => baseRadius + spacing * d / (2 * Math.PI));
    
    // 创建点集合
    const points = d3.range(0, maxAngle, angleStep);
    
    // 绘制螺旋线
    container.append("path")
      .datum(points)
      .attr("d", spiral)
      .attr("fill", "none")
      .attr("stroke", `url(#${gradientId})`)
      .attr("stroke-width", lineWidth)
      .attr("stroke-linecap", "round");
      
    // 配速指示器
    if (data.pace > 0) {
      const spiralMaxRadius = baseRadius + spacing * maxAngle / (2 * Math.PI);
      const circleRadius = 3.6;
      const distanceFactor = 1.3;
      const circleX = spiralMaxRadius * distanceFactor * (1/Math.sqrt(2));
      const circleY = -spiralMaxRadius * distanceFactor * (1/Math.sqrt(2));
      
      // 根据配速选择颜色
      let paceColor;
      if (data.pace < 5.5) paceColor = "#FF4500";
      else if (data.pace < 7) paceColor = "#FFD700";
      else paceColor = "#7FD8BE";
      
      // 添加配速指示圆点
      container.append("circle")
        .attr("cx", circleX)
        .attr("cy", circleY)
        .attr("r", circleRadius)
        .attr("fill", paceColor)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("opacity", 0.9);
    }
  };
  
  // 绘制完整图例
  const drawLegend = () => {
    if (isCollapsed) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // 设置SVG尺寸
    const width = 360;
    const height = 150;
    svg.attr("width", width)
       .attr("height", height);
    
    // 绘制示例跑步图标
    const iconGroup = svg.append("g")
      .attr("transform", "translate(60, 65) scale(2.0)");
    
    drawRunIcon(iconGroup, {distance: 7, pace: 6.2});
    
    // 绘制指示箭头和文字标签
    // 配速箭头 - 修改为向下指向
    svg.append("path")
      .attr("d", "M90,35 L115,60") // 修改为右下45度
      .attr("stroke", colors.text)
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "3,2")
      .attr("fill", "none");
    
    svg.append("circle")
      .attr("cx", 115)
      .attr("cy", 60) // 调整位置
      .attr("r", 3)
      .attr("fill", colors.text);
    
    svg.append("text")
      .attr("x", 120)
      .attr("y", 65) // 调整位置
      .attr("font-size", 14)
      .attr("fill", colors.text)
      .text("配速");
    
    // 距离箭头 - 保持水平
    svg.append("path")
        .attr("d", "M90,75 L115,100") // 修改为右下45度
        .attr("stroke", colors.text)
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "3,2")
        .attr("fill", "none");
    
    svg.append("circle")
      .attr("cx", 115)
      .attr("cy", 100) // 调整位置
      .attr("r", 3)
      .attr("fill", colors.text);
    
    svg.append("text")
      .attr("x", 120)
      .attr("y", 105) // 调整位置
      .attr("font-size", 14)
      .attr("fill", colors.text)
      .text("距离");
    
    // 绘制颜色图例
    const colorValues = [colors.longRun, colors.mediumRun, colors.shortRun];
    const colorLabels = [
      ["> 10km", "5-10km", "< 5km"], 
      ["< 5'30\"", "5'30\"-7'00\"", "> 7'00\""]
    ];
    
    // 距离颜色图例
    for (let i = 0; i < 3; i++) {
      svg.append("rect")
        .attr("x", 180 + i * 60)
        .attr("y", 35)
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", colorValues[i])
        .attr("rx", 3);
      
      svg.append("text")
        .attr("x", 180 + i * 60 + 7)
        .attr("y", 65)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", colors.text)
        .text(colorLabels[0][i]);
    }
    
    // 配速颜色图例
    for (let i = 0; i < 3; i++) {
      svg.append("rect")
        .attr("x", 180 + i * 60)
        .attr("y", 80)
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", i === 0 ? "#FF4500" : i === 1 ? "#FFD700" : "#7FD8BE")
        .attr("rx", 3);
      
      svg.append("text")
        .attr("x", 180 + i * 60 + 7)
        .attr("y", 110)
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("fill", colors.text)
        .text(colorLabels[1][i]);
    }
  };

  // 收起状态的渲染
  if (isCollapsed) {
    return (
      <div className="legend-collapsed">
        <button 
          className="legend-collapsed-button"
          onClick={() => setIsCollapsed(false)}
          title="展开图例"
          aria-label="展开图例"
        >
          <span>i</span>
        </button>
      </div>
    );
  }
  
  // 展开状态的渲染
  return (
    <div className="legend-panel">
      <div className="legend-header">
        <h3 className="legend-title">图例说明</h3>
        <button 
          className="legend-toggle-button"
          onClick={() => setIsCollapsed(true)}
          title="收起图例"
          aria-label="收起图例"
        >
          <span>×</span>
        </button>
      </div>
      <div className="legend-content">
        <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg"></svg>
      </div>
    </div>
  );
};

export default Legend;