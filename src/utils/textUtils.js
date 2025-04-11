// src/utils/textUtils.js

export function wrapText(text, width) {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach(word => {
        const testLine = currentLine + word + ' ';
        const testWidth = measureTextWidth(testLine);
        if (testWidth > width && currentLine.length > 0) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    });

    if (currentLine.length > 0) {
        lines.push(currentLine.trim());
    }

    return lines;
}

function measureTextWidth(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '16px PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif'; // Adjust font as needed
    return context.measureText(text).width;
}