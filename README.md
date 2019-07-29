# use-hangul-typewriter

> react hook for hangul typewriter effect

![example](./example.gif)

## install

```
npm install use-hangul-typewriter
```

## peer dependency
- react
- hangul-js

## usage

```javascript
const Typewriter = ({}) => {
    const texts = [
        '한글 자소를 분리하여 타이핑', 
        '오늘 날씨는 흐림', 
        '봄 여름 가을 겨울'
    ];
    const [text, toggle, reset, pause, resume] = useHangulTypewriter(texts);
    return <span>{text}</span>;
}
```

## parameters
- texts (Array): texts to display
- interval (number): interval between typing
- waitingInterval (number): waiting interval when a single line of text is fully entered
