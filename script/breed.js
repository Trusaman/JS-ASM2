let sideBar = document.getElementById("sidebar")
let breedInput = document.getElementById("input-breed")
let breedTypeInput = document.getElementById("input-type")

// side bar toggle class "active"
function toggleSideBar() {
    sideBar.classList.toggle("active")
}

const breedArr = []

function formBreed() {
    const data = breedInput.value
    breedArr.push(data)
    console.log(breedArr);
    clearBreedForm()
}


function validateBreedForm(breed) {
    if (!breed) {
        alert("Please type breed!")
        return false
    }
    return true
}

function clearBreedForm() {
    breedInput.value = ""
    breedTypeInput.value = "Select Type"
}