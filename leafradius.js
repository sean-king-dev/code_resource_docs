window.addEventListener("DOMContentLoaded", function () {
    function radius_doLeaves() {
        var tl = "40px 0px 0px 0px",
            tr = "0px 40px 0px 0px",
            br = "0px 0px 0px 40px",
            bl = "0px 0px 40px 0px";

        document.querySelectorAll('.field-leaflist').forEach(function(list) {
            let type = (window.innerWidth <= 800) ? 'mobile' : 'desktop';
            if (list.getAttribute('data-type') === type) {
                return;
            }
            list.setAttribute('data-type', type);

            let row = 1;
            list.querySelectorAll('.leaf').forEach(function(leaf, index) {
                let radius = tl;
                let odd = (index % 2);

                if (type === 'desktop') {
                    radius = (odd) ? tr : tl;
                    if (index > 3) {
                        radius = (odd) ? bl : br;
                    }
                } else {
                    radius = tr;
                    if (index > 0) {
                        let rowOdd = (row % 2);
                        radius = (!odd) ? tr : br;
                        if (rowOdd) {
                            radius = (odd) ? tl : bl;
                        }
                        if (!odd) {
                            row++;
                        }
                    }
                }

                leaf.style.borderRadius = radius;
                leaf.querySelector('div').style.borderRadius = radius;
            });
        });
    }

    radius_doLeaves();

});


//  test 


// Assuming you have Jest set up and jQuery is not required
const { JSDOM } = require('jsdom');

describe('radius_doLeaves function', () => {
    let dom;
    let container;

    beforeEach(() => {
        // Set up the DOM for tests
        dom = new JSDOM(`
            <div class="field-leaflist" data-type="desktop">
                <div class="leaf"><div></div></div>
                <div class="leaf"><div></div></div>
                <div class="leaf"><div></div></div>
                <div class="leaf"><div></div></div>
                <div class="leaf"><div></div></div>
            </div>
        `);

        global.window = dom.window;
        global.document = dom.window.document;

        // Reset the inner width
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
        });
    });

    test('should set correct border-radius for desktop view', () => {
        window.innerWidth = 1200; // Simulate desktop view
        window.dispatchEvent(new Event('DOMContentLoaded'));

        const leaves = document.querySelectorAll('.leaf');
        expect(leaves[0].style.borderRadius).toBe('40px 0px 0px 0px'); // First leaf
        expect(leaves[1].style.borderRadius).toBe('0px 40px 0px 0px'); // Second leaf
        expect(leaves[2].style.borderRadius).toBe('40px 0px 0px 0px'); // Third leaf
        expect(leaves[3].style.borderRadius).toBe('0px 0px 0px 40px'); // Fourth leaf
        expect(leaves[4].style.borderRadius).toBe('0px 0px 40px 0px'); // Fifth leaf
    });

    test('should set correct border-radius for mobile view', () => {
        window.innerWidth = 600; // Simulate mobile view
        window.dispatchEvent(new Event('DOMContentLoaded'));

        const leaves = document.querySelectorAll('.leaf');
        expect(leaves[0].style.borderRadius).toBe('0px 40px 0px 0px'); // First leaf
        expect(leaves[1].style.borderRadius).toBe('0px 0px 40px 0px'); // Second leaf
        expect(leaves[2].style.borderRadius).toBe('0px 40px 0px 0px'); // Third leaf
        expect(leaves[3].style.borderRadius).toBe('0px 0px 40px 0px'); // Fourth leaf
        expect(leaves[4].style.borderRadius).toBe('0px 0px 40px 0px'); // Fifth leaf
    });

    test('should update data-type attribute correctly', () => {
        window.innerWidth = 600; // Simulate mobile view
        window.dispatchEvent(new Event('DOMContentLoaded'));

        const list = document.querySelector('.field-leaflist');
        expect(list.getAttribute('data-type')).toBe('mobile'); // Check updated data-type

        window.innerWidth = 1200; // Simulate desktop view
        window.dispatchEvent(new Event('DOMContentLoaded'));
        
        expect(list.getAttribute('data-type')).toBe('desktop'); // Check updated data-type
    });
});
