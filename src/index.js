import { useEffect, useState, useRef } from 'react';
import { disassemble, assemble } from 'hangul-js';

const DIRECTION_NONE = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_LEFT = -1;
const defaultState = {
	text: '',
	index: 0,
	cursor: 0,
	direction: DIRECTION_RIGHT,
	storedDirection: DIRECTION_RIGHT
};

/**
 *
 * @param {Array} texts
 * @param {number} interval
 * @param {number} waitingInterval
 */
const useHangulTypewriter = (texts = [], interval = 50, waitingInterval = 3000) => {
	const disassembledTexts = texts.map(text => disassemble(text).join('') + ' ');
	const [state, setState] = useState(defaultState);
	const timerRef = useRef(null);
	useEffect(() => {
		setState(defaultState);
	}, [texts]);
	useEffect(() => {
		if (state.direction !== DIRECTION_NONE && texts.length > 0) {
			const assembledFulltext = texts[state.index];
			const disassembledFulltext = disassembledTexts[state.index];
			const text = (state.direction > 0 ? disassembledFulltext : assembledFulltext).substr(0, state.cursor);
			timerRef.current = setTimeout(
				() => {
					setState({
						...state,
						text: assemble(text),
						cursor: text === disassembledFulltext ? assembledFulltext.length : state.cursor + state.direction,
						direction: text === disassembledFulltext ? DIRECTION_LEFT : state.direction < 0 && state.cursor < 0 ? DIRECTION_RIGHT : state.direction,
						index: state.direction < 0 && state.cursor < 0 ? (state.index + 1) % texts.length : state.index
					});
				},
				state.cursor >= disassembledFulltext.length ? waitingInterval : interval
			);
			return () => clearTimeout(timerRef.current);
		}
	}, [state]);
	const pause = () => {
		if (state.direction === DIRECTION_NONE) return;
		setState({ ...state, storedDirection: state.direction, direction: DIRECTION_NONE });
		clearTimeout(timerRef.current);
	};
	const resume = () => {
		if (state.direction !== DIRECTION_NONE) return;
		setState({ ...state, direction: state.storedDirection });
	};
	const toggle = () => (state.direction !== DIRECTION_NONE ? pause() : resume());
	const reset = () => setState(defaultState);

	return [state.text, toggle, reset, pause, resume];
};

export default useHangulTypewriter;
