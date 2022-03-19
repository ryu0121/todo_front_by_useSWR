import { memo, useContext } from 'react';
import { useSWRConfig } from 'swr';
import { AppContext } from './AppContext';
import postTodo from './crud/post';
import useTodo from './hooks/useTodo';

export const Form = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const { mutate } = useSWRConfig();
  const { todos }: {
    todos: Todo[];
  } = useTodo('todos');

  const handleOnSubmit = async (payload: any) => {
    const newTodo = {
      id: todos.length + 1,
      content: payload.content,
      checked: false,
      removed: false
    }
    const host = import.meta.env.VITE_HOST;
    mutate(`${host}/todos`, [...todos, newTodo], false);
    await postTodo(payload);
    mutate(`${host}/todos`);
    dispatch({ type: 'submit' });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'change', text: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit({ content: state.text });
      }}
    >
      <input
        type="text"
        disabled={state.filter === 'checked'}
        value={state.text}
        onChange={handleOnChange}
      />
      <input
        type="submit"
        disabled={state.filter === 'checked'}
        value="追加"
      />
    </form>
  );
});

Form.displayName = 'Form';