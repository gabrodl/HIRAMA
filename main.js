/* abre e fecha o menu quando clica no icone hamburguer ou x*/
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/*Scroll suave */
//1- pegar todos os itens do menu
//ao clicar em algum item rolar
//a pagina suavemente para a seção desejada.
function scrollSmooth(link) {
  const sectionId = link.getAttribute('href')
  document.querySelector(sectionId).scrollSmooth({ behavior: 'smooth' })
}

/* quando clicar em um item,fechar menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function (event) {
    nav.classList.remove('show')

    scrollSmooth(link)

    event.preventDefault()
  })
}

/*testimonials carousel*/
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

/* ScrollReveal : mostrar elementos animadamento ao dar scroll na pagina*/
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/*mudar header ao dar scroll*/

function changeHeaderWhenScroll() {
  const header = document.querySelector('#header')
  const navHeigth = header.offsetHeight

  if (window.scrollY >= navHeigth) {
    //scroll maior que altura do header
    header.classList.add('scroll')
  } else {
    //scroll maior que a altura do header
    header.classList.remove('scroll')
  }
  for (const element of links) {
    if (window.scrollY >= navHeigth) {
      //scroll maior que altura do header
      element.classList.add('scroll')
    } else {
      //scroll maior que a altura do header
      element.classList.remove('scroll')
    }
  }
}

/*menu ativo conforme a sessão visivel na pagina*/
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeigh = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeigh

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/*correção da cor do menu ativo*/

/* Botão voltar para o topo*/
function backToTopButton() {
  const backToTopButton = document.querySelector('.back-to-top')

  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/*when scroll*/
window.addEventListener('scroll', function () {
  backToTopButton()
  changeHeaderWhenScroll()
  activateMenuAtCurrentSection()
})
