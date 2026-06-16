'use client';

import { useEffect, useState } from 'react';
import { isAnniversaryEnabled } from './AnniversaryPopup';

const COLORS = ['#7b1c2e', '#d4af37', '#f5f0e8', '#c0392b', '#e8c96a'];
const PIECES = 60;

function randomBetween(a: number, b: number) {
	return a + Math.random() * (b - a);
}

type Piece = {
	id: number;
	left: string;
	delay: string;
	duration: string;
	color: string;
	size: number;
	rotate: string;
};

export default function AnniversaryConfetti() {
	const [pieces, setPieces] = useState<Piece[]>([]);

	useEffect(() => {
		if (!isAnniversaryEnabled()) return;
		const today = new Date();
		// Only show confetti on June 20 itself
		if (today.getMonth() !== 5 || today.getDate() !== 20) return;

		setPieces(
			Array.from({ length: PIECES }, (_, i) => ({
				id: i,
				left: `${randomBetween(0, 100)}%`,
				delay: `${randomBetween(0, 4).toFixed(2)}s`,
				duration: `${randomBetween(3, 6).toFixed(2)}s`,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
				size: Math.floor(randomBetween(6, 12)),
				rotate: `${randomBetween(0, 360).toFixed(0)}deg`,
			}))
		);
	}, []);

	if (pieces.length === 0) return null;

	return (
		<>
			<style>{`
				@keyframes confetti-fall {
					0%   { transform: translateY(-20px) rotate(var(--r)); opacity: 1; }
					80%  { opacity: 1; }
					100% { transform: translateY(100vh) rotate(calc(var(--r) + 720deg)); opacity: 0; }
				}
				.confetti-piece {
					position: fixed;
					top: 0;
					z-index: 9999;
					pointer-events: none;
					animation: confetti-fall var(--dur) var(--delay) ease-in forwards;
				}
			`}</style>
			{pieces.map((p) => (
				<div
					key={p.id}
					className="confetti-piece"
					style={
						{
							left: p.left,
							width: p.size,
							height: p.size * 1.4,
							backgroundColor: p.color,
							borderRadius: '2px',
							'--r': p.rotate,
							'--dur': p.duration,
							'--delay': p.delay,
						} as React.CSSProperties
					}
				/>
			))}
		</>
	);
}
