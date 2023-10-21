// Изменение стиля менюшки navbar на скролле

window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0)
});

// Раскрытие/закрытие дива с вопросами faq answer p

const faqs = document.querySelectorAll('.faq');

faqs.forEach( faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('open');
      
        const icon = faq.querySelector('.faq_icon');
        
        if(faq.classList.contains("open")){
            icon.innerHTML = '<i class="fa-solid fa-minus" style="color: #ffffff;"></i>';
        } else {
            icon.innerHTML = '<i class="fa-solid fa-plus" style="color: #ffffff;"></i>';
        }
    })
});

// Раскрытие/закрытие Адапнивного меню

const menu = document.querySelector('.nav_menu');
const openMenuBtn = document.querySelector('#open-menu-btn');
const closeMenuBtn = document.querySelector('#close-menu-btn');

openMenuBtn.addEventListener('click', () => {
    menu.style.display = "flex";
    closeMenuBtn.style.display = "inline-block";
    openMenuBtn.style.display = "none";
})

// close nav menu func
const closeNav = () => {
    menu.style.display = "none";
    closeMenuBtn.style.display = "none";
    openMenuBtn.style.display = "inline-block";
}

closeMenuBtn.addEventListener('click', closeNav);