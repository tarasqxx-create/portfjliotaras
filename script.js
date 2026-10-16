// ===== ВАШИ КОНТАКТЫ — меняйте только здесь =====
const CONTACTS = {
  telegram: "https://t.me/your_username", // ВСТАВИТЬ ССЫЛКУ НА TELEGRAM
  telegramLabel: "@your_username",         // как показывать текст
  phone: "+79289566000",
  email: "tarasqxx@gmail.com"
};

document.querySelectorAll("[data-tg]").forEach(a => { a.href = CONTACTS.telegram; a.target = "_blank"; a.rel = "noopener"; });
document.querySelectorAll("[data-tg-text]").forEach(p => p.textContent = CONTACTS.telegramLabel);
document.querySelectorAll("[data-tel]").forEach(a => a.href = "tel:" + CONTACTS.phone);
document.querySelectorAll("[data-mail]").forEach(a => a.href = "mailto:" + CONTACTS.email);
document.getElementById("y").textContent = new Date().getFullYear();

// Мобильное меню
const burger = document.getElementById("burger"), nav = document.getElementById("nav");
const setMenu = open => {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
};
burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

// Появление при прокрутке
const items = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  items.forEach((el, i) => { el.style.transitionDelay = (i % 3) * 80 + "ms"; io.observe(el); });
} else items.forEach(el => el.classList.add("in"));

// Окно с работой
const modal = document.getElementById("modal");
let last;
const closeModal = () => { modal.hidden = true; document.body.style.overflow = ""; last && last.focus(); };
document.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => {
  last = b;
  const img = document.getElementById("mi");
  img.src = b.dataset.open;
  img.alt = b.querySelector("img").alt;
  document.getElementById("mt").textContent = b.dataset.title;
  document.getElementById("mtx").textContent = b.dataset.text;
  document.getElementById("mtype").textContent = b.dataset.type;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("close").focus();
}));
document.getElementById("close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { if (!modal.hidden) closeModal(); setMenu(false); }
});
