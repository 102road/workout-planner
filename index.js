//API info needed for request
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ece6f604bcmsh77c41ad62cef63fp1492dbjsn67ad0a672cac",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const parentEl = document.querySelector(".main");
const scheduleEl = document.querySelector(".schedule");
let exerciseList = [];
let bodyPart = "";
let listSizeIndicator = 0;
let schedule = [];

// Capitilization fuunction

const capitilize = (str) => {
  let join = str[0].toUpperCase() + str.slice(1);
  return join;
}

//CREATES OPTIONS SELECT DROPDOWN
const createOption = (item) => {
  const option = document.createElement("option");
  option.setAttribute("value", item);
  option.innerHTML = item;

  const select = document.querySelector(".select");

  select.append(option);
};

//CREATES LIST OF EXERCISES
const createListCard = (item, index) => {
  const card = document.createElement("article");
  card.setAttribute("class", "article");

  const title = document.createElement("h1");
  const name = capitilize(item.name);
  title.innerHTML = name;

  const gif = document.createElement("img");
  gif.setAttribute("src", item.gifUrl);
  gif.setAttribute("class", "gif");

  const muscle = document.createElement("p");
  const target = capitilize(item.target);
  muscle.innerHTML = `Target muscle: ${target}`;

  const equip = document.createElement("p");
  const equipment = capitilize(item.equipment);
  equip.innerHTML = `Equipment needed: ${equipment}`;

  const addButton = document.createElement("button");
  addButton.setAttribute("class", "add");
  addButton.setAttribute("value", index);
  addButton.innerHTML = "Add";

  addButton.addEventListener("click", (e) => {
    const exerciseCardIndex = e.target.value;
    const exercise = exerciseList[exerciseCardIndex];
    schedule.push(exercise);
    renderSchedule();
  });

  card.append( title, gif, muscle, equipment, addButton);

  return card;
};

//CREATES EXERCISE SCHEDULE
const createScheduleCard = (item, index) => {

  const card = document.createElement('article');
  card.setAttribute('class', 'record');

  const title = document.createElement('p');
  title.setAttribute('class', 'title');
  const name = capitilize(item.name);
  title.innerHTML = name;

  // TODO possibly make gif and have a hover feature
  
  const muscle = document.createElement('p');
  muscle.setAttribute('class', 'info');
  const target = capitilize(item.target);
  muscle.innerHTML = target;

  const equip = document.createElement('p');
  equipment.setAttribute('class', 'info');
  const equipment = capitilize(item.equipment);
  equip.innerHTML = item.equipment;

  const removeButton = document.createElement("button");
  removeButton.setAttribute("class", "remove");
  removeButton.setAttribute("value", index);
  removeButton.innerHTML = "Remove";

  //TODO Write remove event handler

  card.append(title, muscle, equipment, removeButton);

  return card;
};

// Render Function

const renderExercises = () => {
  parentEl.innerHTML = "";
  exerciseList.forEach((exercise, index) =>
    parentEl.appendChild(createListCard(exercise, index))
  );
};

const renderSchedule = () => {
  scheduleEl.innerHTML = "";
  schedule.forEach((exercise, index) => {
    scheduleEl.appendChild(createScheduleCard(exercise, index));
  });
};

//FETCH FUNCTIONS

const fetchExerciseData = () => {
  fetch(
    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      exerciseList = response.slice(listSizeIndicator, listSizeIndicator + 25);
      renderExercises();
    })
    .catch((err) => console.error(err));
};

const fetchMenuData = () => {
  fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", options)
    .then((response) => response.json())
    .then((response) => {
      response.map((item) => createOption(item));
    })
    .catch((err) => console.error(err));
};

// MAIN

fetchMenuData();

// Event handlers

const select = document.querySelector(".select");

select.addEventListener("change", (e) => {
  bodyPart = e.target.value;
  fetchExerciseData();
});

const button = document.querySelector(".button");

button.addEventListener("click", () => {
  listSizeIndicator = listSizeIndicator + 25;
  fetchExerciseData();
});

const previous = document.querySelector(".previous");

previous.addEventListener("click", () => {
  if (listSizeIndicator) {
    listSizeIndicator = listSizeIndicator - 25;
    fetchExerciseData();
  }
});
