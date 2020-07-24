
document.addEventListener('DOMContentLoaded', function() {
  showAllBags()
})


const bagList = document.querySelector("#bag-list")

function appendBags(bag) {
  const bagEl = document.createElement("li")
  bagEl.classList.add("list-group-item")
  bagEl.id = `bag-id-${bag.id}`
  bagEl.innerHTML = `
    <span>${bag.name}'s Bag</span>
    <button id="delete-comment-${bag.id}"class="btn btn-danger btn-sm pull-right">Delete</button>
  `
  bagList.appendChild(bagEl)

  listenForDeleteButton(bag)

}


function showAllBags() {
  fetch("http://localhost:3000/bags").then(resp => resp.json()).then(function(bags) {
    for (const bag of bags) {
      appendBags(bag)
    }
  })
}

const BagNameSave = document.querySelector("#new-club-form")
BagNameSave.addEventListener("submit", function(event) {
  event.preventDefault()
    createBag()
})

function listenForDeleteButton(bag) {
  const delButton = document.getElementById(`delete-comment-${bag.id}`)
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





// const bagDiv = document.getElementById("bag-show")
