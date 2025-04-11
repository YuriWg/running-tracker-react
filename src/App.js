import React from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import Calendar from './components/Calendar';
import StatsPanel from './components/StatsPanel';
import Title from './components/Title';
import Quote from './components/Quote';
import ExportButton from './components/ExportButton';
import Legend from './components/Legend'; // 导入图例组件

function App() {
  return (
    <AppProvider>
      <div className="App">
        <div className="main-container">
          <ExportButton />
          
          <Title 
            mainTitle="2025年跑步追踪"
            subTitle="RUNNING TRACKER"
          />
          
          <Quote />
          
          <StatsPanel />
          
          <Calendar />
          
          <Legend /> {/* 添加图例组件 */}
        </div>
      </div>
    </AppProvider>
  );
}

export default App;