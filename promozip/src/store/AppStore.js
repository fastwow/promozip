import {action, computed, decorate, observable} from 'mobx';

class AppStore {
  user;
  jobPostList;

  constructor() {
    this.user = null;
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
}

decorate(AppStore, {
  user: observable,
  jobPostList: observable,
  loadJobPostList: action,
});

export default AppStore = new AppStore();
