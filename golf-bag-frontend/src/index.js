
document.addEventListener('DOMContentLoaded', function() {
  grabAllBags()

})


function appendBags(bags) {
  const bagList = document.querySelector("#bag-list")
  for (const bag of bags) {
    const bagEl = document.createElement("li")
    bagEl.classList.add("list-group-item")
    bagEl.id = `bag-id-${bag.id}`

    bagEl.innerHTML = `
      <span>${bag.name}'s Bag</span>
      <button id="delete-bag-${bag.id}"class="btn btn-danger btn-sm pull-right">Delete</button>
      <ol id="data-bag-id-${bag.id}"></ol>
    `
    bagList.appendChild(bagEl)
    listenForDeleteButton(bag)
    getClubsInBag(bag)
  }
  listenForBagSave()
  listenForAddClub()



}

function getClubsInBag(bag) {
  fetch(`http://localhost:3000/bags/${bag.id}/clubs`).then(resp => resp.json()).then(function(clubs) {
    appendClubs(clubs)

  })
}

function appendClubs(bag) {
  const clubOl = document.querySelector(`#data-bag-id-${bag[0].bag_id}`)
  for(const club of bag) {
    const clubEl = document.createElement("li")
    clubEl.classList.add("list-group-item")
    clubEl.innerHTML = `
    ${club.club_type}---${club.brand}---${club.model}---Loft: ${club.loft}---Hand: ${club.handedness}
    `
    clubOl.appendChild(clubEl)
  }

}



function grabAllBags() {
  fetch("http://localhost:3000/bags").then(resp => resp.json()).then(function(bags) {
      appendBags(bags)
      appendNameDropdown(bags)
  })
}

function listenForBagSave() {
  const BagNameSave = document.querySelector("#new-bag-form")
  BagNameSave.addEventListener("submit", function(event) {
    event.preventDefault()
      createBag()
  })
}

function listenForDeleteButton(bag) {
  const delButton = document.getElementById(`delete-bag-${bag.id}`)
  delButton.addEventListener("click", function(event){
    deleteBagById(bag)
  })
}


function deleteBagById(bag) {
  const bagEl = document.getElementById(`bag-id-${bag.id}`)
  fetch(`http://localhost:3000/bags/${bag.id}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(resp => resp.json()).then(function(event){
    bagEl.remove()
  })
}


function createBag() {
  const bagNameElem = document.getElementById("add-bagName-input")
  fetch("http://localhost:3000/bags", {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: bagNameElem.value,
      })
  }).then(function(resp) {
    return resp.json()
  }).then(function(bagName){
    appendBags(bagName)



    bagNameElem.value = ""
  }).catch(function(error){
    console.log(error.message)
  })
}



function appendNameDropdown(bags) {
  const nameList = document.getElementById("pick-bag-name")

  nameList.innerHTML = ""
  for(const bag of bags) {
    const nameEl = document.createElement("option")
    nameEl.id = `bag-id-${bag.id}`
    nameEl.value = bag.id
    nameEl.innerHTML = `
    ${bag.name}
    `
    nameList.appendChild(nameEl)
  }
}

function listenForAddClub() {
  const addClubBtn = document.getElementById("submit-club")
  addClubBtn.addEventListener("click", function(event){
    addNewClubToBag()
  })
}

function addNewClubToBag() {

  const selectNameEl = document.querySelector("#pick-bag-name")
  const clubTypeEl = document.querySelector("#add-club-type")
  const clubBrandEl = document.querySelector("#add-brand-input")
  const clubModelEl = document.querySelector("#add-model-input")
  const clubLoftEl = document.querySelector("#add-loft-input")


  fetch(`http://localhost:3000/bags/${selectNameEl.value}/clubs`, {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        club_type: clubTypeEl.value,
        brand: clubBrandEl.value,
        model: clubModelEl.value,
        loft: clubLoftEl.value
      })
  }).then(function(resp) {
    return resp.json()
  }).then(function(updatedBag){
    appendClubs(updatedBag)

    clubBrandEl.value = ""
    clubModelEl.value = ""
    clubLoftEl.value = ""
  }).catch(function(error){
    console.log(error.message)
  })
}

