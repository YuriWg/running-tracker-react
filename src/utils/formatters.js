// src/utils/formatters.js

export const formatDistance = (distance) => {
    return `${distance.toFixed(1)} km`;
};

// 格式化配速显示
export function formatPace(pace) {
  if (!pace) return "未记录";
  const min = Math.floor(pace);
  const sec = Math.round((pace - min) * 60);
  return `${min}'${sec.toString().padStart(2, '0')}"`;
}

// 获取心率区间详情
export function getHeartRateZoneDetail(hr) {
  if (!hr) return {
    zone: "未记录",
    effect: "无法评估训练效果"
  };
  
  if (hr < 130) return {
    zone: "放松区间",
    effect: "基础耐力训练，适合恢复跑和长距离慢跑，提升脂肪燃烧效率，建立跑步基础"
  };
  
  if (hr < 150) return {
    zone: "有氧区间",
    effect: "改善心肺功能，提高有氧能力，是最佳的耐力训练区间，可以持续较长时间"
  };
  
  if (hr < 170) return {
    zone: "力量区间",
    effect: "提高乳酸耐受能力，增强肌肉力量，适合间歇训练，提升速度和爆发力"
  };
  
  return {
    zone: "极限区间",
    effect: "接近最大心率，提升无氧能力和速度极限，只能维持短时间，需要充分热身和谨慎使用"
  };
}

// 获取心率颜色
export function getHeartRateColor(hr) {
  if (!hr) return '#87CEEB'; // shortRun
  if (hr < 130) return '#7FD8BE'; // heartRate.low
  if (hr < 150) return '#FFD700'; // heartRate.medium
  return '#FF9966'; // heartRate.high
}

// 生成诗意距离描述
export function getPoeticDistanceDescription(distance) {
  const references = {
    marathon: 42.195,     // 马拉松长度
    everest: 8.848,       // 珠穆朗玛峰高度
    greatWall: 21196,     // 长城长度
    earthCircumference: 40075 // 地球周长
  };
  
  if (distance > 0) {
    if (distance < references.everest) {
      const everestPercent = (distance / references.everest * 100).toFixed(1);
      return `已跑过珠穆朗玛峰高度的${everestPercent}%, 向着云端攀登`;
    } 
    else if (distance < references.marathon * 3) {
      const marathons = (distance / references.marathon).toFixed(1);
      return `完成了${marathons}个马拉松的距离，奔跑的脚步从未停歇`;
    }
    else if (distance < references.greatWall) {
      const moonDistance = (distance / 384400 * 100).toFixed(2);
      return `已跑了月球距离的${moonDistance}%, 奔向星辰大海`;
    }
    else if (distance < references.earthCircumference) {
      const earthPercent = (distance / references.earthCircumference * 100).toFixed(1);
      return `已环绕地球${earthPercent}%, 追逐着晨光与暮色`;
    }
    else {
      const earthLaps = (distance / references.earthCircumference).toFixed(2);
      return `环绕地球${earthLaps}圈，脚步丈量了整个星球`;
    }
  }
  return '';
}

// 格式化心率显示
export const formatHeartRate = (heartRate) => {
    return `${heartRate} BPM`;
};

export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};