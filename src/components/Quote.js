import React, { useState, useEffect } from 'react';

const quotes = [
  { text: "只有运动才可以除去各种各样的疑虑。", author: "歌德" },
  { text: "磨练肌胳，防病御症。", author: "姜子牙" },
  { text: "世界上没有比结实的肌肉和新鲜的皮肤更漂亮的衣服。", author: "马雅可夫斯基" },
  { text: "有时你必须知道你正在做什么。这些年来，我已经给了自己1000个理由继续跑步，但始终还是会回到最初的地方。这最终归于自我满足和成就感。", author: "史蒂夫·普利方坦" },
  { text: "跑步给我掌控生命的感觉。我喜欢跑步带给我的健康，也喜欢跑步是有一个明确的开始和结束的事实。我给自己制定目标，然后去实现目标。一次开心的跑步经历会让你经历到神圣！", author: "南希·格斯坦" },
  { text: "我超越了昨天的自己，哪怕只是那么一丁点儿，才更为重要。在长跑中，如果说有什么必须战胜的对手，那就是过去的自己。", author: "村上春树" },
  { text: "忙就中断跑步的话，我一辈子都无法跑步。坚持跑步的理由不过一丝半点，中断跑步的理由却足够装满一辆大型载重卡车。", author: "村上春树" },
  { text: "我从跑步中获得的最让我受益的一点感受是，它让我对自己的身体满怀尊重。我觉得认识到这一点，对所有人都很重要。", author: "村上春树" }
];

const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  
  // 随机切换名言
  useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[index]);
    
    // 每60秒切换一次
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="quote-area">
      <div className="quote-text">"{currentQuote.text}"</div>
      <div className="quote-author">— {currentQuote.author}</div>
    </div>
  );
};

export default Quote;