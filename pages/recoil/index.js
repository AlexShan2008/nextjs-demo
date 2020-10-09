import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

function CharacterCounter() {
  return (
    <Content style={{ padding: '25px 50px' }}>
      <Row>
        <Col span={24}>
          <h3>A state management library for React</h3>
        </Col>
        <TextInput />
        <CharacterCount />
      </Row>
    </Content>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

export default CharacterCounter;
