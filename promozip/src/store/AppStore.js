import {action, computed, decorate, observable} from 'mobx';

class AppStore {
  user;
  jobPostList;

  constructor() {
    this.user = {id: '1', firstname: 'Artem', lastname: 'Dudinskyi'};
    this.jobPostList = [];
  }

  async loadJobPostList() {
    this.jobPostList = [
      {
        id: '1',
        title: 'Prep Cook',
        description:
          'The purpose of this position is to assist the Chef, Sous Chef, and BOH Supervisor in the Tomatina Back of House operations',
      },
    ];
  }

  async signOut() {
    try {
      this.company = null;
      this.user = null;
    } catch (e) {
      console.log(e);
    }
  }
}

decorate(AppStore, {
  user: observable,
  jobPostList: observable,
  loadJobPostList: action,
  signOut: action,
});

export default AppStore = new AppStore();
