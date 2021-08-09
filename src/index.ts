import { useEffect, useRef, useReducer } from 'react';
import { disassemble, assemble } from 'hangul-js';

export type Direction = 'forward' | 'backward';

export type Status = 'pending' | 'playing' | 'waiting';

type TypewriterActionType = 'pause' | 'resume' | 'reset' | 'toggle' | 'tick';

interface TypewriterState {
  texts: string[][];
  currentText: string;
  index: number;
  cursor: number;
  status: Status;
  direction: Direction;
}

const getInitialState = (texts: string[]): TypewriterState => {
  return {
    texts: texts.map((text) => disassemble(text).concat(' ')),
    currentText: '',
    index: 0,
    cursor: 0,
    status: 'pending',
    direction: 'forward',
  };
};

const reducer = (state: TypewriterState, action: { type: TypewriterActionType; [key: string]: any }): TypewriterState => {
  switch (action.type) {
    case 'pause':
      return { ...state, status: 'pending' };

    case 'resume':
      return { ...state, status: 'playing' };

    case 'reset':
      return {
        ...state,
        currentText: '',
        index: 0,
        cursor: 0,
        status: 'playing',
        direction: 'forward',
      };

    case 'tick':
      if (state.status === 'pending') {
        return state;
      } else if (state.status === 'playing') {
        if (state.direction === 'forward') {
          if (state.cursor === state.texts[state.index].length) return { ...state, direction: 'backward', status: 'waiting' };
          const cursor = state.cursor + 1;
          return { ...state, currentText: assemble(state.texts[state.index].slice(0, cursor)), cursor };
        } else if (state.direction === 'backward') {
          if (state.cursor === 0) return { ...state, direction: 'forward', status: 'waiting', index: (state.index + 1) % state.texts.length };
          const cursor = state.cursor - 1;
          return { ...state, currentText: assemble(state.texts[state.index].slice(0, cursor)), cursor };
        }
      } else if (state.status === 'waiting') {
        return { ...state, status: 'playing' };
      }

    default:
      return state;
  }
};

/**
 *
 * @param {Array} texts
 * @param {number} interval
 * @param {number} waitingInterval
 */
const useHangulTypewriter = (texts: string[] = [], interval: number = 50, waitingInterval: number = 3000) => {
  const [state, dispatch] = useReducer(reducer, getInitialState(texts));
  const timerRef = useRef(0);
  useEffect(() => {
    if (state.status !== 'pending') {
      timerRef.current = setTimeout(proceed, state.status === 'playing' ? interval : waitingInterval);
      return () => clearTimeout(timerRef.current);
    }
  }, [texts, state.status, state.cursor]);
  const proceed = () => dispatch({ type: 'tick' });
  const pause = () => dispatch({ type: 'pause', timer: timerRef.current });
  const resume = () => dispatch({ type: 'resume' });
  const toggle = () => (state.status !== 'pending' ? pause() : resume());
  const reset = () => dispatch({ type: 'reset' });
  return [state.currentText, toggle, reset, pause, resume];
};

export default useHangulTypewriter;
