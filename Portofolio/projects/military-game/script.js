const game = document.getElementById("game");
const player = document.getElementById("player");
const hpText = document.getElementById("hp");

let px = 250, py = 170;
let hp = 5;
let speed = 3;

let keys = {};
let mouse = { x: 0, y: 0 };
let bullets = [];
let enemies = [];
let walls = [];

// INPUT
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

game.addEventListener("mousemove", e => {
  const r = game.getBoundingClientRect();
  mouse.x = e.clientX - r.left;
  mouse.y = e.clientY - r.top;
});

game.addEventListener("click", shoot);

// WALL
function wall(x,y,w,h){
  const d=document.createElement("div");
  d.className="wall";
  d.style.left=x+"px";
  d.style.top=y+"px";
  d.style.width=w+"px";
  d.style.height=h+"px";
  game.appendChild(d);
  walls.push(d);
}
wall(80,80,360,20);
wall(80,260,360,20);
wall(80,100,20,160);
wall(420,100,20,160);

// COLLISION
function hit(x,y,s=26){
  return walls.some(w =>
    x < w.offsetLeft+w.offsetWidth &&
    x+s > w.offsetLeft &&
    y < w.offsetTop+w.offsetHeight &&
    y+s > w.offsetTop
  );
}

// PLAYER MOVE
function movePlayer(){
  let nx=px, ny=py;
  if(keys.w) ny-=speed;
  if(keys.s) ny+=speed;
  if(keys.a) nx-=speed;
  if(keys.d) nx+=speed;

  if(!hit(nx,py)) px=nx;
  if(!hit(px,ny)) py=ny;

  px=Math.max(0,Math.min(494,px));
  py=Math.max(0,Math.min(324,py));

  player.style.left=px+"px";
  player.style.top=py+"px";

  const angle = Math.atan2(mouse.y - py, mouse.x - px);
  player.style.transform = `rotate(${angle}rad)`;
}

// SHOOT
function shoot(){
  const b=document.createElement("div");
  b.className="bullet";
  b.style.left=px+13+"px";
  b.style.top=py+18+"px";
  game.appendChild(b);

  const dx=mouse.x-px;
  const dy=mouse.y-py;
  const d=Math.hypot(dx,dy);
  bullets.push({el:b,vx:dx/d*8,vy:dy/d*8});
}

// ENEMY
function spawnEnemy(){
  const e=document.createElement("div");
  e.className="soldier enemy";
  e.innerHTML=`<div class="head"></div><div class="body"></div><div class="gun"></div>`;
  e.style.left=Math.random()*480+"px";
  e.style.top=Math.random()*320+"px";
  game.appendChild(e);
  enemies.push(e);
}
setInterval(spawnEnemy,2000);

// LOOP
setInterval(()=>{
  movePlayer();

  bullets.forEach((b,i)=>{
    b.el.style.left=b.el.offsetLeft+b.vx+"px";
    b.el.style.top=b.el.offsetTop+b.vy+"px";

    if(
      b.el.offsetLeft<0||b.el.offsetLeft>520||
      b.el.offsetTop<0||b.el.offsetTop>360||
      hit(b.el.offsetLeft,b.el.offsetTop,6)
    ){
      b.el.remove(); bullets.splice(i,1);
    }

    enemies.forEach((en,j)=>{
      if(
        b.el.offsetLeft<en.offsetLeft+26 &&
        b.el.offsetLeft+6>en.offsetLeft &&
        b.el.offsetTop<en.offsetTop+36 &&
        b.el.offsetTop+6>en.offsetTop
      ){
        en.remove(); enemies.splice(j,1);
        b.el.remove(); bullets.splice(i,1);
      }
    });
  });

  enemies.forEach((en,i)=>{
    const dx=px-en.offsetLeft;
    const dy=py-en.offsetTop;
    const dist=Math.hypot(dx,dy);
    en.style.left=en.offsetLeft+dx/dist*1.2+"px";
    en.style.top=en.offsetTop+dy/dist*1.2+"px";

    if(dist<18){
      en.remove(); enemies.splice(i,1);
      hp--; hpText.textContent="HP: "+hp;
      if(hp<=0) gameOver();
    }
  });
},30);

function gameOver(){
  alert("MISSION FAILED");
  location.reload();
}

function back(){
  location.href="../../index.html";
}
