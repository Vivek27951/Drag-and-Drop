const draggable_list = document.getElementById("draggable-list");

const Number = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...Number]
    .map((a) => ({ value: a, sort: Math.random() }))
    .map((a) => a.value)
    .forEach((number, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number"></span>
        <div class="draggable" id="div1" draggable="true">
          <p class="number-name">${number}</p>
        </div>
      `;

      var x = Math.floor(Math.random() * 256) % 230;
      var y = (100 + Math.floor(Math.random() * 256)) % 230;
      var z = (200 + Math.floor(Math.random() * 256)) % 230;
      var bgColor = "rgb(" + x + "," + y + "," + z + ")";
      listItem.style.backgroundColor = bgColor;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
