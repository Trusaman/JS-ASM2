let tableBodyEl = document.getElementById("tbody");
let idInput = document.getElementById("input-id");
let nameInput = document.getElementById("input-name");
let ageInput = document.getElementById("input-age");
let typeInput = document.getElementById("input-pet-type");
let weightInput = document.getElementById("input-weight");
let lengthInput = document.getElementById("input-length");
let breedInput = document.getElementById("input-breed-type");
let colorInput = document.getElementById("input-color-1");
let vaccinatedInput = document.getElementById("input-vaccinated");
let dewormedInput = document.getElementById("input-dewormed");
let sterilizedInput = document.getElementById("input-sterilized");
let formContainer = document.getElementById("container-form");
let sideBar = document.getElementById("sidebar");
let submitBtn = document.getElementById("submit-btn");

// side bar toggle class "active"
function toggleSideBar() {
  sideBar.classList.toggle("active");
}

let petArr = [];
getFromStorage("pets");
console.log(petArr);

let breedArr = JSON.parse(localStorage.getItem("breed"));

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
          <td>
              <button type="button" class="btn btn-warning delete-pet" key=${idx} onclick="editPetBtn(this)">Edit</button>
          </td></tr>`
    )
    .join("");
  tableBodyEl.innerHTML = petList;
}

function editPetBtn(element) {
  if (formContainer.classList.contains("hide"))
    formContainer.classList.remove("hide");
  let editingPet = petArr[element.getAttribute("key")];
  idInput.value = editingPet.id;
  nameInput.value = editingPet.name;
  ageInput.value = editingPet.age;
  typeInput.value = editingPet.type;
  weightInput.value = editingPet.weight;
  lengthInput.value = editingPet.length;
  breedInput.options[0].textContent = editingPet.breed;
  colorInput.value = editingPet.color;
  vaccinatedInput.checked = editingPet.vaccinated;
  dewormedInput.checked = editingPet.dewormed;
  sterilizedInput.checked = editingPet.sterilized;
}

submitBtn.addEventListener("click", editPet);

function editPet() {
  for (pet of petArr) {
    if (pet.id == idInput.value) {
      let tempPet = {};
      tempPet.name = nameInput.value;
      tempPet.age = ageInput.value;
      tempPet.type = typeInput.value;
      tempPet.weight = weightInput.value;
      tempPet.length = lengthInput.value;
      tempPet.breed = breedInput.options[0].textContent;
      tempPet.color = colorInput.value;
      tempPet.vaccinated = vaccinatedInput.checked;
      tempPet.dewormed = dewormedInput.checked;
      tempPet.sterilized = sterilizedInput.checked;
      validateData(tempPet);
      pet.name = tempPet.name;
      pet.age = tempPet.age;
      pet.type = tempPet.type;
      pet.weight = tempPet.weight;
      pet.length = tempPet.length;
      pet.breed = tempPet.breed;
      pet.color = tempPet.color;
      pet.vaccinated = tempPet.vaccinated;
      pet.dewormed = tempPet.dewormed;
      pet.sterilized = tempPet.sterilized;
    }
  }
  saveToStorage("pets", petArr)
  renderTableData(petArr);
}

function validateData(pet) {
  // validate form data
  let checkVal = 0;
  if (pet.age < 1 || pet.age > 15) {
    alert("Age must be between 1 and 15!");
    checkVal++;
  }
  if (pet.weight < 1 || pet.weight > 15) {
    alert("Weight must be between 1 and 15!");
    checkVal++;
  }
  if (pet.length < 1 || pet.length > 100) {
    alert("Length must be between 1 and 100!");
    checkVal++;
  }
  if (pet.type === "Select Type") {
    alert("Please select Type!");
    checkVal++;
  }
  if (pet.breed === "Select Breed") {
    alert("Please select Breed!");
    checkVal++;
  }
  if (checkVal) return false;
  return true;
}

function renderBreed() {
  let breedOptions =
    breedArr.filter(breed => breed.breedType == typeInput.value).map(breed => `<option>${breed.breedData}</option>`).join("");
  breedInput.innerHTML = breedOptions;
}

typeInput.addEventListener("change", renderBreed)
