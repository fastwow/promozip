export const fetchMatches = async () => {
  try {
    let response = await fetch('http://localhost:3000/matches');
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

export const postMatch = async ({title, description, skills}) => {
  try {
    let response = await fetch('http://localhost:3000/matches', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description, skills}),
    });
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
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
