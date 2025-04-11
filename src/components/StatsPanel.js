import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './StatsPanel.css';
import { formatPace } from '../utils/formatters';

const StatsPanel = () => {
  const { runData, totalDistance, runCount, isLoading } = useContext(AppContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // 计算月度统计数据
  const calculateMonthlyStats = () => {
    const monthlyStats = [];
    
    // 初始化每个月的统计数据
    for (let i = 0; i < 12; i++) {
      monthlyStats[i] = {
        days: 0,
        distance: 0,
        avgPace: 0,
        totalPace: 0,
        avgHeartRate: 0,
        totalHeartRate: 0,
        paceCount: 0
      };
    }
    
    // 累计各月数据
    runData.forEach(run => {
      const month = run.month;
      if (month >= 0 && month < 12) {
        monthlyStats[month].days += 1;
        monthlyStats[month].distance += run.distance;
        
        if (run.pace > 0) {
          monthlyStats[month].totalPace += run.pace;
          monthlyStats[month].paceCount += 1;
        }
        
        if (run.heartRate > 0) {
          monthlyStats[month].totalHeartRate += run.heartRate;
        }
      }
    });
    
    // 计算平均值
    for (let i = 0; i < 12; i++) {
      if (monthlyStats[i].days > 0) {
        if (monthlyStats[i].paceCount > 0) {
          monthlyStats[i].avgPace = monthlyStats[i].totalPace / monthlyStats[i].paceCount;
        }
        
        if (monthlyStats[i].totalHeartRate > 0) {
          monthlyStats[i].avgHeartRate = Math.round(monthlyStats[i].totalHeartRate / monthlyStats[i].days);
        }
      }
    }
    
    return monthlyStats;
  };

  // 计算合计数据
  const calculateTotalStats = (monthlyStats) => {
    const totalStats = {
      days: 0,
      distance: 0,
      totalPace: 0,
      paceCount: 0,
      avgPace: 0
    };
    
    monthlyStats.forEach(stat => {
      totalStats.days += stat.days;
      totalStats.distance += stat.distance;
      if (stat.avgPace > 0 && stat.paceCount > 0) {
        totalStats.totalPace += stat.totalPace;
        totalStats.paceCount += stat.paceCount;
      }
    });
    
    if (totalStats.paceCount > 0) {
      totalStats.avgPace = totalStats.totalPace / totalStats.paceCount;
    }
    
    return totalStats;
  };
  
  if (isLoading) {
    return <div className="stats-panel-loading">加载中...</div>;
  }
  
  const monthlyStats = calculateMonthlyStats();
  const totalStats = calculateTotalStats(monthlyStats);
  const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  
  return (
    <div className="stats-panel">
      <div className="stats-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h3 className="stats-title">月度统计</h3>
        <div className="toggle-icon">{isCollapsed ? '▶' : '▼'}</div>
      </div>
      
      <div className={`stats-content ${isCollapsed ? 'collapsed' : ''}`}>
        <table className="stats-table">
          <thead>
            <tr>
              <th className="metrics-label"></th>
              {months.map((month, idx) => (
                <th key={idx} className="month-label">{month}</th>
              ))}
              <th className="total-label">全年</th>
            </tr>
          </thead>
          <tbody>
            {/* 天数行 */}
            <tr>
              <td className="metrics-label">天数</td>
              {monthlyStats.map((stat, idx) => (
                <td key={idx} className={`stat-value ${stat.days > 0 ? 'has-data' : ''}`}>
                  {stat.days > 0 ? stat.days : '-'}
                </td>
              ))}
              <td className="total-value">{totalStats.days}</td>
            </tr>
            
            {/* 距离行 */}
            <tr>
              <td className="metrics-label">距离-km</td>
              {monthlyStats.map((stat, idx) => (
                <td key={idx} className={`stat-value ${stat.distance > 0 ? 'has-data' : ''}`}>
                  {stat.distance > 0 ? stat.distance.toFixed(1) : '-'}
                </td>
              ))}
              <td className="total-value">{totalStats.distance.toFixed(1)}</td>
            </tr>
            
            {/* 配速行 */}
            <tr>
              <td className="metrics-label">配速/km</td>
              {monthlyStats.map((stat, idx) => (
                <td key={idx} className={`stat-value ${stat.avgPace > 0 ? 'has-data' : ''}`}>
                  {stat.avgPace > 0 ? formatPace(stat.avgPace) : '-'}
                </td>
              ))}
              <td className="total-value">
                {totalStats.avgPace > 0 ? formatPace(totalStats.avgPace) : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsPanel;