// 示例数据文件，用于在没有真实数据时提供默认数据

// 示例跑步数据生成函数
export const getSampleData = () => {
    return [
      // 1月数据 - 新年假期和寒冷天气，较少跑步(4次)
      {
        month: 0, day: 1,
        distance: 5,
        pace: 6.0,
        heartRate: 130,
        year: 2025,
        title: "2025-01-01",
        runningNote: "新年第一跑，感觉不错！"
      },
      {
        month: 0, day: 9,
        distance: 3.5,
        pace: 5.2,
        heartRate: 142,
        year: 2025,
        title: "2025-01-09",
        runningNote: "间歇训练，强度较大"
      },
      {
        month: 0, day: 21,
        distance: 6.5,
        pace: 5.9,
        heartRate: 137,
        year: 2025,
        title: "2025-01-21",
        runningNote: "傍晚跑步，天气微冷"
      },
      {
        month: 0, day: 28,
        distance: 8.3,
        pace: 6.1,
        heartRate: 133,
        year: 2025,
        title: "2025-01-28",
        runningNote: "月末冲刺，状态良好"
      },
      
      // 2月数据 - 春节假期，较少跑步(3次)
      {
        month: 1, day: 3,
        distance: 4.5,
        pace: 5.7,
        heartRate: 138,
        year: 2025,
        title: "2025-02-03",
        runningNote: "短距离快跑，提升速度"
      },
      {
        month: 1, day: 14,
        distance: 10,
        pace: 5.5,
        heartRate: 140,
        year: 2025,
        title: "2025-02-14",
        runningNote: "情人节特别跑，和爱人一起！"
      },
      {
        month: 1, day: 28,
        distance: 7.8,
        pace: 6.0,
        heartRate: 134,
        year: 2025,
        title: "2025-02-28",
        runningNote: "二月最后一跑，月总里程达成"
      },
      
      // 3月数据 - 天气转暖，开始增加跑步频率(5次)
      {
        month: 2, day: 2,
        distance: 6.2,
        pace: 5.9,
        heartRate: 135,
        year: 2025,
        title: "2025-03-02",
        runningNote: "三月第一跑，春天的气息"
      },
      {
        month: 2, day: 7,
        distance: 11.0,
        pace: 6.1,
        heartRate: 138,
        year: 2025,
        title: "2025-03-07",
        runningNote: "挑战长距离，节奏均匀"
      },
      {
        month: 2, day: 12,
        distance: 4.8,
        pace: 5.3,
        heartRate: 144,
        year: 2025,
        title: "2025-03-12",
        runningNote: "午休后短跑，精力充沛"
      },
      {
        month: 2, day: 20,
        distance: 8,
        pace: 6.5,
        heartRate: 135,
        year: 2025,
        title: "2025-03-20",
        runningNote: "春天的第一场长跑，天气很好！"
      },
      {
        month: 2, day: 31,
        distance: 9.5,
        pace: 6.0,
        heartRate: 137,
        year: 2025,
        title: "2025-03-31",
        runningNote: "三月收尾，完成月度计划"
      },
      
      // 4月数据 - 春季跑步高峰期(8次)
      {
        month: 3, day: 1,
        distance: 7.3,
        pace: 5.7,
        heartRate: 140,
        year: 2025,
        title: "2025-04-01",
        runningNote: "四月首日，活力满满"
      },
      {
        month: 3, day: 5,
        distance: 12,
        pace: 5.8,
        heartRate: 145,
        year: 2025,
        title: "2025-04-05",
        runningNote: "参加了一个小型马拉松，感觉很棒！"
      },
      {
        month: 3, day: 8,
        distance: 5.6,
        pace: 6.2,
        heartRate: 134,
        year: 2025,
        title: "2025-04-08",
        runningNote: "轻松慢跑，放松肌肉"
      },
      {
        month: 3, day: 10,
        distance: 6.4,
        pace: 6.1,
        heartRate: 136,
        year: 2025,
        title: "2025-04-10",
        runningNote: "恢复训练，放松肌肉"
      },
      {
        month: 3, day: 15,
        distance: 8.8,
        pace: 5.9,
        heartRate: 138,
        year: 2025,
        title: "2025-04-15",
        runningNote: "晴朗天气，享受户外时光"
      },
      {
        month: 3, day: 18,
        distance: 10.2,
        pace: 6.0,
        heartRate: 140,
        year: 2025,
        title: "2025-04-18",
        runningNote: "持续推进训练计划，状态良好"
      },
      {
        month: 3, day: 21,
        distance: 13.5,
        pace: 6.2,
        heartRate: 142,
        year: 2025,
        title: "2025-04-21",
        runningNote: "挑战自我，突破极限"
      },
      {
        month: 3, day: 27,
        distance: 5.3,
        pace: 5.5,
        heartRate: 143,
        year: 2025,
        title: "2025-04-27",
        runningNote: "速度训练，提升配速"
      },
      
      // 5月数据 - 春季高峰延续(7次)
      {
        month: 4, day: 2,
        distance: 9.7,
        pace: 6.0,
        heartRate: 137,
        year: 2025,
        title: "2025-05-02",
        runningNote: "五一假期，路上人少"
      },
      {
        month: 4, day: 5,
        distance: 7.5,
        pace: 5.9,
        heartRate: 136,
        year: 2025,
        title: "2025-05-05",
        runningNote: "清晨跑步，空气清新"
      },
      {
        month: 4, day: 8,
        distance: 7.2,
        pace: 5.8,
        heartRate: 139,
        year: 2025,
        title: "2025-05-08",
        runningNote: "轻松节奏，调整呼吸"
      },
      {
        month: 4, day: 15,
        distance: 6,
        pace: 7.0,
        heartRate: 125,
        year: 2025,
        title: "2025-05-15",
        runningNote: "轻松跑，享受春日的阳光"
      },
      {
        month: 4, day: 19,
        distance: 11.2,
        pace: 6.3,
        heartRate: 135,
        year: 2025,
        title: "2025-05-19",
        runningNote: "周末长跑，尝试新路线"
      },
      {
        month: 4, day: 24,
        distance: 5.8,
        pace: 5.6,
        heartRate: 141,
        year: 2025,
        title: "2025-05-24",
        runningNote: "配速训练，保持节奏"
      },
      {
        month: 4, day: 30,
        distance: 8.5,
        pace: 6.1,
        heartRate: 136,
        year: 2025,
        title: "2025-05-30",
        runningNote: "五月最后一天，圆满结束"
      },
  
      // 6月数据 - 天气开始炎热，次数减少(5次)
      {
        month: 5, day: 3,
        distance: 9.3,
        pace: 6.2,
        heartRate: 138,
        year: 2025,
        title: "2025-06-03",
        runningNote: "夏季开始，早晨凉爽"
      },
      {
        month: 5, day: 8,
        distance: 6.7,
        pace: 5.7,
        heartRate: 142,
        year: 2025,
        title: "2025-06-08",
        runningNote: "加强训练，提高强度"
      },
      {
        month: 5, day: 12,
        distance: 14.0,
        pace: 6.4,
        heartRate: 139,
        year: 2025,
        title: "2025-06-12",
        runningNote: "挑战半马距离，表现不错"
      },
      {
        month: 5, day: 18,
        distance: 5.2,
        pace: 5.4,
        heartRate: 144,
        year: 2025,
        title: "2025-06-18",
        runningNote: "短距离速度训练，突破个人记录"
      },
      {
        month: 5, day: 29,
        distance: 10.5,
        pace: 6.3,
        heartRate: 136,
        year: 2025,
        title: "2025-06-29",
        runningNote: "六月收官之作，状态稳定"
      },
  
      // 7月数据 - 夏季最热月份，次数最少(3次)
      {
        month: 6, day: 2,
        distance: 6.3,
        pace: 6.1,
        heartRate: 138,
        year: 2025,
        title: "2025-07-02",
        runningNote: "七月伊始，天气炎热"
      },
      {
        month: 6, day: 13,
        distance: 4.8,
        pace: 5.3,
        heartRate: 146,
        year: 2025,
        title: "2025-07-13",
        runningNote: "室内跑步机训练，外面太热了"
      },
      {
        month: 6, day: 25,
        distance: 7.4,
        pace: 5.9,
        heartRate: 141,
        year: 2025,
        title: "2025-07-25",
        runningNote: "夏季特训，坚持不懈"
      },
      
      // 8月数据 - 夏季依然炎热，次数少(4次)
      {
        month: 7, day: 3,
        distance: 5.4,
        pace: 6.2,
        heartRate: 142,
        year: 2025,
        title: "2025-08-03",
        runningNote: "盛夏跑步，选择了林荫道"
      },
      {
        month: 7, day: 12,
        distance: 7.5,
        pace: 5.8,
        heartRate: 147,
        year: 2025,
        title: "2025-08-12",
        runningNote: "黄昏跑步，天气微凉"
      },
      {
        month: 7, day: 17,
        distance: 15.0,
        pace: 6.5,
        heartRate: 143,
        year: 2025,
        title: "2025-08-17",
        runningNote: "周末长距离，为下月半马做准备"
      },
      {
        month: 7, day: 28,
        distance: 12.3,
        pace: 6.0,
        heartRate: 140,
        year: 2025,
        title: "2025-08-28",
        runningNote: "长跑调整，保持耐力"
      },
  
      // 9月数据 - 秋季开始，跑步开始增多(6次)
      {
        month: 8, day: 1,
        distance: 8.6,
        pace: 5.7,
        heartRate: 141,
        year: 2025,
        title: "2025-09-01",
        runningNote: "初秋清爽，心情愉快"
      },
      {
        month: 8, day: 5,
        distance: 21.1,
        pace: 6.3,
        heartRate: 145,
        year: 2025,
        title: "2025-09-05",
        runningNote: "参加城市半程马拉松，顺利完成！"
      },
      {
        month: 8, day: 10,
        distance: 4.5,
        pace: 6.8,
        heartRate: 130,
        year: 2025,
        title: "2025-09-10",
        runningNote: "半马后恢复跑，放松身体"
      },
      {
        month: 8, day: 16,
        distance: 7.9,
        pace: 5.8,
        heartRate: 138,
        year: 2025,
        title: "2025-09-16",
        runningNote: "中秋假期，月饼吃多了要多跑"
      },
      {
        month: 8, day: 20,
        distance: 10.5,
        pace: 5.5,
        heartRate: 142,
        year: 2025,
        title: "2025-09-20",
        runningNote: "新路线探索，发现了美丽的湖边小道"
      },
      {
        month: 8, day: 30,
        distance: 12.8,
        pace: 6.0,
        heartRate: 144,
        year: 2025,
        title: "2025-09-30",
        runningNote: "九月收官，月度目标完成"
      },
  
      // 10月数据 - 秋季黄金跑步季节(8次)
      {
        month: 9, day: 2,
        distance: 9.2,
        pace: 6.1,
        heartRate: 136,
        year: 2025,
        title: "2025-10-02",
        runningNote: "国庆假期，人流稀少的公园跑"
      },
      {
        month: 9, day: 5,
        distance: 8.4,
        pace: 5.9,
        heartRate: 138,
        year: 2025,
        title: "2025-10-05",
        runningNote: "国庆长假第四天，坚持跑步计划"
      },
      {
        month: 9, day: 7,
        distance: 15.5,
        pace: 6.4,
        heartRate: 142,
        year: 2025,
        title: "2025-10-07",
        runningNote: "长距离耐力训练，为年底马拉松做准备"
      },
      {
        month: 9, day: 10,
        distance: 8.0,
        pace: 6.1,
        heartRate: 139,
        year: 2025,
        title: "2025-10-10",
        runningNote: "假期后恢复跑，保持状态"
      },
      {
        month: 9, day: 13,
        distance: 6.7,
        pace: 5.6,
        heartRate: 145,
        year: 2025,
        title: "2025-10-13",
        runningNote: "配速训练，感觉非常好"
      },
      {
        month: 9, day: 18,
        distance: 13.2,
        pace: 5.7,
        heartRate: 143,
        year: 2025,
        title: "2025-10-18",
        runningNote: "秋日长跑，树叶变色，景色宜人"
      },
      {
        month: 9, day: 23,
        distance: 7.5,
        pace: 5.5,
        heartRate: 147,
        year: 2025,
        title: "2025-10-23",
        runningNote: "阴天跑步，气温适宜，跑出好成绩"
      },
      {
        month: 9, day: 28,
        distance: 18.6,
        pace: 6.2,
        heartRate: 141,
        year: 2025,
        title: "2025-10-28",
        runningNote: "马拉松训练计划进行中，距离新突破"
      },
  
      // 11月数据 - 秋冬交替，跑步次数保持较高(7次)
      {
        month: 10, day: 2,
        distance: 8.4,
        pace: 6.0,
        heartRate: 139,
        year: 2025,
        title: "2025-11-02",
        runningNote: "初冬跑步，增加了保暖装备"
      },
      {
        month: 10, day: 6,
        distance: 12.3,
        pace: 6.2,
        heartRate: 136,
        year: 2025,
        title: "2025-11-06",
        runningNote: "秋冬交替，风大但跑起来很舒服"
      },
      {
        month: 10, day: 9,
        distance: 15.5,
        pace: 6.3,
        heartRate: 140,
        year: 2025,
        title: "2025-11-09",
        runningNote: "大型训练跑，为赛事蓄力"
      },
      {
        month: 10, day: 11,
        distance: 25.0,
        pace: 6.5,
        heartRate: 148,
        year: 2025,
        title: "2025-11-11",
        runningNote: "完成了25公里的长跑，马拉松前的最长训练"
      },
      {
        month: 10, day: 16,
        distance: 5.3,
        pace: 6.1,
        heartRate: 132,
        year: 2025,
        title: "2025-11-16",
        runningNote: "轻松恢复跑，为大赛节省体力"
      },
      {
        month: 10, day: 20,
        distance: 42.195,
        pace: 6.3,
        heartRate: 152,
        year: 2025,
        title: "2025-11-20",
        runningNote: "完成人生第一个全程马拉松！虽然辛苦但非常满足"
      },
      {
        month: 10, day: 30,
        distance: 6.8,
        pace: 6.5,
        heartRate: 130,
        year: 2025,
        title: "2025-11-30",
        runningNote: "逐渐恢复正常训练，降低强度"
      },
  
      // 12月数据 - 天气转冷，跑步减少，有圣诞节(5次)
      {
        month: 11, day: 3,
        distance: 8.2,
        pace: 6.3,
        heartRate: 135,
        year: 2025,
        title: "2025-12-03",
        runningNote: "冬季跑步，穿着厚外套但还是很舒适"
      },
      {
        month: 11, day: 8,
        distance: 10.5,
        pace: 6.0,
        heartRate: 138,
        year: 2025,
        title: "2025-12-08",
        runningNote: "寒冷天气中的长跑，热身很重要"
      },
      {
        month: 11, day: 18,
        distance: 9.7,
        pace: 6.2,
        heartRate: 137,
        year: 2025,
        title: "2025-12-18",
        runningNote: "年底总结跑，回顾全年进步"
      },
      {
        month: 11, day: 23,
        distance: 12.0,
        pace: 6.1,
        heartRate: 139,
        year: 2025,
        title: "2025-12-23",
        runningNote: "圣诞假期，难得的休闲长跑"
      },
      {
        month: 11, day: 31,
        distance: 10.0,
        pace: 5.9,
        heartRate: 140,
        year: 2025,
        title: "2025-12-31",
        runningNote: "跨年夜跑步，以运动的方式迎接2026年"
      },
    ];
  };
  
  export default { getSampleData };