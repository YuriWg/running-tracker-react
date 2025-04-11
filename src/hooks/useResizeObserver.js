// src/hooks/useResizeObserver.js
import { useEffect, useRef } from 'react';

const useResizeObserver = (callback) => {
    const observerRef = useRef();

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            if (callback && typeof callback === 'function') {
                callback(entries);
            }
        });

        observerRef.current = observer;

        return () => {
            observer.disconnect();
        };
    }, [callback]);

    const observe = (element) => {
        if (observerRef.current && element) {
            observerRef.current.observe(element);
        }
    };

    const unobserve = (element) => {
        if (observerRef.current && element) {
            observerRef.current.unobserve(element);
        }
    };

    return { observe, unobserve };
};

export default useResizeObserver;