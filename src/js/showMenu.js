const menuUl = document.getElementById("menuUl");
const icoMenu = document.getElementById("icoMenu");
const menu = document.querySelector(".menu");
let isMenuOpen = false;

function resetMenu() {
  menuUl.classList.remove("show");
  menu.style.backgroundColor = "transparent";
  menu.style.height = "6rem";
  const menuItems = menuUl.querySelectorAll("li");

  menuItems.forEach((item) => {
    item.style.color = "transparent";
  });
}

function toggleMenu() {
  if (isMenuOpen) {
    resetMenu();
  } else {
    menuUl.classList.toggle("show");
    menu.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    menu.style.height = "17rem";
  }
  isMenuOpen = !isMenuOpen; // Zmień stan menu
}

icoMenu.addEventListener("click", toggleMenu);
