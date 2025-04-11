// src/hooks/useD3.js

import { useEffect, useRef } from 'react';

const useD3 = (renderFunction, dependencies) => {
    const ref = useRef();

    useEffect(() => {
        const d3Script = document.createElement('script');
        d3Script.src = '/assets/lib/d3.v7.min.js';
        d3Script.async = true;

        d3Script.onload = () => {
            if (window.d3) {
                renderFunction(d3.select(ref.current));
            }
        };

        document.body.appendChild(d3Script);

        return () => {
            document.body.removeChild(d3Script);
        };
    }, dependencies);

    return ref;
};

export default useD3;