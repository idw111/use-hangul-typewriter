# use-hangul-typewriter

> react hook for hangul typewriter effect

## install

```
npm install use-hangul-typewriter
```

## usage

```javascript
const Typewriter = ({}) => {
    const [text, toggle, reset, pause, resume] = useHangulTypewriter(['한글 자소를 분리하여 타이핑', '하하하', '호호호']);
    return <span>{text}</span>;
}
```
