import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CharacterCounter from './components/Counter';
import TodoList from './components/TodoList';
import Header from './components/Header';

const style ={
  "display": "flex",
  "flexFlow": "column wrap",
  "alignItems": "center",
}

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <div style={style}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<TodoList />}></Route>
              <Route path="/todolist" element={<TodoList />}></Route>
              <Route path="/counter" element={<CharacterCounter />}></Route>
              {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
              <Route path="*" element={<TodoList />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </RecoilRoot>
    </div>
  );
}

export default App;
