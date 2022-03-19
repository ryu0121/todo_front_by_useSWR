import axios from 'axios';
const postTodo = async (payload: object) => {
  const host = import.meta.env.VITE_HOST;
  await axios.post(
    `${host}/todos`,
    { ...payload, checked: false, removed: false }
  );
}

export default postTodo;