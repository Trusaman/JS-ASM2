// Lay value tu form
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
let tableBodyEl = document.getElementById("tbody");
let healthyCheck = true;

let sideBar = document.getElementById("sidebar");

// side bar toggle class "active"
function toggleSideBar() {
  sideBar.classList.toggle("active");
}

let petArr = [];
getFromStorage("pets");

let breedArr = JSON.parse(localStorage.getItem("breed"));
// renderBreed(breedArr);

function formData() {
  // Click event when submit
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  if (validateData(data)) {
    petArr.push(data);
    renderTableData(petArr);
    clearForm();
  }
  saveToStorage(
    "pets",
    petArr.filter((num) => num)
  );
}

function validateData(pet) {
  // validate form data
  let checkVal = 0;
  if (petArr.map((obj) => obj.id).includes(pet.id)) {
    alert("ID must unique!");
    checkVal++;
  }
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
		<td><i class="bi bi-${pet.vaccinated ? "check" : "x"}-circle-fill"></i></td>
		<td><i class="bi bi-${pet.dewormed ? "check" : "x"}-circle-fill"></i></td>
		<td><i class="bi bi-${pet.sterilized ? "check" : "x"}-circle-fill"></i></td>
		<td>${new Date(pet.date).toLocaleDateString("en-GB")}</td>
		<td>
            <button type="button" class="btn btn-danger delete-pet" key=${
              pet.id
            } onclick="deletePet(this)">Delete</button>
		</td></tr>`
    )
    .join("");
  tableBodyEl.innerHTML = petList;
}

// clear form data
function clearForm() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  colorInput.value = "#000000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  tableBodyEl.value = "";
}

// Delete pet
function deletePet(element) {
  if (!confirm("Are you sure")) return;
  for (let i = 0; i < petArr.length; i++) {
    if (!petArr[i]) continue;
    if (petArr[i].id == element.getAttribute("key")) {
      console.log("delete: ", petArr[i]);
      delete petArr[i];
    }
  }
  renderTableData(petArr);
  document.getElementById("healthy-btn").textContent = "Show Healthy Pet";
  saveToStorage(
    "pets",
    petArr.filter((num) => num)
  );
}

// Show healthy pet
function showHealthyPet(element) {
  if (healthyCheck == true) {
    healthyCheck = false;
    element.textContent = "Show All Pet";
    let healthyPets = petArr.filter(
      (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
    );
    renderTableData(healthyPets);
  } else {
    healthyCheck = true;
    element.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
}

function renderBreed() {
  let breedOptions =
    `<option>Select Breed</option>` +
    breedArr.filter(breed => breed.breedType == typeInput.value).map(breed => `<option>${breed.breedData}</option>`).join("");
  breedInput.innerHTML = breedOptions;
}

typeInput.addEventListener("change", renderBreed)