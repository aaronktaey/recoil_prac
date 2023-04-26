import { todoListState, todoListFilterState, textState } from '../Recoil/atoms'
import { useRecoilValue, selector } from "recoil";
  
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

const charCountState = selector({
  key: 'charCountState',
  get: ({get}) => {
    const text = get(textState);
    return text.length;
  },
});


const Home = () => {
    const todoList = useRecoilValue(filteredTodoListState);
    const counter = useRecoilValue(charCountState);
    return(
        <>
            <h1>현재 TodoListState : </h1>
            <ol>
                {todoList.map((todoItem) =>(
                    <p key={todoItem.id}>{todoItem.text}</p>
                ))}
            </ol>
            <h1>현재 Counter : {counter}</h1>
        </>
    )
}
export default Home;