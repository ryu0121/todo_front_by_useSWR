import { Dispatch, memo } from 'react';

type Props = {
  // ジェネリクスを使った関数型
  // Action型を受け取ってvoid型を返す関数がDispatch
  dispatch: Dispatch<Action>;
};

// 渡されるdispatchが毎回変わるので、memoで再レンダリングを防いでいる
export const Selector = memo((props: Props) => {
  const handleOnFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.dispatch({ type: 'filter', filter: e.target.value as Filter });
  };

  return (
    <select defaultValue="all" onChange={handleOnFilter}>
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">現在のタスク</option>
      <option value="removed">ごみ箱</option>
    </select>
  );
});

// React コンポーネントはデフォルトでいくつかのAPIを提供している
// displayNameもその一つで、これはデバッグ時に表示されるコンポーネント名を編集できる(デフォルトは、コンポーネントの変数名)
// React.memo() でラップしたコンポーネントは明示的にdisplayNameを指定してあげないとデバッグ時のコンポーネント名が変わってしまう
Selector.displayName = 'Selector';