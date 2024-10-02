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


// test 

// modal.test.js

// Import your modal functions
// Assuming the functions are defined in modal.js
const { openLeftModal, openRightModal } = require('./modal');

describe('Modal Functionality', () => {
    let left_button, right_button, leftModal, rightModal, modalWrapper;

    beforeEach(() => {
        // Set up the DOM elements
        document.body.innerHTML = `
            <div id="modal_wrapper"></div>
            <div id="leftModal"></div>
            <div id="rightModal"></div>
            <button id="btnLeft" style="display: block;"></button>
            <button id="btnRight" style="display: none;"></button>
            <div id="left_modal_wrapper"></div>
            <div id="right_modal_wrapper"></div>
        `;

        left_button = document.getElementById('btnLeft');
        right_button = document.getElementById('btnRight');
        leftModal = document.getElementById('leftModal');
        rightModal = document.getElementById('rightModal');
        modalWrapper = document.getElementById('modal_wrapper');
    });

    test('openLeftModal opens left modal and hides left button', () => {
        openLeftModal();

        expect(left_button.style.display).toBe('none');
        expect(right_button.style.display).toBe('block');
        expect(leftModal.classList.contains('active')).toBe(true);
        expect(rightModal.classList.contains('active')).toBe(false);
        expect(modalWrapper.classList.contains('modal-open')).toBe(true);
        expect(document.getElementById('left_modal_wrapper').classList.contains('active-left')).toBe(true);
        expect(document.getElementById('right_modal_wrapper').classList.contains('active-right')).toBe(false);
    });

    test('openRightModal opens right modal and hides right button', () => {
        // First, we need to open the left modal to simulate a realistic scenario
        openLeftModal();

        openRightModal();

        expect(left_button.style.display).toBe('block');
        expect(right_button.style.display).toBe('none');
        expect(leftModal.classList.contains('active')).toBe(false);
        expect(rightModal.classList.contains('active')).toBe(true);
        expect(modalWrapper.classList.contains('modal-open')).toBe(true);
        expect(document.getElementById('left_modal_wrapper').classList.contains('active-left')).toBe(false);
        expect(document.getElementById('right_modal_wrapper').classList.contains('active-right')).toBe(true);
    });
});
