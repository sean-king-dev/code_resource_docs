jQuery(document).ready(function () {

    CreateSelectOption();
    LayoutBlockBackgroundImage();


    // css styles for landing block now dealt with in landingpage.css

    // add css selector to style Landing page header college title - ATF
    $('.heading_college_title span').addClass('bold_text');
    $('.heading_college_title span').addClass('title_space');
    if (window.matchMedia("(min-width:800.2px)").matches) {
        // code here
        $('.heading_college_title span:nth-child(1)').addClass('ATFTextDesktop');
    }

    if (window.matchMedia("(max-width:800px)").matches) {
        // code here
        $('.heading_college_title span:nth-child(1)').addClass('ATFTextMobile');
    }

    // add css selector to style Landing page block title - purple block
    $('.heading_block_title h2').addClass('kings_landingpage_title_block');
    $('.heading_block_title h2').addClass('h2_position');
    $('.heading_block_title h2').addClass('kings-brighton-section');

    $('.heading_block_title h2 span').addClass('bold_text');
    $('.heading_block_title h2 span').addClass('title_space');

    // target different landing blocks on kpu
    $('body.landingpage-us-uni #section_1').addClass('.purple_bg');
    $('body.landingpage-us-uni #section_2').addClass('.coral_bg');
});

function navHoverLinks() {

    // add active class to selected li item
    $('#landingpage-links li').removeClass('active');

    $(this).addClass('active');
}

function CreateSelectOption() {
    $('.form-fields').find('select').each(function () {
        var select_val = $(this).data("value");
        var option_list = new Array();
        option_list = select_val.split(",");
        for (var i = 0; i < option_list.length; i++) {
            $(this).append($('<option>').text(option_list[i]).attr('value', option_list[i]).attr('class', 'select-option'));
        }
    });

    $('.form-fields').find('input[type="text"],input[type="email"],input[type="tel"],textarea,select').each(function () {
        var field_name_val = $(this).data("label");
        var field_name = field_name_val.replace(' ', '_');

        $(this).attr('name', field_name);
    });
}

function LayoutBlockBackgroundImage() {
    $('.landingpage-blocks').find('#landingpage_block_layout').each(function () {
        var back_image = $(this).data("back");
        var back_image_mobile = $(this).data("mobileback");
        if (window.matchMedia("(max-width: 800px)").matches) {
            if (back_image_mobile !== "") {
                // $(this).css('background-image', 'url("' + back_image_mobile + '")');
                $(this).css('background-image', 'url("' + back_image + '")');
            } else {
                $(this).css('background-image', 'url("' + back_image + '")');
            }
        } else {
            $(this).css('background-image', 'url("' + back_image + '")');
        }

    });
}

// js for modal
const modals = document.querySelectorAll('[data-modal]');

modals.forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {

        event.preventDefault();

        const modal = document.getElementById(trigger.dataset.modal);

        modal.classList.add('open');

        const exits = modal.querySelectorAll('.modal-exit');

        exits.forEach(function (exit) {
            exit.addEventListener('click', function (event) {
                event.preventDefault();
                modal.classList.remove('open');
                lp_closeModal();
            });
        });
    });
});

var lp_breakpoint;
// ios modal experiment
$(document).ready(function () {
    lp_breakpoint = lp_getBreakpoint();
    lp_setBreakpoint();
});

function lp_setBreakpoint() {

    let fTitle = $(".form_title");
    if (lp_breakpoint == "mobile") {
        if (!$('.form_first_title a').length) {
            $('.form_first_title').append('<br>');
            var m = $('.form_sec_title a').addClass('bold_mobile_number').clone();
            m.appendTo('.form_first_title');
        }
        fTitle.appendTo("#mobile_view");
    } else {
        fTitle.prependTo("#desktop_view #form");
    }
}


function lp_openModal() {
    $('#form-wrap').appendTo('#form_modal');
    $('div.form_title').hide();
    // mobile modal
    var m = $('#modal_form_number a').clone();
    let div_m = $('<div id="modal_mobile_phone"></div>').append(m);
    if (window.matchMedia("(max-width: 1024px)").matches) {
        div_m.appendTo('.form_first_title');
    }
    div_m.appendTo('#modal_footer_contact_us');
    $('#modal_footer_contact_us').css('opacity', 1).show();
    rescaleCaptcha();

    let cont = $('.modal-container');
    let ch = Math.ceil(cont.height());
    let wh = Math.ceil($(window).height());

    let top = 0;
    if (wh > ch) {
        top = Math.floor((wh - ch) / 2);
    }
    //   cont.css('marginTop', top + 'px');

    $('#form_modal').addClass('open');
}

