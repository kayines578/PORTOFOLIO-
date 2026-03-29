// TERMINAL TYPING EFFECT
const terminalLines = [
  "> INITIALIZING TACTICAL SYSTEM...",
  "> LOADING PORTFOLIO MODULES...",
  "> CHECKING SKILL ARSENAL...",
  "> AUTHORIZED USER: NAUFAL DZAKY PRIMANDA",
  "> ACCESS GRANTED.",
  "",
  "> WELCOME, COMMANDER."
];

const terminal = document.getElementById("terminal");
const terminalText = document.getElementById("terminalText");

let line = 0;
let char = 0;

function typeTerminal() {
  if (line < terminalLines.length) {
    if (char < terminalLines[line].length) {
      terminalText.textContent += terminalLines[line][char];
      char++;
      setTimeout(typeTerminal, 30);
    } else {
      terminalText.textContent += "\n";
      line++;
      char = 0;
      setTimeout(typeTerminal, 400);
    }
  } else {
    setTimeout(() => {
      terminal.style.opacity = "0";
      terminal.style.pointerEvents = "none";
      document.body.classList.add("loaded");
    }, 1000);
  }
}

typeTerminal();
// SKILL DATA
const skills = {
  html: 80,
  css: 70,
  javascript: 65
};

const buttons = document.querySelectorAll('.skill-btn');
const box = document.getElementById('skillBox');
const fill = document.getElementById('skillFill');
const percent = document.getElementById('skillPercent');
const title = document.getElementById('skillTitle');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const skill = btn.dataset.skill;
    const value = skills[skill];

    box.style.display = 'block';
    title.textContent = skill.toUpperCase();

    fill.style.width = '0%';
    percent.textContent = '0%';

    setTimeout(() => {
      fill.style.width = value + '%';
      percent.textContent = value + '%';
    }, 100);
  });
});

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
});
