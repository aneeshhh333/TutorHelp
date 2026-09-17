document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu-btn'), links=document.querySelector('.nav-links');
 if(menu&&links){
   menu.addEventListener('click',()=>{
     links.classList.toggle('open');
     menu.setAttribute('aria-expanded',links.classList.contains('open'));
   });
   links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
   const st=links.querySelector('.students-caret'), sd=links.querySelector('.nav-dropdown');
   if(st&&sd){
     st.addEventListener('click',e=>{
       e.preventDefault();
       e.stopPropagation();
       sd.classList.toggle('collapsed');
       st.setAttribute('aria-expanded',!sd.classList.contains('collapsed'));
     });
   }
 }
 document.querySelectorAll('form[data-demo]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const s=form.parentElement.querySelector('.success');if(s){s.style.display='block';s.scrollIntoView({behavior:'smooth',block:'center'});}form.reset();}));
});
