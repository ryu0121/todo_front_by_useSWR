import axios from 'axios';
const putTodo = async (todo: Todo, payload: any) => {
  const host = import.meta.env.VITE_HOST;
  await axios.put(
    `${host}/todos/${todo.id}`,
    { ...todo, removed: payload.removed }
  );
}

export default putTodo;