import { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export const App = () => {
  const [text, setText] = useState('');
  // useState<type>(initial value) で型を指定できる
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const handleOnSubmit = () => {
    if (text === '') return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnEdit = (id: number, value: string) => {
    // todoオブジェクトへの参照は同じものを使用しているため、deep copy する
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    // filter ステートの値に応じて異なる内容の配列を返す
    switch (filter) {
      case 'all':
        // 削除されていないもの全て
        return !todo.removed;
      case 'checked':
        // 完了済 **かつ** 削除されていないもの
        return todo.checked && !todo.removed;
      case 'unchecked':
        // 未完了 **かつ** 削除されていないもの
        return !todo.checked && !todo.removed;
      case 'removed':
        // 削除済みのもの
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleOnEmpty = () => {
    // シャローコピーで事足りる
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  // e.target.value: string を Filter 型にキャストする
  return (
    <div>
      <select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === 'removed' ? (
        <button
          onClick={handleOnEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}
        >
          <input
            type="text"
            value={text}
            disabled={filter === 'checked'}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="submit"
            value="追加"
            disabled={filter === 'checked'}
            onSubmit={handleOnSubmit}
          />
        </form>
      )}
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};