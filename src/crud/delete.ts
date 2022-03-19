import axios from 'axios';
const deleteTodo = async (todo: Todo) => {
  const host = import.meta.env.VITE_HOST;
  await axios.delete(
    `${host}/todos/${todo.id}`
  );
}

export default deleteTodo;