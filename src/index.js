import { useEffect, useState } from 'react';
import { disassemble, assemble } from 'hangul-js';

/**
 * 
 * @param {Array} texts 
 * @param {number} interval 
 * @param {number} waitingInterval 
 */
const useHangulTypewriter = (texts = [], interval = 50, waitingInterval = 3000) => {
    const disassembledTexts = texts.map(text => disassemble(text).join('') + ' ');
	const [text, setText] = useState('');
	const [index, setIndex] = useState(0);
	const [cursor, setCursor] = useState(0);
	const [direction, setDirection] = useState(1);
	const [storedDirection, setStoredDirection] = useState(1);
	useEffect(() => {
		if (direction !== 0 && texts.length > 0) {
			const assembledFulltext = texts[index];
			const disassembledFulltext = disassembledTexts[index];
			const text = (direction > 0 ? disassembledFulltext : assembledFulltext).substr(0, cursor);
			const timer = setTimeout(
				() => {
					setText(assemble(text));
					setCursor(cursor + direction);
					if (text === disassembledFulltext) {
						setDirection(-1);
						setCursor(assembledFulltext.length);
					}
					if (direction < 0 && cursor < 0) {
						setDirection(1);
						setIndex((index + 1) % texts.length);
					}
				},
				cursor >= disassembledFulltext.length ? waitingInterval : interval
			);
			return () => clearTimeout(timer);
		}
	}, [index, cursor, direction]);
	const pause = () => setStoredDirection(direction) || setDirection(0);
	const resume = () => setDirection(storedDirection);
	const toggle = () => (direction !== 0 ? pause() : resume());
	const reset = () => {
		setIndex(0);
		setCursor(0);
		setDirection(1);
	};
	return [text, toggle, reset, pause, resume];
}

export default useHangulTypewriter;