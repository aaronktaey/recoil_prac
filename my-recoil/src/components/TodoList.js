import { selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { todoListState, todoListFilterState } from '../Recoil/atoms'

const style ={
    "display": "flex",
    "flexFlow": "column wrap",
    "alignItems": "center",
  }
  
  
  function TodoList(){
    const todoList = useRecoilValue(filteredTodoListState);
    return(
      <>
        <TodoListStats />
        <TodoListFilters />
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
  
    const onChange = ({target :{value}}) => {
      setInputValue(value);
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
  
    const editItemText = ({target: {value}}) =>{
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        text: value,
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
  
  // TodoListFilter 추가
  
  const filteredTodoListState = selector({
    key: 'FilteredTodoList',
    get: ({get}) => {
      const filter = get(todoListFilterState);
      const list = get(todoListState);
  
      switch(filter){
        case 'Show Completed':
          return list.filter((item) => item.isComplete);
        case 'Show Uncompleted':
          return list.filter((item) => !item.isComplete);
        default:
          return list;
      }
    },
  });
  
  function TodoListFilters() {
    const [filter, setFilter] = useRecoilState(todoListFilterState);
  
    const updateFilter = ({target: {value}}) =>{
      setFilter(value);
    };
    return(
      <>
        Filter:
        <select value={filter} onChange={updateFilter}>
          <option value="Show All">All</option>
          <option value="Show Completed">Completed</option>
          <option value="Show Uncompleted">Uncompleted</option>
        </select>
      </>
    );
  }
  
  const todoListStatsState = selector({
    key: 'TodoListStats',
    get: ({get}) => {
      const todoList = get(todoListState);
      const totalNum = todoList.length;
      const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
      const totalUncompletedNum = totalNum - totalCompletedNum;
      const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;
  
      return {
        totalNum,
        totalCompletedNum,
        totalUncompletedNum,
        percentCompleted,
      };
    },
  });
  
  function TodoListStats() {
    const {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    } = useRecoilValue(todoListStatsState);
  
    const formattedPercentComplete = Math.round(percentCompleted);
    return(
      <ul>
        <li>Total items: {totalNum}</li>
        <li>Items completed: {totalCompletedNum}</li>
        <li>Items not completed: {totalUncompletedNum}</li>
        <li>Percent completed: {formattedPercentComplete}</li>
      </ul>
    );
  }

  export default TodoList;