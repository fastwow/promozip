export const fetchMatches = async () => {
  try {
    let response = await fetch('http://localhost:3000/matches');
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

export const fetchLearningPlan = async matchId => {
  try {
    let response = await fetch(
      `http://localhost:3000/learningplans/${matchId}`,
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
