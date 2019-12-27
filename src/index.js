import { useEffect, useState, useRef } from 'react';
import { disassemble, assemble } from 'hangul-js';

const DIRECTION_NONE = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_LEFT = -1;

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
	const [direction, setDirection] = useState(DIRECTION_RIGHT);
	const [storedDirection, setStoredDirection] = useState(DIRECTION_RIGHT);
	const timerRef = useRef(null)
	useEffect(() => {
		if (direction !== 0 && texts.length > 0) {
			const assembledFulltext = texts[index];
			const disassembledFulltext = disassembledTexts[index];
			const text = (direction > 0 ? disassembledFulltext : assembledFulltext).substr(0, cursor);
			timerRef.current = setTimeout(
				() => {
					setText(assemble(text));
					setCursor(cursor + direction);
					if (text === disassembledFulltext) {
						setDirection(DIRECTION_LEFT);
						setCursor(assembledFulltext.length);
					}
					if (direction < 0 && cursor < 0) {
						setDirection(DIRECTION_RIGHT);
						setIndex((index + 1) % texts.length);
					}
				},
				cursor >= disassembledFulltext.length ? waitingInterval : interval
			);
			return () => clearTimeout(timerRef.current);
		}
	}, [index, cursor, direction]);
	const pause = () => setStoredDirection(direction) || setDirection(DIRECTION_NONE);
	const resume = () => setDirection(storedDirection);
	const toggle = () => (direction !== DIRECTION_NONE ? pause() : resume());
	const reset = () => {
		setIndex(0);
		setCursor(0);
		setDirection(1);
	};
	return [text, toggle, reset, pause, resume];
}

export default useHangulTypewriter;