function lp_closeModal() {
    lp_resetForm();
    $('div.form_title').show();
    $('#form-wrap').appendTo('#desktop_view');
    $('#modal_mobile_phone').remove();
}


// kpu section
$(document).ready(function () {

    $('.heading_block_title h2, h1').each(function (index) {
        // add section_0 to atf block
        $('.landing-block').attr('id', 'section_0').addClass('anchor-padding section_position');
        //Add an ID tag to the parent block
        let id = 'section_' + index;
        $(this).parents('.landingpage-blocks').first().attr('id', id).addClass('anchor-padding section_position');

        // //get the section title
        let title = $(this).html();
        // //Replace <br> with a space
        title = title.split('<br>').join(' ');
        // //Remove HTML tags from
        title = title.replace(/(<([^>]+)>)/gi, "");

        var navContainer = $("#landingpage-links"); // finds container with the id "landingpage-links"
        let baseUrl = document.location.href.split('#')[0];
        navContainer.append(`<li id="navLinkHover"><a href="${baseUrl}#${id}">${title}</a></li>`);

    });

    $('body.landingpage-uk-uni div#section_1.landingpage-blocks div#landingpage_block_layout div.content div.heading_block_title h2 br').replaceWith(' ');

    // add class to h2's
    $('h2').addClass('h2_position');

    if (window.matchMedia("(min-width: 800px)").matches) {
        $('.heading_college_title br').replaceWith('  ');
    }

    $(".heading_block_title span br").replaceWith("  ");

    $('h2.h2_position.kings_landingpage_title_block.kings-brighton-section br').replaceWith(' ');

    // remove span from mobile landing header title block
    if (window.matchMedia("(max-width:800px)").matches) {
        // code here
        $(".heading_title h1").addClass("mobile-atf-h1");

        $(".heading_title h1 span").contents().unwrap();

    }

    //lp_handleFormResponse();

    $('#lp-form-close').on('click', function () {
        lp_resetForm();
    });

    //Intercept form submit.
    $('#form_section_wrapper form').submit(function (evt) {
        evt.preventDefault();

        let form = $(this);
        if (form.hasClass('posting')) {
            return;
        }

        if (!recaptcha_token) {
            return recaptcha_markInvalid();
        }

        form.addClass('posting');
        let formUrl = $(this).attr('action');
        let arrayData = $(this).serializeArray();

        let formData = {};
        arrayData.forEach(function (item) {
            formData[item.name] = item.value;
        });


        $('#form, #modal_footer_contact_us').animate({
            opacity: 0,
        }, {
            duration: 5000,

        });
        $('#lp-formloading').css('display', 'flex');
        $('#lp-formloading').animate({ opacity: 1 });

        //setTimeout(lp_handleFormResponse, 5000);
    //return;
        //console.log("Posting", formUrl, formData);
        $.ajax({
            type: "POST",
            url: formUrl,
            data: formData,
            success: function (data) {
                lp_handleFormResponse(data);
            }
        });
    });
});

function lp_handleFormResponse() {
    //$('#lp-formloading').css('display', 'flex');

    $('#form_section_wrapper form').removeClass('posting');
    $('#lp-formloading').animate({ opacity: 0 });
    $('#form').stop().css('opacity', 0);
    $('#thank-you-message').show();

    let is_mobile = ($('#form-wrap').parent().attr('id') == 'form_modal');
    if (!is_mobile) {
        $('#lp-form-close').show();
    } else {
        $('#modal_footer_contact_us').hide();
    }
    //     $('.form_first_title').css("visibility", "hidden");
    //     $('.form_sec_title').css("visibility", "hidden");
    //     $('form#contact-form.form-nolabels').css("visibility", "hidden");
    //     $('#modal_footer_contact_us').css("visibility", "hidden");

    //     var numberClone = $('#modal_form_number a').clone().prepend('<br>');
    //     $(thankYou).appendTo('#form_section_wrapper');
    //     numberClone.appendTo('p#in-touch-message');
    // 
}

