const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

// Get all body parts
// fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// // Get all exercises
// fetch("https://exercisedb.p.rapidapi.com/exercises", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// // Get exercise by body part
// fetch(
//   "https://exercisedb.p.rapidapi.com/exercises/bodyPart/%7BbodyPart%7D",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

//Create Select opttions Function
const createOption = (item, index) => {
  const option = document.createElement("option");
  option.setAttribute("value", index);
  option.innerHTML = item;
  
  const select = document.querySelector(".select");

  select.append(option);
};

//Create drop down menu function
const createMenu = () => {
  const data = fetch(
    "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      response.map((item, index) => createOption(item, index));
    })
    .catch((err) => console.error(err));
};

createMenu();
