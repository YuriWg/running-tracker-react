import React from 'react';
import html2canvas from 'html2canvas';

const ExportButton = () => {
  const exportVisualization = () => {
    showToast("正在生成图片...", "loading");
    
    setTimeout(() => {
      const mainContainer = document.querySelector('.main-container');
      
      html2canvas(mainContainer, {
        scale: 2,
        backgroundColor: '#FDFAF6',
        logging: false,
        allowTaint: true,
        useCORS: true,
      }).then(canvas => {
        hideToast();
        
        const link = document.createElement('a');
        link.download = `跑步追踪_${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showToast("图片已成功导出！", "success");
      }).catch(error => {
        console.error("导出图片错误:", error);
        hideToast();
        showToast("导出失败，请重试", "error");
      });
    }, 100);
  };

  const showToast = (message, type = "info") => {
    let toast = document.querySelector('.export-toast');
    if (toast) toast.remove();
    
    toast = document.createElement('div');
    toast.className = 'export-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = type === "error" ? "#FF5252" : 
                             type === "success" ? "#4CAF50" : 
                             type === "loading" ? "#2196F3" : "#333";
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '14px';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    
    let content = "";
    if (type === "loading") {
      content = `<span style="display:inline-block;width:12px;height:12px;border:2px solid white;border-radius:50%;border-top-color:transparent;margin-right:8px;animation:spin 1s linear infinite;"></span>`;
    } else if (type === "success") {
      content = `<span style="margin-right:8px;">✓</span>`;
    } else if (type === "error") {
      content = `<span style="margin-right:8px;">✗</span>`;
    }
    
    toast.innerHTML = content + message;
    document.body.appendChild(toast);
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => toast.style.opacity = '1', 10);
    
    if (type !== "loading") {
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
    
    return toast;
  };

  const hideToast = () => {
    const toast = document.querySelector('.export-toast');
    if (toast) {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }
  };

  return (
    <div className="export-button" onClick={exportVisualization}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    </div>
  );
};

export default ExportButton;