function lp_resetForm() {
    $('#thank-you-message').hide();
    $('#form').show().css('opacity', 1);
    $('#lp-formloading').css({
        display: 'none',
        opacity: 0
    });
    $('#lp-form-close').hide();
    $('#form input, select, textarea').each(function () {
        let field = $(this);
        if (field.attr('type') != 'hidden') {
            field.val('');
        }
    });

    grecaptcha.reset();
    recaptcha_token = false;
}

/** RECAPTCHA */
var recaptcha_token = false;
function recaptcha_callback(token) {
    recaptcha_token = token;
    recaptcha_markValid();
}

function recaptcha_expired(arguments) {
    recaptcha_token = false;
}

function recaptcha_markValid() {
    $('.g-recaptcha').css({
        border: '',
        borderRadius: '',
        marginRight: '',
        background: ''
    });
}

function recaptcha_markInvalid() {
    $('.g-recaptcha').css({
        border: '2px solid red',
        borderRadius: '5px',
        marginRight: '4px',
        background: 'white'
    });
}

function rescaleCaptcha() {
    var width = $('.g-recaptcha').parent().width();
    var scale;
    if (width < 302) {
        scale = width / 302;
    } else {
        scale = 1.0;
    }
    $('.g-recaptcha').css('transform', 'scale(' + scale + ')');
    $('.g-recaptcha').css('-webkit-transform', 'scale(' + scale + ')');
}

function lp_getBreakpoint() {
    if (window.matchMedia("(max-width:992px)").matches) {
        return "mobile";
    }
    return "desktop";
}


function lp_initLayout() {
    let breakpoint = lp_getBreakpoint();
    if (breakpoint != lp_breakpoint) {
        lp_breakpoint = breakpoint;
        console.log("NEW BREAKPOINT", lp_breakpoint);
        lp_setBreakpoint();
    }
    rescaleCaptcha();

    const doc = document.documentElement;
    // console.log(doc.clientWidth, window.innerWidth);
    //doc.style.setProperty('--window-inner-width', `${window.innerWidth-20}px`);

    let navHeight = $('#nav_header_position').height();
    if (lp_breakpoint == 'mobile') {
        navHeight = 0;
    }
    $('#section_0').css('marginTop', `${navHeight}px`);

    let sec0_width = $('#section_0').width();
    $('#landingpage_nav_section').width(sec0_width);
}

$(function () {
    $(window).resize(lp_initLayout);
    lp_initLayout();
});


// test

// Assuming you have Jest set up

// Mocking jQuery
const $ = require('jquery')(require('jsdom').jsdom().defaultView);

describe('Document Ready Tests', () => {
    beforeEach(() => {
        // Set up HTML structure for tests
        document.body.innerHTML = `
            <div class="heading_college_title">
                <span>College Title</span>
            </div>
            <div class="heading_block_title">
                <h2><span>Block Title</span></h2>
            </div>
            <div class="form-fields">
                <select data-value="Option1,Option2"></select>
                <input type="text" data-label="First Name" />
            </div>
            <div class="landingpage-blocks" id="landingpage_block_layout" data-back="image.jpg" data-mobileback="mobile-image.jpg"></div>
            <ul id="landingpage-links"></ul>
        `;
        
        // Reset any prior classes added
        $('.heading_college_title span').removeClass('bold_text title_space ATFTextDesktop ATFTextMobile');
        $('.heading_block_title h2').removeClass('kings_landingpage_title_block h2_position kings-brighton-section');
        $('#landingpage_block_layout').removeAttr('style');
    });

    test('should add classes to the college title based on viewport', () => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query === "(min-width:800.2px)", // Simulate desktop view
        }));

        $(document).ready(); // Call your ready function

        expect($('.heading_college_title span').hasClass('ATFTextDesktop')).toBe(true);
        expect($('.heading_college_title span').hasClass('ATFTextMobile')).toBe(false);
    });

    test('should create select options from data-value', () => {
        $(document).ready();

        const select = $('.form-fields select');
        expect(select.find('option').length).toBe(2);
        expect(select.find('option').eq(0).text()).toBe('Option1');
        expect(select.find('option').eq(1).text()).toBe('Option2');
    });

    test('should set the background image for landing blocks', () => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query === "(max-width: 800px)", // Simulate mobile view
        }));

        $(document).ready();

        expect($('#landingpage_block_layout').attr('style')).toContain('background-image: url("image.jpg")');
    });

    // Add more tests for other functionalities as needed
});

