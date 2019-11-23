import {action, computed, decorate, observable} from 'mobx';

class AppStore {
  user;
  matchList;
  learningPlan;

  constructor() {
    this.user = {id: '1', firstname: 'Artem', lastname: 'Dudinskyi'};
    this.matchList = [];
    this.learningPlan = [];
  }

  async loadMatchList() {
    this.matchList = [
      {
        id: '1',
        title: 'Prep Cook',
        description:
          'The purpose of this position is to assist the Chef, Sous Chef, and BOH Supervisor in the Tomatina Back of House operations',
      },
    ];
  }

  async newMatch({title, description, skills}) {
    const match = {id: Math.random(), title, description, skills};
    this.matchList.push({match, title, description, skills});
    return match;
  }

  async loadLearningPlan(matchId) {
    this.learningPlan = [
      {
        id: 1,
        name: 'Amazon',
        details: 'Clean Code',
        avatar:
          'https://merivisfoundation.org/wp-content/uploads/2018/02/Amazon-Logo-Transparent-PNG-300x300.png',
        url:
          'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM',
        action: 'order',
      },
      {
        id: 2,
        details: 'Engineering Project Management Specialization',
        name: 'Coursera',
        avatar:
          'https://i.pinimg.com/originals/f7/64/15/f76415d3d9779400d610a0f089f551e5.jpg',
        url:
          'https://www.coursera.org/specializations/engineering-project-management',
        action: 'apply',
      },
      {
        id: 3,
        details: 'Agile Scrum Master Training',
        name: 'Coursera',
        avatar:
          'http://assets.stickpng.com/thumbs/58e9197deb97430e819064f8.png',
        url: 'https://www.youtube.com/watch?v=IKqMYcl6zeM',
        action: 'watch',
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
  matchList: observable,
  learningPlan: observable,
  loadMatchList: action,
  newMatch: action,
  signOut: action,
});

export default AppStore = new AppStore();
