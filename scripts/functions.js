// Alert modal box ===================================

function topNav() {
    let x = $('top-nav')[0];
    if (x.dataset.active) {
        x.dataset.active = ""
    } else {
        x.dataset.active = "1"
    }
}

let modal = $('modal-box')[0];
let close = $("#close");

function alert(header='Повідомлення', text) {
    clearModal();
    $("#modal-header #header").text(header)
    let modalText = $("#modal-body #text")

    for (let p of text.split("||")) {
        $("<p>").text(p).appendTo(modalText)
    }

    modal.style.display = "block";
}

clearModal = () => document.querySelectorAll("#header, #text p").forEach(e => e.textContent='')

close.click(() => {modal.style.display = "none"; clearModal()})

window.onclick = e => {
    if (e.target == modal) {
        clearModal();
        modal.style.display = "none";
    }
}


let slideIndex = 1;
showSlides(slideIndex);

const plusSlides = n => showSlides(slideIndex += n);
const currentSlide = n => showSlides(slideIndex = n);

function showSlides(n) {
    let i;
    let slides = $("my-slide", "all")[0];
    let dots = $(".dot", "all")[0];
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (let i of slides) i.style.display = "none";
    for (let i of dots) i.className = i.className.replace(" active", "");

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}