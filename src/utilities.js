export function animateElement(el, cl, length = 1000) {
  el.classList.add(cl);
  setTimeout(() => el.classList.remove(cl), length);
}
