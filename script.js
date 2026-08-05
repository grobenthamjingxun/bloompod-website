(() => {
  const menuToggle=document.querySelector('.menu-toggle');
  const navMenu=document.querySelector('.nav-menu');
  const navLinks=document.querySelectorAll('.nav-menu a');
  const modal=document.querySelector('[data-modal]');
  const openDemo=document.querySelector('[data-open-demo]');
  const closeDemo=document.querySelectorAll('[data-close-demo]');
  const range=document.querySelector('[data-demo-range]');
  const value=document.querySelector('[data-demo-value]');
  const openImage=document.querySelector('.demo-open');
  const closedImage=document.querySelector('.demo-closed');

  menuToggle?.addEventListener('click',()=>{
    const open=menuToggle.getAttribute('aria-expanded')==='true';
    menuToggle.setAttribute('aria-expanded',String(!open));
    navMenu.classList.toggle('open',!open);
  });

  navLinks.forEach(link=>link.addEventListener('click',()=>{
    navMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded','false');
  }));

  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
    });
  },{rootMargin:'-35% 0px -55% 0px'});
  document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));

  const showModal=()=>{modal.hidden=false;document.body.classList.add('modal-open')};
  const hideModal=()=>{modal.hidden=true;document.body.classList.remove('modal-open')};
  openDemo?.addEventListener('click',showModal);
  closeDemo.forEach(btn=>btn.addEventListener('click',hideModal));
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)hideModal()});

  range?.addEventListener('input',e=>{
    const amount=Number(e.target.value);
    value.textContent=`${amount}%`;
    openImage.style.opacity=amount/100;
    closedImage.style.opacity=1-amount/100;
  });
})();