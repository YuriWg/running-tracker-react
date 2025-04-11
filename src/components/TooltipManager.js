import React, { useState, useRef } from 'react';

const TooltipManager = ({ children }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    x: 0,
    y: 0
  });
  
  const tooltipRef = useRef(null);

  const showTooltip = (content, x, y) => {
    setTooltip({
      visible: true,
      content,
      x,
      y
    });
  };

  const hideTooltip = () => {
    setTooltip(prev => ({
      ...prev,
      visible: false
    }));
  };

  return (
    <div style={{ position: 'relative' }}>
      {typeof children === 'function' 
        ? children({ showTooltip, hideTooltip }) 
        : children}
      
      {tooltip.visible && (
        <div 
          ref={tooltipRef}
          style={{
            position: 'absolute',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            background: 'white',
            padding: '10px 15px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxWidth: '280px',
            fontSize: '14px'
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export { TooltipManager };
export default TooltipManager;

export const useTooltip = () => {
  const [tooltip, setTooltip] = useState(null);
  
  const showTooltip = (content, x, y) => {
    setTooltip({ content, x, y, visible: true });
  };
  
  const hideTooltip = () => {
    setTooltip(prev => prev ? { ...prev, visible: false } : null);
  };
  
  return { tooltip, showTooltip, hideTooltip };
};