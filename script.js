document.addEventListener('contextmenu', function (e) {  
    e.preventDefault();  
  }); 

const body = document.body;  
const themeToggle = document.getElementById("themeToggle");  
const menuToggle = document.getElementById("menuToggle");  
const sidebar = document.getElementById("sidebar");  
const navLinks = document.querySelectorAll(".nav-link");  
  
const savedTheme = localStorage.getItem("portfolio-theme");  
  
if (savedTheme === "light") {  
  body.classList.add("light-theme");  
}  
  
function updateThemeButton() {  
  const isLight = body.classList.contains("light-theme");  
  
  themeToggle.innerHTML = isLight  
    ? `<i class="bi bi-moon"></i><span>Dark mode</span>`  
    : `<i class="bi bi-sun"></i><span>Light mode</span>`;  
}  
  
updateThemeButton();  
  
themeToggle.addEventListener("click", () => {  
  body.classList.toggle("light-theme");  
  
  localStorage.setItem(  
    "portfolio-theme",  
    body.classList.contains("light-theme") ? "light" : "dark"  
  );  
  
  updateThemeButton();  
});  
  
menuToggle.addEventListener("click", () => {  
  const isOpen = sidebar.classList.toggle("open");  
  
  menuToggle.setAttribute("aria-expanded", isOpen);  
  menuToggle.setAttribute(  
    "aria-label",  
    isOpen ? "Close navigation" : "Open navigation"  
  );  
  
  menuToggle.innerHTML = isOpen  
    ? `<i class="bi bi-x-lg"></i>`  
    : `<i class="bi bi-list"></i>`;  
});  
  
navLinks.forEach((link) => {  
  link.addEventListener("click", () => {  
    navLinks.forEach((item) => item.classList.remove("active"));  
    link.classList.add("active");  
  
    sidebar.classList.remove("open");  
    menuToggle.setAttribute("aria-expanded", "false");  
    menuToggle.setAttribute("aria-label", "Open navigation");  
    menuToggle.innerHTML = `<i class="bi bi-list"></i>`;  
  });  
});  
  
const sections = document.querySelectorAll("section[id]");  
  
const observer = new IntersectionObserver(  
  (entries) => {  
    entries.forEach((entry) => {  
      if (entry.isIntersecting) {  
        navLinks.forEach((link) => {  
          link.classList.toggle(  
            "active",  
            link.getAttribute("href") === `#${entry.target.id}`  
          );  
        });  
      }  
    });  
  },  
  {  
    rootMargin: "-35% 0px -55% 0px",  
  }  
);  
  
sections.forEach((section) => observer.observe(section)); 