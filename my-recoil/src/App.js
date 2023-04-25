import { useState } from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <CharacterCounter />
        <TodoList />
      </RecoilRoot>
    </div>
  );
}

const textState = atom({
  key: 'textState',
  default: '',
});

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
  const onChange = (e) =>{
    setText(e.target.value);
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

// Counter END. Counter END. Counter END. Counter END. Counter END. Counter END.

const todoListState = atom({
  key: "TodoList",
  default: [],
});

function TodoList(){
  const todoList = useRecoilValue(todoListState);
  return(
    <>
      <TodoItemCreator />
      {todoList.map((todoItem) =>(
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange}/>
      <button onClick={addItem}>Add</button>
    </div>
  );
}

let id = 0;
function getId(){
  return id++;
}

function TodoItem({item}){
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = (e) =>{
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: e.target.value,
    });

    setTodoList(newList)
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };
  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue){
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function removeItemAtIndex(arr, index){
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}



export default App;
