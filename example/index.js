import { useState } from 'react';
import { render } from 'react-dom';
import useHangulTypewriter from '../lib';

const texts = [
  ['치키치키 차카차카 초코초코초', '나쁜일을 하면은~', '치키치키 차카차카 초코초코초', '우리에게 들키지~'],
  ['가나다라마바사', '아자차카타파하'],
];

const Example = ({}) => {
  const [index, setIndex] = useState(0);
  const [text, toggle, reset, pause, resume] = useHangulTypewriter(texts[index], 60, 1000);
  return (
    <>
      <div className="typewriter" style={{ fontSize: 24, lineHeight: '40px' }}>
        {text}&nbsp;
      </div>
      <button onClick={pause}>pause</button>
      <button onClick={resume}>resume</button>
      <button onClick={() => setIndex((index + 1) % texts.length)}>change texts</button>
    </>
  );
};

window.onload = function () {
  render(<Example />, document.getElementById('root'));
};
