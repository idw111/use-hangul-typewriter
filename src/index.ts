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
    texts: texts.map((text) => disassemble(text)),
    currentText: '',
    index: 0,
    cursor: 0,
    status: 'playing',
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
        texts: action.texts.map((text: string) => disassemble(text)),
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
          if (state.cursor === state.texts[state.index].length) return { ...state, direction: 'backward', status: 'waiting', cursor: state.currentText.length };
          const cursor = state.cursor + 1;
          return { ...state, currentText: assemble(state.texts[state.index].slice(0, cursor)), cursor };
        } else if (state.direction === 'backward') {
          if (state.cursor === 0) return { ...state, direction: 'forward', status: 'waiting', index: (state.index + 1) % state.texts.length };
          const cursor = state.cursor - 1;
          return { ...state, currentText: state.currentText.substr(0, cursor), cursor };
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
const useHangulTypewriter = (texts: string[] = [], interval: number = 100, waitingInterval: number = 3000, caret = '▎') => {
  const [state, dispatch] = useReducer(reducer, getInitialState(texts));
  const timer = useRef(0);
  useEffect(() => {
    if (state.status !== 'pending') {
      timer.current = window.setTimeout(proceed, state.status === 'playing' ? interval : waitingInterval);
      return () => clearTimeout(timer.current);
    }
  }, [state.status, state.cursor]);
  useEffect(() => {
    if (texts.length) {
      timer.current = window.setTimeout(() => reset(texts), 0);
      return () => clearTimeout(timer.current);
    }
  }, [texts.join('')]);
  const proceed = () => dispatch({ type: 'tick' });
  const pause = () => dispatch({ type: 'pause', timer: timer.current });
  const resume = () => dispatch({ type: 'resume' });
  const toggle = () => (state.status !== 'pending' ? pause() : resume());
  const reset = (texts: string[]) => dispatch({ type: 'reset', texts });
  return [state.currentText + caret, pause, resume, toggle];
};

export default useHangulTypewriter;
