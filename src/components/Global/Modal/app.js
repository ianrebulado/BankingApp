const openModal = document.querySelector('.open')
const modalCont = document.querySelector('.modal-container')
const closeModal = document.querySelector('#close');

openModal.addEventListener('click', () => {
    modalCont.classList.add('show')
})

closeModal.addEventListener('click', () => {
    modalCont.classList.remove('show')
})


