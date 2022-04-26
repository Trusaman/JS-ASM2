function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function getFromStorage(key) {
    if (localStorage.getItem(key)) {
        petArr = JSON.parse(localStorage.getItem(key))
        renderTableData(petArr)
    }   else {
        petArr = []
    }
}
