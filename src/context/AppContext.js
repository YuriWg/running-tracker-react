import React, { createContext, useState, useEffect } from 'react';
import { getSampleData } from '../data/sampleData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [runData, setRunData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // 获取示例数据
        const data = getSampleData();
        
        // 验证数据格式
        const validData = data.filter(item => (
          item && 
          typeof item.month === 'number' &&
          typeof item.day === 'number' &&
          typeof item.distance === 'number'
        ));
        
        if (validData.length === 0) {
          console.error("没有有效的跑步数据");
        }
        
        setRunData(validData);
      } catch (error) {
        console.error("加载跑步数据失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{
      runData,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};