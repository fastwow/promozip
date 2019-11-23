var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let state = {
  matches: [
    {
      id: "1",
      title: "Prep Cook",
      description:
        "The purpose of this position is to assist the Chef, Sous Chef, and BOH Supervisor in the Tomatina Back of House operations"
    }
  ],
  learningPlans: {
    "1": [
      {
        id: 1,
        name: "Amazon",
        details: "Clean Code",
        avatar:
          "https://merivisfoundation.org/wp-content/uploads/2018/02/Amazon-Logo-Transparent-PNG-300x300.png",
        url:
          "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM",
        action: "order"
      },
      {
        id: 2,
        details: "Engineering Project Management Specialization",
        name: "Coursera",
        avatar:
          "https://i.pinimg.com/originals/f7/64/15/f76415d3d9779400d610a0f089f551e5.jpg",
        url:
          "https://www.coursera.org/specializations/engineering-project-management",
        action: "apply"
      },
      {
        id: 3,
        details: "Agile Scrum Master Training",
        name: "Coursera",
        avatar:
          "http://assets.stickpng.com/thumbs/58e9197deb97430e819064f8.png",
        url: "https://www.youtube.com/watch?v=IKqMYcl6zeM",
        action: "watch"
      }
    ]
  }
};

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

app.get("/matches", (req, res) => {
  res.status(200).json(state.matches);
});

app.post("/matches", (req, res) => {
  const { title, description, skills } = req.body;
  const match = { id: Math.random(), title, description, skills };
  state.matches.push(match);
  res.json(match);
});

app.get("/learningplans/:id", (req, res) => {
  res.status(200).json(state.learningPlans[req.params.id]);
});
