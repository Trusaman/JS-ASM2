let sideBar = document.getElementById("sidebar");
let breedInput = document.getElementById("input-breed");
let breedTypeInput = document.getElementById("input-type");
let breedTbl = document.getElementById("tbody");

// side bar toggle class "active"
function toggleSideBar() {
  sideBar.classList.toggle("active");
}

let breedArr =  JSON.parse(localStorage.getItem("breed")) || []
renderBreedData(breedArr)

function formBreed() {
  const data = {
    breedData: breedInput.value,
    breedType: breedTypeInput.value,
  };
  if (validateBreedForm(data)) {
    breedArr.push(data);
    console.log(breedArr);
    renderBreedData(breedArr)
    clearBreedForm();
  }
  saveToStorage("breed", breedArr.filter(breed => breed));
}

function validateBreedForm(breed) {
  if (!breed) {
    alert("Please type breed!");
    return false;
  }
  if (breedTypeInput.value === "Select Type") {
    alert("Please select breed type!");
    return false;
  }
  if (breedArr.map((obj) => obj.breedData).includes(breed.breedData)) {
    alert("Breed must be unique!");
    return false;
  }
  return true;
}

function clearBreedForm() {
  breedInput.value = "";
  breedTypeInput.value = "Select Type";
}

function renderBreedData(arr) {
  let breedList = arr
    .map(
      (breed, idx) =>
        `<tr><th scope="row">${idx + 1}</th>
            <td>${breed.breedData}</td>
            <td>${breed.breedType}</td>						
            <td>
                <button type="button" class="btn btn-danger" key=${idx} onclick="deleteBreed(this)">Delete</button>
            </td>
        </tr>`
    )
    .join("");
  breedTbl.innerHTML = breedList;
}

function deleteBreed(element) {
    if (!confirm("Are you sure")) return
    for (let i = 0; i < breedArr.length; i++) {
        if (!breedArr[i]) continue
        if (i == element.getAttribute("key")) {
            console.log("delete: ", breedArr[i]);                
            delete breedArr[i]
        }
    }
    breedArr =breedArr.filter(breed => breed) 
    renderBreedData(breedArr)
    saveToStorage("breed", breedArr)
}