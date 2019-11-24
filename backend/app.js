var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let state = {
  matches: [],
  learningPlans: {}
};

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

app.get("/matches", (req, res) => {
  res.status(200).json(state.matches);
});

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

app.post("/matches", (req, res) => {
  const { title, description, skills } = req.body;
  const match = { id: uuidv4(), title, description, skills };
  state.matches.push(match);
  state.learningPlans[match.id] = generateLearningPlan();
  res.json(match);
});

app.get("/learningplans/:id", (req, res) => {
  res.status(200).json(state.learningPlans[req.params.id]);
});

const generateLearningPlan = () => {
  return [
    {
      id: 2,
      details: "Master Sushi Class online - Learn the Art of Sushi Making",
      name: "Udemy",
      avatar: "https://www.udemy.com/staticx/udemy/images/v6/default-meta-image.png",
      url: "https://www.udemy.com/staticx/udemy/images/v6/default-meta-image.png",
      action: "apply"
    },
    {
      id: 3,
      details: "Management Skills",
      name: "Udemy",
      avatar: "https://www.udemy.com/staticx/udemy/images/v6/default-meta-image.png",
      url: "https://www.udemy.com/staticx/udemy/images/v6/default-meta-image.png",
      action: "apply"
    }
  ];
};
