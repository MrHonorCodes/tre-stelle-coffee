'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SmoothScroller = ({ children }) => {
// Create container ref
const containerRef = useRef(null);
// Create state for current position
const scrollPositionRef = useRef(0);
// Create state for target position
const targetPositionRef = useRef(0);
// Create animation frame ID ref
const rafIdRef = useRef(null);
// Create height ref
const heightRef = useRef(0);

// Setup lerp (linear interpolation) factor - controls smoothness
// Lower values = slower, smoother scrolling (0.05-0.1 for premium feel)
const lerpFactor = 0.07;

const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
};

// Main smooth scrolling logic
const smoothScroll = () => {
    // Use lerp to smooth transition to target scroll position
    scrollPositionRef.current = lerp(
    scrollPositionRef.current,
    targetPositionRef.current,
    lerpFactor
    );

    // Apply the transform to our content
    if (containerRef.current) {
    containerRef.current.style.transform = `translate3d(0, ${-scrollPositionRef.current}px, 0)`;
    }

    // Continue the animation loop
    rafIdRef.current = requestAnimationFrame(smoothScroll);
};

// Setup scroll listener and animation
useEffect(() => {
    const updateHeight = () => {
    if (!containerRef.current) return;
    
    // Set the document height to match content
    heightRef.current = containerRef.current.scrollHeight;
    document.body.style.height = `${heightRef.current}px`;
    };

    // Handle window scroll
    const onScroll = () => {
    // Update target position
    targetPositionRef.current = window.scrollY;
    };

    // Handle window resize
    const onResize = () => {
    updateHeight();
    };

    // Initial setup
    updateHeight();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    // Start the animation loop
    rafIdRef.current = requestAnimationFrame(smoothScroll);

    return () => {
    // Cleanup
    if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
    }
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    document.body.style.height = '';
    };
}, []);

return (
    <div
    ref={containerRef}
    style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform',
        zIndex: 1
    }}
    >
    {children}
    </div>
);
};

export default SmoothScroller;