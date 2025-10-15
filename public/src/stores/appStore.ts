import { makeAutoObservable } from 'mobx';

class AppStore {
  demoMessage = 'Hello, world!';

  constructor() {
    makeAutoObservable(this);
  }
}

const appStore = new AppStore();
export default appStore;
