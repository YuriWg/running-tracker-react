// This file contains utility functions for responsive design in the application.

export const isMobile = () => {
    return window.innerWidth <= 768; // Define mobile breakpoint
};

export const isTablet = () => {
    return window.innerWidth > 768 && window.innerWidth <= 1024; // Define tablet breakpoint
};

export const isDesktop = () => {
    return window.innerWidth > 1024; // Define desktop breakpoint
};

export const getResponsiveFontSize = (baseSize) => {
    if (isMobile()) {
        return baseSize * 0.8; // Reduce font size for mobile
    } else if (isTablet()) {
        return baseSize * 1; // Keep base size for tablet
    } else {
        return baseSize * 1.2; // Increase font size for desktop
    }
};