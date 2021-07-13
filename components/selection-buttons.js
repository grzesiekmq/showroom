import { app } from "../app.js";
import { cars } from "../data/cars.js";
import { loadGltf } from "../utils/loadGltf.js";
export function selectionButtons() {
  const ul = document.querySelector("ul");

  function addListItem(item) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.id = item;
    btn.textContent = item;
    li.appendChild(btn);
    ul.appendChild(li);
  }

  const carSelect = document.querySelector(".car-select");

  ul.classList.add("hide");

  function show() {
    ul.classList.remove("hide");
    ul.classList.add("show");
  }
  function hide() {
    ul.classList.remove("show");
    ul.classList.add("hide");
  }

  carSelect.addEventListener("click", () => {
    if (ul.className === "hide") {
      show();
    } else hide();
  });

  for (let car of cars) {
    addListItem(car);
  }

  function onSelect(e) {
    const selectedCar = cars.find((el) => el === e.target.id);
    if (e.target.id === selectedCar) {
      const title = document.querySelector(".title");
      title.textContent = selectedCar;
      app.model.visible = false;
      loadGltf(selectedCar);
    }
  }
  ul.addEventListener("click", onSelect);
}
