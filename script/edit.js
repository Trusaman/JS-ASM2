let tableBodyEl = document.getElementById("tbody");
let sideBar = document.getElementById("sidebar")

// side bar toggle class "active"
function toggleSideBar() {
    sideBar.classList.toggle("active")
}

let petArr = []
getFromStorage("pets")
console.log(petArr);

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
              <button type="button" class="btn btn-warning delete-pet" key=${
                pet.id
              } onclick="deletePet(this)">Edit</button>
          </td></tr>`
      )
      .join("");
    tableBodyEl.innerHTML = petList;
  }