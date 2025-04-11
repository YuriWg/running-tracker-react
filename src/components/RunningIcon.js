import React from 'react';

const RunningIcon = ({ distance, onHover, onClick }) => {
    // 螺旋线参数
    const turns = 2 + Math.min(3, distance / 5); 
    const spacing = 3.5;
    const baseRadius = 3.5;
    const lineWidth = 2.5;

    // 颜色选择
    let spiralColor;
    if (distance >= 10) spiralColor = "#FF9966"; // 长距离
    else if (distance > 5) spiralColor = "#FFD700"; // 中距离
    else spiralColor = "#87CEEB"; // 短距离

    // 创建渐变
    const gradientId = `spiral-gradient-${Math.random().toString(36).substring(2, 11)}`;

    return (
        <g
            onMouseOver={onHover}
            onClick={onClick}
            transform={`scale(1.2)`}
        >
            <defs>
                <radialGradient id={gradientId} cx="0" cy="0" r="100%" fx="0" fy="0">
                    <stop offset="0%" stopColor={spiralColor} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={spiralColor} stopOpacity={0.5} />
                </radialGradient>
            </defs>
            <path
                d={generateSpiralPath(turns, spacing, baseRadius)}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={lineWidth}
                strokeLinecap="round"
            />
        </g>
    );
};

// 生成螺旋线路径
const generateSpiralPath = (turns, spacing, baseRadius) => {
    const angleStep = 0.1;
    const maxAngle = turns * 2 * Math.PI;
    const points = [];

    for (let angle = 0; angle <= maxAngle; angle += angleStep) {
        const radius = baseRadius + spacing * angle / (2 * Math.PI);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        points.push(`${x},${y}`);
    }

    return `M ${points.join(' L ')}`;
};

export default RunningIcon;