//API info needed for request
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ece6f604bcmsh77c41ad62cef63fp1492dbjsn67ad0a672cac",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const parentEl = document.querySelector(".main");
const scheduleEl = document.querySelector(".list");
let exerciseList = [];
let bodyPart = "";
let schedule = [];

// Capitilization fuunction

const capitilize = (str) => {
  let join = str[0].toUpperCase() + str.slice(1);
  return join;
};

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
  card.setAttribute("value", index);

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

  const button = document.createElement("button");
  button.setAttribute("class", "button");
  button.setAttribute("value", index);
  button.innerHTML = "+";

  button.addEventListener("click", (e) => {
    const exerciseCardIndex = e.target.value;
    const exercise = exerciseList[exerciseCardIndex];
    schedule.push(exercise);
    renderSchedule();
  });

  card.append(title, gif, muscle, equip, button);

  return card;
};

//CREATES EXERCISE SCHEDULE
const createScheduleCard = (item, index) => {
  const card = document.createElement("article");
  card.setAttribute("class", "record");

  const title = document.createElement("p");
  title.setAttribute("class", "info");
  const name = capitilize(item.name);
  title.innerHTML = name;

  // TODO possibly make gif and have a hover feature

  const muscle = document.createElement("p");
  muscle.setAttribute("class", "info");
  const target = capitilize(item.target);
  muscle.innerHTML = target;

  const equip = document.createElement("p");
  equip.setAttribute("class", "info");
  const equipment = capitilize(item.equipment);
  equip.innerHTML = equipment;

  //TODO Write remove event handler

  const button = document.createElement("button");
  button.setAttribute("class", "button");
  button.setAttribute("value", index);
  button.innerHTML = "X";

  button.addEventListener("click", (e) => {
    const exerciseCardIndex = Number(e.target.value);
    console.log(typeof(exerciseCardIndex));
    schedule = schedule.slice(0, exerciseCardIndex).concat(schedule.slice(exerciseCardIndex + 1));
    renderSchedule();
  });

  card.append(title, muscle, equip, button);

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
      exerciseList = response;
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

const reset = document.querySelector(".reset");

reset.addEventListener("click", (e) => {
  schedule = [];
  renderSchedule();
});
