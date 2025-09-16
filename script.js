// Dark / Light toggle (your existing code should already have this)
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Mobile menu
const menuBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("primary-nav");
const backdrop = document.querySelector(".nav-backdrop");

// open/close
function toggleMenu(open){
  const isOpen = open ?? !navLinks.classList.contains("show");
  navLinks.classList.toggle("show", isOpen);
  menuBtn.classList.toggle("active", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    backdrop.removeAttribute("hidden");
    document.body.classList.add("body-lock");
  } else {
    backdrop.setAttribute("hidden", "");
    document.body.classList.remove("body-lock");
  }
}

menuBtn.addEventListener("click", () => toggleMenu());

// close on backdrop click or link click
backdrop.addEventListener("click", () => toggleMenu(false));
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => toggleMenu(false));
});

// close on Esc
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") toggleMenu(false);
});


//Downloadin the CV or Viewing it
// === CV Modal ===
const cvBtn = document.getElementById('cvBtn');
const cvModal = document.getElementById('cvModal');
const cvBackdrop = document.getElementById('cvModalBackdrop');
const cvClose = document.getElementById('cvClose');
const cvView = document.getElementById('cvView');
const cvDownload = document.getElementById('cvDownload');

let lastFocusedEl = null;

function openCvModal(){
  lastFocusedEl = document.activeElement;
  cvModal.hidden = false; cvBackdrop.hidden = false;
  // tiny tick to allow transition
  requestAnimationFrame(()=>{
    cvModal.setAttribute('open','');
    cvBackdrop.setAttribute('open','');
  });
  document.body.classList.add('body-lock');
  cvView.focus();
}
function closeCvModal(){
  cvModal.removeAttribute('open'); cvBackdrop.removeAttribute('open');
  // wait for transition
  setTimeout(()=>{
    cvModal.hidden = true; cvBackdrop.hidden = true;
    document.body.classList.remove('body-lock');
    if (lastFocusedEl) lastFocusedEl.focus();
  }, 180);
}

// intercept click
if (cvBtn) {
  cvBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    openCvModal();
  });
}

cvBackdrop.addEventListener('click', closeCvModal);
cvClose.addEventListener('click', closeCvModal);
document.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape' && !cvModal.hidden) closeCvModal();
});

// actions
cvView.addEventListener('click', ()=>{
  const url = cvBtn.dataset.cv || cvBtn.getAttribute('href');
  window.open(url, '_blank', 'noopener');
  closeCvModal();
});

cvDownload.addEventListener('click', ()=>{
  const url = cvBtn.dataset.cv || cvBtn.getAttribute('href');
  const a = document.createElement('a');
  a.href = url;
  a.download = url.split('/').pop() || 'CV.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  closeCvModal();
});
