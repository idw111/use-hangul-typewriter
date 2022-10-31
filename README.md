# use-hangul-typewriter

> react hook for hangul typewriter effect

[Live Demo](https://idw111.github.io/use-hangul-typewriter/example/)

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
  const texts = ['한글 자소를 분리하여 타이핑', '오늘 날씨는 흐림', '봄 여름 가을 겨울'];
  const [text, toggle, reset, pause, resume] = useHangulTypewriter(texts);
  return <span>{text}</span>;
};
```

## parameters

| Property        | Type     | Description                                                                                                  | Default |
| :-------------- | :------- | :----------------------------------------------------------------------------------------------------------- | :------ |
| texts           | string[] | texts to display                                                                                             | []      |
| interval        | number   | interval between typing a character                                                                          | 100     |
| waitingInterval | 3000     | waiting interval after a single line of text is fully entered and before the line is about to start to erase | 3000    |
| caret           | string   | string appended at the end of the displayed text as a caret                                                  | ▎       |
