import React, { useRef, useEffect, useContext, useState } from 'react';
import * as d3 from 'd3';
import { AppContext } from '../context/AppContext';
import './Calendar.css';

// 导入格式化工具
import { formatPace } from '../utils/formatters';

const Calendar = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const { runData, isLoading } = useContext(AppContext);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // 添加窗口大小变化监听
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.max(rect.width * 0.9, 400) // 根据宽度调整高度，但保持最小高度
        });
      }
    };
    
    // 初始调用一次获取当前尺寸
    handleResize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 清除监听器
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 更新SVG视图
  useEffect(() => {
    if (isLoading || !dimensions.width || !svgRef.current || !containerRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const { width, height } = dimensions;
    
    // 设置SVG尺寸
    svg.attr("width", width)
       .attr("height", height)
       .attr("viewBox", `0 0 ${width} ${height}`)
       .attr("preserveAspectRatio", "xMidYMid meet");
    
    // 背景
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#FDFAF6")
      .attr("rx", 10);
    
    // 布局参数 - 使用相对尺寸而非固定尺寸
    const layout = {
      leftMargin: width * 0.08,
      topMargin: 65,
      rightMargin: width * 0.08,
      bottomMargin: 30
    };
    
    const usableWidth = width - layout.leftMargin - layout.rightMargin;
    const monthWidth = usableWidth / 12;
    // 更改计算方式以确保足够空间
    const daySpacing = (height - layout.topMargin - layout.bottomMargin) / 32;
    
    // 月份标签
    const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    for (let i = 0; i < 12; i++) {
      // 月份背景
      svg.append("rect")
        .attr("x", layout.leftMargin + i * monthWidth + 2)
        .attr("y", 8)
        .attr("width", monthWidth - 4)
        .attr("height", 30)
        .attr("fill", d3.rgb("#FDFAF6").darker(0.05))
        .attr("opacity", 0.2)
        .attr("rx", 15);
        
      // 月份文字 - 响应式字体大小
      svg.append("text")
        .attr("x", layout.leftMargin + i * monthWidth + monthWidth / 2)
        .attr("y", 28)
        .attr("text-anchor", "middle")
        .attr("font-size", Math.min(18, Math.max(12, width / 50))) // 响应式字体大小
        .attr("font-weight", "bold")
        .attr("fill", "#896B54")
        .text(months[i]);
    }
    
    // 网格线
    const gridGroup = svg.append("g").attr("class", "grid");
    
    // 垂直网格线（月份分隔线）
    for (let i = 0; i <= 12; i++) {
      gridGroup.append("line")
        .attr("x1", layout.leftMargin + i * monthWidth)
        .attr("y1", layout.topMargin)
        .attr("x2", layout.leftMargin + i * monthWidth)
        .attr("y2", height - layout.bottomMargin)
        .style("stroke", i % 3 === 0 ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)")
        .style("stroke-width", i % 3 === 0 ? 1.5 : 0.5);
    }
    
    // 水平网格线和日期标签
    for (let i = 0; i <= 31; i++) {
      const yPos = layout.topMargin + i * daySpacing;
      
      gridGroup.append("line")
        .attr("x1", layout.leftMargin - 5)
        .attr("y1", yPos)
        .attr("x2", width - layout.rightMargin)
        .attr("y2", yPos)
        .style("stroke", i % 5 === 0 ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.03)")
        .style("stroke-width", i % 5 === 0 ? 1.5 : 0.5);
      
      if (i > 0 && i % 5 === 0) {
        gridGroup.append("text")
          .attr("x", layout.leftMargin - 20)
          .attr("y", yPos + 5)
          .attr("text-anchor", "end")
          .attr("font-size", Math.min(18, Math.max(12, width / 50))) // 响应式字体大小
          .attr("fill", "#896B54")
          .text(i);
      }
    }
    
    // 绘制跑步数据点
    if (runData && runData.length > 0) {
      runData.forEach(run => {
        if (typeof run.month !== 'number' || typeof run.day !== 'number') {
          console.warn("跳过无效数据点:", run);
          return;
        }
        
        // 确保月份和日期在有效范围内
        if (run.month < 0 || run.month >= 12 || run.day <= 0 || run.day > 31) {
          console.warn("数据点超出有效范围:", run);
          return;
        }
        
        const x = layout.leftMargin + run.month * monthWidth + monthWidth / 2;
        const y = layout.topMargin + run.day * daySpacing;
        
        // 检查计算的坐标是否有效
        if (isNaN(x) || isNaN(y)) {
          console.error("坐标计算错误:", { run, x, y });
          return;
        }
        
        // 计算图标缩放比例 - 根据容器宽度自适应
        const iconScale = Math.min(1.2, Math.max(0.8, width / 1000));
        
        const runGroup = svg.append("g")
          .attr("class", "run-icon")
          .attr("transform", `translate(${x}, ${y}) scale(${iconScale})`)
          .attr("cursor", "pointer");
        
        // 绘制跑步图标
        drawRunIcon(runGroup, run);
        
        // 添加事件处理
        runGroup.on("mouseover", function(event) {
          // 显示提示框
          const tooltip = d3.select(".tooltip");
          if (tooltip.empty()) {
            d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("position", "absolute")
              .style("visibility", "hidden")
              .style("background", "white")
              .style("padding", "15px")
              .style("border-radius", "8px")
              .style("box-shadow", "0 4px 20px rgba(0,0,0,0.08)")
              .style("z-index", "999")
              .style("max-width", "280px");
          }
          
          // 位置和内容
          const containerRect = containerRef.current.getBoundingClientRect();
          const tooltipContent = `
            <div style="font-weight:600; color:#432818; font-size:14px; margin-bottom:8px;">
              ${run.title || `${run.year}-${(run.month+1).toString().padStart(2,'0')}-${run.day.toString().padStart(2,'0')}`}
            </div>
            <div>距离: ${run.distance.toFixed(1)} km</div>
            <div>配速: ${formatPace(run.pace)}/km</div>
            ${run.heartRate ? `<div>心率: ${run.heartRate} BPM</div>` : ''}
            ${run.runningNote ? `<div style="margin-top:6px; font-style:italic;">${run.runningNote}</div>` : ''}
          `;
          
          d3.select(".tooltip")
            .html(tooltipContent)
            .style("left", `${event.pageX + 15}px`)
            .style("top", `${event.pageY - 15}px`)
            .style("visibility", "visible");
        })
        .on("mouseout", function() {
          d3.select(".tooltip").style("visibility", "hidden");
        });
      });
    }
  }, [runData, isLoading, dimensions]);
  
  // 绘制跑步图标函数
  const drawRunIcon = (container, data) => {
    // 螺旋线参数
    const turns = 2 + Math.min(3, data.distance / 5);
    const spacing = 3.5;
    const baseRadius = 3.5;
    
    // 颜色选择
    let spiralColor;
    if (data.distance >= 10) spiralColor = "#FF9966"; // 长距离
    else if (data.distance > 5) spiralColor = "#FFD700"; // 中距离
    else spiralColor = "#87CEEB"; // 短距离
    
    // 创建渐变
    const gradientId = `spiral-gradient-${Math.random().toString(36).substring(2, 11)}`;
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
    
    // 创建一个包含所有螺旋线元素的组
    const spiralGroup = container.append("g")
      .attr("class", "spiral-group");
      
    // 静态完整螺旋线
    const points = d3.range(0, maxAngle, angleStep);
    const staticSpiral = spiralGroup.append("path")
      .datum(points)
      .attr("d", spiral)
      .attr("fill", "none")
      .attr("stroke", `url(#${gradientId})`)
      .attr("stroke-width", 2.5)
      .attr("stroke-linecap", "round");
      
    // 动画用路径（初始不可见）
    const animSpiral = spiralGroup.append("path")
      .attr("fill", "none")
      .attr("stroke", `url(#${gradientId})`)
      .attr("stroke-width", 2.5)
      .attr("stroke-linecap", "round")
      .style("opacity", 0);
    
    // 配速指示器
    let paceCircle = null;
    if (data.pace > 0) {
      const spiralMaxRadius = baseRadius + spacing * maxAngle / (2 * Math.PI);
      const circleRadius = 3.6;
      const distanceFactor = 1.3;
      const circleX = spiralMaxRadius * distanceFactor * (1/Math.sqrt(2));
      const circleY = -spiralMaxRadius * distanceFactor * (1/Math.sqrt(2));
      
      // 根据配速选择颜色
      let paceColor;
      if (data.pace < 5.5) paceColor = "#FF4500"; // 快配速
      else if (data.pace < 7) paceColor = "#FFD700"; // 中配速
      else paceColor = "#7FD8BE"; // 慢配速
      
      // 添加配速指示圆点
      paceCircle = container.append("circle")
        .attr("cx", circleX)
        .attr("cy", circleY)
        .attr("r", circleRadius)
        .attr("fill", paceColor)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.9);
    }
    
    // 动画状态变量 - 设为容器的属性以增加可访问性
    container._isAnimating = false;
    container._animationTimer = null;
    container._hoverState = false; // 新增：跟踪鼠标是否在图标上
    
    // 创建透明的较大热区，增加鼠标事件的稳定性
    const hitArea = container.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 15) // 较大的半径提供更好的交互区域
      .attr("fill", "transparent")
      .style("pointer-events", "all"); // 确保能捕获事件
    
    // 动画函数 - 提取出来以便复用
    function startAnimation() {
      // 如果已经在动画中，不再重复启动
      if (container._isAnimating) return;
      container._isAnimating = true;
      container._hoverState = true;
      
      // 清除任何存在的定时器
      if (container._animationTimer) {
        clearTimeout(container._animationTimer);
        container._animationTimer = null;
      }
      
      // 隐藏静态螺旋线
      staticSpiral.transition().duration(100).style("opacity", 0);
      
      // 暂时隐藏配速指示器
      if (paceCircle) paceCircle.transition().duration(100).style("opacity", 0);
      
      // 创建动态增长的螺旋线动画
      const numSteps = 20; // 动画步数
      let currentStep = 0;
      
      function animateSpiral() {
        if (!container._hoverState || currentStep >= numSteps) {
          // 动画完成或鼠标已离开，显示静态螺旋线
          staticSpiral.interrupt().style("opacity", 1);
          animSpiral.interrupt().style("opacity", 0);
          if (paceCircle) paceCircle.interrupt().style("opacity", 0.9);
          container._isAnimating = false;
          container._animationTimer = null;
          return;
        }
        
        // 增加当前步骤
        currentStep++;
        
        // 计算此步骤的螺旋线角度
        const currentAngle = (currentStep / numSteps) * maxAngle;
        const currentPoints = d3.range(0, currentAngle, angleStep);
        
        // 更新动画螺旋线
        animSpiral
          .datum(currentPoints)
          .attr("d", spiral)
          .style("opacity", 1);
        
        // 设置下一帧
        container._animationTimer = setTimeout(animateSpiral, 20);
      }
      
      // 启动动画
      animateSpiral();
    }
    
    // 结束动画函数
    function endAnimation() {
      container._hoverState = false; // 标记鼠标已离开
      
      // 添加延迟以避免鼠标短暂离开又返回时动画重启
      setTimeout(() => {
        if (!container._hoverState) {
          // 如果鼠标真的离开了(没有重新进入)
          if (container._animationTimer) {
            clearTimeout(container._animationTimer);
            container._animationTimer = null;
          }
          
          // 立即显示静态螺旋线
          staticSpiral.interrupt().style("opacity", 1);
          animSpiral.interrupt().style("opacity", 0);
          if (paceCircle) paceCircle.interrupt().style("opacity", 0.9);
          container._isAnimating = false;
        }
      }, 50); // 短暂延迟，避免鼠标在图标边缘快速移动时动画闪烁
    }
    
    // 使用容器和热区同时监听事件，增加稳定性
    container.on("mouseenter.animation", startAnimation);
    container.on("mouseleave.animation", endAnimation);
    hitArea.on("mouseenter.animation", startAnimation);
    hitArea.on("mouseleave.animation", endAnimation);
    
    // 防止事件传播导致问题
    container.on("mousemove", function(event) {
      event.stopPropagation();
      if (!container._isAnimating && container._hoverState) {
        // 如果鼠标在图标上但动画停止了，重新启动
        startAnimation();
      }
    });
  };

  return (
    <div ref={containerRef} className="calendar-container">
      {isLoading ? (
        <div className="calendar-loading">加载中...</div>
      ) : (
        <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg"></svg>
      )}
    </div>
  );
};

export default Calendar;