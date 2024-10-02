let left_button = document.getElementById('btnLeft');
let right_button = document.getElementById('btnRight');

function openLeftModal() {
    console.log('Left modal opened');
    let leftModal = document.getElementById('leftModal');
    let rightModal = document.getElementById('rightModal');
    let modalWrapper = document.getElementById('modal_wrapper');

    left_button.style.display = 'none';
    right_button.style.display = 'block';
    right_button.style.right = "-50%";

    // leftModal.classList.toggle('active');
    leftModal.classList.add('active');
    rightModal.classList.remove('active');

    modalWrapper.classList.toggle('modal-open', leftModal.classList.contains('active'));

    document.getElementById('right_modal_wrapper').classList.remove('active-right');

    document.getElementById('left_modal_wrapper').classList.add('active-left');

}


function openRightModal() {
    console.log('Right modal opened');
    let leftModal = document.getElementById('leftModal');
    let rightModal = document.getElementById('rightModal');
    let modalWrapper = document.getElementById('modal_wrapper');

    leftModal.classList.remove('active');
    // rightModal.classList.toggle('active');
    rightModal.classList.add('active');

    modalWrapper.classList.toggle('modal-open', rightModal.classList.contains('active'));

    document.getElementById('left_modal_wrapper').classList.remove('active-left');

    document.getElementById('right_modal_wrapper').classList.add('active-right');

    right_button.style.display = 'none';
    left_button.style.display = 'block';

}