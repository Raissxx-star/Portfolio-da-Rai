const root=document.documentElement;
const theme=document.querySelector('[data-theme]');
const saved=localStorage.getItem('portfolio-theme');
if(saved==='light') root.classList.add('light');
function themeIcon(){if(theme) theme.textContent=root.classList.contains('light')?'☾':'☼';}
theme?.addEventListener('click',()=>{root.classList.toggle('light');localStorage.setItem('portfolio-theme',root.classList.contains('light')?'light':'dark');themeIcon()});themeIcon();

const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));

const current=document.body.dataset.page;
document.querySelectorAll('.nav a').forEach(a=>{if(a.dataset.page===current)a.classList.add('active')});
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

const flame=document.querySelector('.flame');let mx=-100,my=-100,fx=-100,fy=-100;
if(flame&&matchMedia('(pointer:fine)').matches){document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;flame.style.opacity=1;const s=document.createElement('i');s.className='spark';s.style.left=(e.clientX+(Math.random()*12-6))+'px';s.style.top=(e.clientY+(Math.random()*12-6))+'px';document.body.appendChild(s);s.animate([{transform:'scale(1)',opacity:.8},{transform:'translateY(18px) scale(.1)',opacity:0}],{duration:500+Math.random()*250,easing:'ease-out'}).onfinish=()=>s.remove()});document.addEventListener('mouseleave',()=>flame.style.opacity=0);function move(){fx+=(mx-fx)*.2;fy+=(my-fy)*.2;flame.style.left=fx+'px';flame.style.top=fy+'px';requestAnimationFrame(move)}move()}

// Preferência de contraste mantida entre páginas.
const visionButton=document.querySelector('[data-vision]');
const visionSaved=localStorage.getItem('portfolio-vision')==='on';
root.classList.toggle('vision',visionSaved);
function syncVision(){if(visionButton){const on=root.classList.contains('vision');visionButton.setAttribute('aria-pressed',String(on));visionButton.setAttribute('aria-label',on?'Desativar modo de alto contraste':'Ativar modo de alto contraste');visionButton.title=on?'Desativar alto contraste':'Ativar alto contraste e paleta azul/amarelo';}}
visionButton?.addEventListener('click',()=>{const on=root.classList.toggle('vision');localStorage.setItem('portfolio-vision',on?'on':'off');syncVision()});
syncVision();

// Navegação móvel acessível por toque e teclado.
const menuButton=document.querySelector('[data-menu-toggle]');
const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('nav-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.firstChild.textContent=open?'✕ ':'☰ ';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('nav-open')){nav.classList.remove('nav-open');menuButton?.setAttribute('aria-expanded','false');menuButton?.focus()}});
