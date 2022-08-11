//API info needed for request
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key":,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const parentEl = document.querySelector(".main");
let exerciseList = [];
let bodyPart = '';
let listSizeIndicator = 0;

//Functions that create elements
const createOption = (item, index) => {
  const option = document.createElement("option");
  option.setAttribute("value", item);
  option.innerHTML = item;

  const select = document.querySelector(".select");

  select.append(option);
};

const createExerciseItem = (item) => {
  const card = document.createElement("article");

  const title = document.createElement("h1");
  title.setAttribute("class", "name");
  title.innerHTML = item.name;

  const gif = document.createElement("img");
  gif.setAttribute("src", item.gifUrl);

  const muscle = document.createElement("p");
  muscle.setAttribute("class", "muscle");
  muscle.innerHTML = item.target;

  const equipment = document.createElement("p");
  equipment.setAttribute("class", "equipment");
  equipment.innerHTML = item.equipment;

  card.append(title, gif, muscle, equipment);
  return card;
};

// Render Function

const renderExercises = () => {
  parentEl.innerHTML = "";
  exerciseList.forEach((exercise) =>
    parentEl.appendChild(createExerciseItem(exercise))
  );
};

const fetchExerciseData = () => {
  fetch(
    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      exerciseList = response.slice(
        listSizeIndicator,
        listSizeIndicator + 49
      );
      renderExercises();
    })
    .catch((err) => console.error(err));
};

//Create drop down menu function
const fetchMenuData = () => {
  fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      response.map((item, index) => createOption(item, index));
    })
    .catch((err) => console.error(err));
};

fetchMenuData();

const button = document.querySelector(".button");

button.addEventListener("click", () => {
  listSizeIndicator = listSizeIndicator + 50;
  fetchExerciseData();
});

const select = document.querySelector(".select");

select.addEventListener("change", (event) => {
  bodyPart = event.target.value;
  console.log(bodyPart);
  fetchExerciseData();
});