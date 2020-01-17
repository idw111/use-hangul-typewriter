import '@babel/polyfill';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useHangulTypewriter from '../src';

const texts1 = ['가나다라마바사', '오늘은 금요일', '치키치키 차카차카 초코초코초'];
const texts2 = ['아자차카타파하', '오늘은 월요일', '나쁜일을 해라'];

const Example = ({}) => {
	const [texts, setTexts] = useState(texts1);
	const [text, toggle, reset, pause, resume] = useHangulTypewriter(texts, 50, 1000);
	return (
		<>
			<div className="typewriter" style={{ fontSize: 24, lineHeight: '40px' }}>
				{text}&nbsp;
			</div>
			<button onClick={pause}>pause</button>
			<button onClick={resume}>resume</button>
			<button onClick={() => setTexts(texts2)}>change texts</button>
		</>
	);
};

window.onload = function() {
	ReactDOM.render(<Example />, document.getElementById('root'));
};
