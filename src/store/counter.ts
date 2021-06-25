import { makeAutoObservable } from 'mobx';

class CounterStore {
  // 这里必须给定一个初始化的只，否则响应式数据不生效
  count = 0;

  constructor() {
    // 这里是实现响应式的关键
    makeAutoObservable(this);
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

export default new CounterStore();
