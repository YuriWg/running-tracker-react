// 数据处理工具，负责处理跑步数据

export const processRunningData = (pages) => {
    let runData = [];
    let totalDistance = 0;
    let runCount = 0;

    // 处理跑步数据
    pages.forEach(p => {
        const fileName = p.file.name;
        const dateMatch = fileName.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (!dateMatch) return;

        const [_, year, month, day] = dateMatch;

        // 提取跑步数据
        let distance = p.Distance_km || 0;
        let pace = 0;
        let heartRate = p.Heart_Rate_BPM || 0;
        let runningNote = p.running_note || "";

        if (p.Pace_per_km) {
            const paceMatch = String(p.Pace_per_km).match(/(\d+)'(\d+)"/);
            if (paceMatch) {
                const minutes = parseInt(paceMatch[1]);
                const seconds = parseInt(paceMatch[2]);
                pace = minutes + (seconds / 60);
            }
        }

        // 确保有跑步数据
        if (p.running === true || distance > 0) {
            if (distance === 0 && p.running === true) {
                distance = 5; // 默认5公里
            }

            if (distance > 0) {
                const item = {
                    month: parseInt(month) - 1,
                    day: parseInt(day),
                    distance: distance,
                    pace: pace || 0,
                    heartRate: heartRate || 0,
                    year: parseInt(year),
                    title: fileName,
                    runningNote: runningNote
                };

                const currentYear = new Date().getFullYear();
                if (item.year === currentYear) {
                    runData.push(item);
                    totalDistance += distance;
                    runCount++;
                }
            }
        }
    });

    return { runData, totalDistance, runCount };
};