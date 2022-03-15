// アンビエント宣言
// .d.ts 拡張子で型宣言をする

declare type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};