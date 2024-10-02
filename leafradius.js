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
