// src/utils/d3Loader.js

export const loadD3 = async () => {
    let d3;
    try {
        const localD3Path = process.env.PUBLIC_URL + '/assets/lib/d3.v7.min.js';
        const response = await fetch(localD3Path);
        if (!response.ok) {
            throw new Error('Failed to load D3.js from local path');
        }
        const localD3Content = await response.text();
        const d3Loader = new Function('window', localD3Content);
        d3Loader(window);
        d3 = window.d3;

        if (!d3 || !d3.select) {
            throw new Error('D3.js functionality verification failed');
        }
        console.log('✅ D3.js loaded successfully');
    } catch (error) {
        console.error("❌ D3.js loading failed:", error);
        throw error;
    }
    return d3;
};