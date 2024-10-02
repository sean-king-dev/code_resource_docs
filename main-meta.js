function toggleMegaMenu(e, t) {
    t.preventDefault();
    var a = $(e).attr("data-menu");
    $(".mega-menu").find(".content").removeClass("active");
    $(".mega-menu").find('.content[data-menu="' + a + '"]').addClass("active");
    $(".nav-menu").find(".crossed_img").removeClass("active");
    $(".nav-menu").find('.crossed_img[data-menu="' + a + '"]').addClass("active");
    $(".navigation a").removeClass("active");
    $(".multi-buttons").find("button").removeClass("active");
  //   $(".multi-buttons").find("button").first().addClass("active"); 
  //   $(".multi-buttons").find("mega-menu-button").removeClass("active");
  //   $(".multi-buttons").find("mega-menu-button").first().addClass("active"); 
    $(".step").removeClass("previous active");
    $(e).addClass("active"), checkCoursesStep();
    
  //   let top = getMegaMenuTop();
    //var e1 = $(".navigation").outerHeight();
  //   $(".mega-menu.modal").css("top", top);
    $(".mega-menu").hasClass("active") || $(".mega-menu").addClass("active");
    $(".navigation .constrainer").css("background", "#252f38");
    if ($(".content.active .step").hasClass("multi-step")) {
      //   var e4 = $(".content.active .multi-step").outerHeight();
      //   var e3 = $(".content.active .step.active").outerHeight();
      //   var e2 = parseInt(e3) + parseInt(e4);
    } else {
      //   var e2 = $(".content.active .step").outerHeight();
    }
  //   $(".modal.active.mega-menu").css("height", parseInt(e2) + 50);
    if ($(".content.active").data("menu") == "locations") {
        $(".mega-menu.modal.active .content.active .menus")
            .filter(function () {
                return $.trim($(this).text()) === "" && $(this).children().length == 0;
            })
            .remove();
        $(".mega-menu.modal.active .content.active .menus").addClass("mobile_destination");
    }
    //somehow in menuNew its create empty menu in start so removing empty menu
    $(".mega-menu.modal.active .content.active .menus")
        .filter(function () {
            return $.trim($(this).text()) === "" && $(this).children().length == 0;
        })
        .remove();
    if ($(".mega-menu").hasClass("active") && $(".navigation").hasClass("scrolled")) {
      //   var e1 = $(".navigation").outerHeight();
      //   $(".mega-menu.modal.active").css("top", parseInt(e1));
    }
  }
  
  function closeMegaMenu() {
    /* $(".step").removeClass("previous active"),
     $(".bar").removeClass("active"),
     $(".modal").removeClass("active"),
     $(".navigation .mob-wrap").removeClass("hide"),
     $("html, body").css("overflow-y","")*/
    $(".step").removeClass("previous active"), $(".bar").removeClass("active"), $(".modal").removeClass("active"), $(".navigation .mob-wrap").removeClass("hide"), $("html, body").css("overflow-y", "");
    $(".navigation .constrainer").css("background", "unset");
    $(".mega-menu.modal.active").css("top", "unset");
    // $("nav a.Navmenu_link" ).next('img').remove();
    $("nav a.Navmenu_link").removeClass("active");
    $(".nav-menu").find(".crossed_img").removeClass("active");
  }

  
//   


const menuButton = document.querySelector("a#menu-icon");

// Function to open mobile navigation
function openMobileNav() {
    $(".mega-menu").find(".content").removeClass("active");
    $(".mega-menu").find('.content[data-menu="mobile-menu"]').addClass("active");
    $(".navigation a").removeClass("active");
    $(".multi-buttons").find("button").removeClass("active");
    $(".step").removeClass("previous active");
    if (!$(".mega-menu").hasClass("active")) {
        $(".mega-menu").addClass("active");
    }
    $("html, body").css("overflow-y", "hidden");
    $(".navigation .mob-wrap").addClass("hide");

    fadeOutHamburger();
}

function closeMegaMenu() {
    // Restore the hamburger menu
    fadeInHamburger();

    $(".mega-menu").removeClass("active");
    $("html, body").css("overflow-y", "auto");
    $(".navigation .mob-wrap").removeClass("hide");
}

// Function to fade out the hamburger menu
function fadeOutHamburger() {
    menuButton.style.transition = "opacity 0.5s ease"; // Transition effect
    menuButton.style.opacity = "0"; // Fade out
    setTimeout(() => {
        menuButton.style.display = "none"; // Hide after fade out
    }, 500); // Match this duration with the CSS transition duration
}

// Function to fade in the hamburger menu
function fadeInHamburger() {
    menuButton.style.display = "inline-block"; // Make it visible
    setTimeout(() => {
        menuButton.style.transition = "opacity 0.5s ease"; // Transition effect
        menuButton.style.opacity = "1"; // Fade in
        // Animate back to hamburger after fade in
        menuButton.classList.remove("close"); // Ensure it transitions back to hamburger
    }, 10); // Small timeout to trigger transition
}

// Toggle between hamburger and close (X) state
menuButton.addEventListener("click", function(e) {
    e.preventDefault();
    menuButton.classList.toggle("close");
});