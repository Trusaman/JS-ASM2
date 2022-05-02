let idInput = document.getElementById("input-id");
let nameInput = document.getElementById("input-name");
let ageInput = document.getElementById("input-age");
let typeInput = document.getElementById("input-pet-type");
let weightInput = document.getElementById("input-weight");
let lengthInput = document.getElementById("input-length");
let breedInput = document.getElementById("input-breed-type");
// let colorInput = document.getElementById("input-color-1");
let vaccinatedInput = document.getElementById("input-vaccinated");
let dewormedInput = document.getElementById("input-dewormed");
let sterilizedInput = document.getElementById("input-sterilized");
let tableBodyEl = document.getElementById("tbody");

let findBtn = document.getElementById("find-btn");
let sideBar = document.getElementById("sidebar");

// side bar toggle class "active"
function toggleSideBar() {
  sideBar.classList.toggle("active");
}

let petArr = [];
getFromStorage("pets");

let breedArr = JSON.parse(localStorage.getItem("breed")) || [];
breedInput.innerHTML =
  `<option>Select Breed</option>` +
  breedArr.map((breed) => `<option>${breed.breedData}</option>`).join("");

function renderTableData(arr) {
  let petList = arr
    .map(
      (pet, idx) =>
        `<tr><th scope="row">${pet.id}</th>
           <td>${pet.name}</td>
           <td>${pet.age}</td>
           <td>${pet.type}</td>
           <td>${pet.weight} kg</td>
           <td>${pet.length} cm</td>
           <td>${pet.breed}</td>
           <td>
              <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
          </td>
          <td><i class="bi bi-${
            pet.vaccinated ? "check" : "x"
          }-circle-fill"></i></td>
          <td><i class="bi bi-${
            pet.dewormed ? "check" : "x"
          }-circle-fill"></i></td>
          <td><i class="bi bi-${
            pet.sterilized ? "check" : "x"
          }-circle-fill"></i></td>
          <td>${new Date(pet.date).toLocaleDateString("en-GB")}</td>
</tr>`
    )
    .join("");
  tableBodyEl.innerHTML = petList;
}

function findData() {
  let tempPetArr = petArr;
  if (idInput.value !== "")
    tempPetArr = tempPetArr.filter((pet) => pet.id.includes(idInput.value));
  if (nameInput.value !== "")
    tempPetArr = tempPetArr.filter((pet) => pet.name.includes(nameInput.value));
  if (typeInput.value !== "Select Type")
    tempPetArr = tempPetArr.filter((pet) => pet.type == typeInput.value);
  if (breedInput.value !== "Select Breed")
    tempPetArr = tempPetArr.filter((pet) => pet.breed == breedInput.value);
  if (vaccinatedInput.checked)
    tempPetArr = tempPetArr.filter((pet) => pet.vaccinated);
  if (dewormedInput.checked)
    tempPetArr = tempPetArr.filter((pet) => pet.dewormed);
  if (sterilizedInput.checked)
    tempPetArr = tempPetArr.filter((pet) => pet.sterilized);
  renderTableData(tempPetArr);
}

findBtn.addEventListener("click", findData);

function renderBreed() {
  let breedOptions;
  if (typeInput.value == "Select Type")
    breedOptions =
      `<option>Select Breed</option>` +
      breedArr.map((breed) => `<option>${breed.breedData}</option>`).join("");
  else
    breedOptions =
      `<option>Select Breed</option>` +
      breedArr
        .filter((breed) => breed.breedType == typeInput.value)
        .map((breed) => `<option>${breed.breedData}</option>`)
        .join("");
  breedInput.innerHTML = breedOptions;
}

typeInput.addEventListener("change", renderBreed);

function renderType() {
  if (breedInput.value == "Select Breed") return;
  typeInput.value = breedArr.filter(
    (breed) => breed.breedData == breedInput.value
  )[0].breedType;
}

breedInput.addEventListener("change", renderType);
