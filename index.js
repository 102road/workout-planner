//API info needed for request
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b4e9548095mshb23d8376b4c75e4p17b07ajsn9944ed5ec0fc",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const parentEl = document.querySelector(".main");
const scheduleEl = document.querySelector(".schedule");
let exerciseList = [];
let bodyPart = "";
let listSizeIndicator = 0;
let schedule = [];

//Functions that create elements
const createOption = (item) => {
  const option = document.createElement("option");
  option.setAttribute("value", item);
  option.innerHTML = item;

  const select = document.querySelector(".select");

  select.append(option);
};

const createExerciseItem = (item, index, option) => {
  const card = document.createElement("article");
  card.setAttribute("class", "article");

  const title = document.createElement("h1");
  title.setAttribute("class", "name");
  title.innerHTML = item.name;

  const gif = document.createElement("img");
  gif.setAttribute("src", item.gifUrl);
  gif.setAttribute("class", "gif");

  const muscle = document.createElement("p");
  muscle.setAttribute("class", "muscle");
  muscle.innerHTML = `Target muscle: ${item.target}`;

  const equipment = document.createElement("p");
  equipment.setAttribute("class", "equipment");
  equipment.innerHTML = `Equipment needed: ${item.equipment}`;

  // Button is given a value of index so the exercise can be found within the array so it can be added to the schedule
  if (!option) {
    const addButton = document.createElement("button");
    addButton.setAttribute("class", "add");
    addButton.setAttribute("value", index);
    addButton.innerHTML = "Add";
    card.append(addButton);

    addButton.addEventListener("click", (e) => {
      const exerciseCardIndex = e.target.value;
      const exercise = exerciseList[exerciseCardIndex];
      schedule.push(exercise);
      renderSchedule();
    });
  } else {
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove");
    removeButton.setAttribute("value", index);
    removeButton.innerHTML = "Remove";
    card.appendChild(removeButton);

    removeButton.addEventListener("click", (e) => {
      const exerciseCardIndex = e.target.value;
      schedule.filter((exercise, index) => index != exerciseCardIndex);
      console.log(schedule);
      renderSchedule();
    });
  }
  card.append(title, gif, muscle, equipment);
  return card;
};

// Render Function

const renderExercises = () => {
  parentEl.innerHTML = "";
  exerciseList.forEach((exercise, index) =>
    parentEl.appendChild(createExerciseItem(exercise, index, false))
  );
};

const renderSchedule = () => {
  scheduleEl.innerHTML = "";
  schedule.forEach((exercise, index) => {
    scheduleEl.appendChild(createExerciseItem(exercise, index, true));
  });
};

const fetchExerciseData = () => {
  fetch(
    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      exerciseList = response.slice(listSizeIndicator, listSizeIndicator + 24);
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
      response.map((item) => createOption(item));
    })
    .catch((err) => console.error(err));
};

fetchMenuData();

// Event handlers

const select = document.querySelector(".select");

select.addEventListener("change", (e) => {
  bodyPart = e.target.value;
  console.log(bodyPart);
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
