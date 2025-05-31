// src/components/ui/ScrollReveal.jsx
'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollReveal({
	children,
	delay = 0,
	threshold = 0.1,
	direction = 'up',
	className = '',
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, threshold });
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (isInView) {
			setHasAnimated(true);
		}
	}, [isInView]);

	const directions = {
		up: { y: 40 },
		down: { y: -40 },
		left: { x: 40 },
		right: { x: -40 },
		none: { x: 0, y: 0 },
	};

	return (
		<motion.div
			ref={ref}
			initial={{
				opacity: 0,
				...directions[direction],
			}}
			animate={
				hasAnimated
					? {
							opacity: 1,
							x: 0,
							y: 0,
						}
					: {}
			}
			transition={{
				duration: 0.7,
				delay: delay,
				ease: [0.22, 1, 0.36, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
