(function(){
const languages={pt:'pt-BR',en:'en',ko:'ko'};
const buttons=[...document.querySelectorAll('[data-lang]')];
const texts=[...document.querySelectorAll('[data-translate]')];
texts.forEach(el=>el.dataset.pt=el.textContent);
function setLanguage(lang){if(!languages[lang])lang='pt';document.documentElement.lang=languages[lang];
 texts.forEach(el=>{el.textContent=lang==='pt'?el.dataset.pt:(el.dataset[lang]||el.dataset.pt)});
 buttons.forEach(b=>{const on=b.dataset.lang===lang;b.setAttribute('aria-pressed',String(on));b.classList.toggle('selected',on)});
 localStorage.setItem('portfolio-language',lang);
}
buttons.forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
setLanguage(localStorage.getItem('portfolio-language')||'pt');
})();