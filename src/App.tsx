import { useReducer } from 'react';

import { reducer } from './reducer';
import { initialState } from './initialState';

import { Form } from './Form';
import { Selector } from './Selector';
import { FilteredTodos } from './FilteredTodos';

import { AppContext } from './AppContext';
import useTodo from './hooks/useTodo';

export const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, isError } = useTodo('todos');

  if (isError) {
    return <div>Failed To Load</div>
  }

  if (isLoading) {
    return <div>Now Loading ...</div>
  }

  return (
    // App 直下のコンポーネントは全てReact.memo() でラップしてある
    // こうすることで、dispatchが再宣言されてもコンポーネントが再レンダリングされなくなる
    // 再レンダリングされるのは、stateが変わった時だけ
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <Selector />
        <Form />
        <FilteredTodos />
      </div>
    </AppContext.Provider>
  );
};