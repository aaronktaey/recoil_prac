import { textState } from '../Recoil/atoms'
import { selector, useRecoilState, useRecoilValue } from 'recoil'

function CharacterCounter(){
    return (
      <div>
        <TextInput />
        <CharacterCount />
      </div>
    )
};

  function TextInput(){
    const [ text, setText ] = useRecoilState(textState);
    const onChange = ({target : {value}}) =>{
      setText(value);
    }
  
    return (
      <div>
        <input type="text" value={text} onChange={onChange} />
        <br />
        Echo: {text}
      </div>
    )
  }

  const charCountState = selector({
    key: 'charCountState',
    get: ({get}) => {
      const text = get(textState);
      return text.length;
    },
  });
  
  function CharacterCount(){
    const count = useRecoilValue(charCountState);
  
    return <>Character Count: {count}</>;
  }

  export default CharacterCounter;
