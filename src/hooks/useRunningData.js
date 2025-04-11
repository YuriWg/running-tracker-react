// src/hooks/useRunningData.js

import { useState, useEffect } from 'react';
import { getSampleData } from '../data/sampleData';

// 默认导出和命名导出同时提供
function useRunningData() {
  const [runData, setRunData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 在实际应用中，这里可能是API调用
        const data = await getSampleData();
        setRunData(data);
      } catch (error) {
        console.error("加载跑步数据失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { runData, isLoading };
}

export default useRunningData;
export { useRunningData };