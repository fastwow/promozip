import {action, computed, decorate, observable} from 'mobx';
import {fetchMatches, fetchLearningPlan} from '../api/service';

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
    this.matchList = await fetchMatches();
  }

  async newMatch({title, description, skills}) {
    const match = {id: Math.random(), title, description, skills};
    this.matchList.push({match, title, description, skills});
    return match;
  }

  async loadLearningPlan(matchId) {
    this.learningPlan = await fetchLearningPlan(matchId);
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
