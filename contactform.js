document.addEventListener("DOMContentLoaded", function () { 
 
 //Validate the required fake_selects
 let select_divs = document.querySelectorAll(
    "#kings-enquiry-form .fake-select"
  );

  select_divs.forEach(function (div) {
    let id = $(div).attr("id");
    let select = $(div).parent().find("select");
    console.log("Select:", select);
    if (select.length) {
      let val = select.val().trim();
      let required = select.attr("required");
      if (val.length === 0 && required) {
        $(div).css("border", "2px solid red");
        valid = false;
      } else {
        $(div).css("border", "2px solid #59c6e7");
      }
    }
  });

  //validate captcha
  if (!recaptcha_token) {
    $("#kings-enquiry-form .g-recaptcha").css({
      border: "2px solid red",
      borderRadius: "5px",
      marginRight: "4px",
      background: "white",
    });

    valid = false;
  } else {
    recaptcha_markValid();
  }

  return valid;
});

//   ////////////////////////////////////////////////////////////////////////////////////////////
//   // end recpatcha
//   ////////////////////////////////////////////////////////////////////////////////////////////

// window.addEventListener("DOMContentLoaded", (event) => {
//   let elements = document.querySelectorAll("#kings-enquiry-form input");
//   for (let i = 0; i < elements.length; i++) {
//     elements[i].oninvalid = function (e) {
//       e.target.setCustomValidity("");
//       if (!e.target.validity.valid) {
//         e.target.setCustomValidity("This field cannot be left blank");
//         e.target.style.border = "2px solid red";
//       }
//     };
//     elements[i].oninput = function (e) {
//       e.target.setCustomValidity("");
//       e.target.style.border = "2px solid #59c6e7";
//     };
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
const selectElements = document.querySelectorAll("select.initial");

selectElements.forEach(function (selectElement) {
  selectElement.addEventListener("change", function () {
    this.classList.remove("initial");
  });
});
});

/////////////////////////////////////////////////////////////////////////////////////////////
// toggle up-down angles

document.addEventListener("DOMContentLoaded", function () {
const droppers = document.querySelectorAll(".dropper");

droppers.forEach(function (dropper) {
  const fakeSelect = dropper.closest(".fake-select");
  const dropdown = fakeSelect.querySelector(".dropdown");
  const angleDown = dropper.querySelector(".fa-angle-down");
  const angleUp = dropper.querySelector(".fa-angle-up");
  const hiddenSelect = fakeSelect.nextElementSibling;

  const isDropdownVisible = dropdown.style.height === "auto";

  if (isDropdownVisible) {
    dropdown.style.overflowY = "auto";
    angleDown.style.display = "none";
    angleUp.style.display = "inline-block";
    fakeSelect.classList.add("active");
  } else {
    dropdown.style.overflowY = "hidden";
    angleDown.style.display = "inline-block";
    angleUp.style.display = "none";
    fakeSelect.classList.remove("active");
  }

  function toggleDropdown() {
    // Toggle dropdown visibility
    dropdown.style.overflowY =
      dropdown.style.overflowY === "hidden" ? "auto" : "hidden";
    dropdown.style.height = dropdown.style.height === "0px" ? "auto" : "0px";

    // Toggle angle icon visibility
    angleDown.style.display =
      dropdown.style.height === "0px" ? "inline-block" : "none";
    angleUp.style.display =
      dropdown.style.height !== "0px" ? "inline-block" : "none";

    // Toggle active class on fake select based on dropdown visibility
    if (dropdown.style.height === "auto") {
      fakeSelect.classList.add("active");
    } else {
      fakeSelect.classList.remove("active");
    }
  }

  dropper.addEventListener("click", toggleDropdown);

  hiddenSelect.addEventListener("click", toggleDropdown);
});
});

////////////////////////////////////////////////////////////////////////////////////////////

function updateVisibility(selectElement) {
let labelElement =
  selectElement.previousElementSibling.querySelector(".label");
if (selectElement.value !== "null") {
  labelElement.style.color = "var(--charcoal)";
} else {
  labelElement.style.color = "";
}
}

let fakeSelects = document.querySelectorAll(".fake-select.active");

fakeSelects.forEach(function (fakeSelect) {
let selectDiv = fakeSelect.querySelector(".label");
let dropdown = fakeSelect.querySelector(".dropdown");
let options = dropdown.querySelectorAll(".option");

selectDiv.addEventListener("click", function (e) {
  e.stopPropagation();
  closeAllSelect(fakeSelect);
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

options.forEach(function (option) {
  option.addEventListener("click", function () {
    let value = this.getAttribute("data-value");
    selectDiv.textContent = value;
    dropdown.style.display = "none";
  });
});
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// Function to close all dropdowns except the current one
function closeAllSelect(currentSelect) {
let allDropdowns = document.querySelectorAll(".dropdown");
allDropdowns.forEach(function (dropdown) {
  if (dropdown.parentElement !== currentSelect) {
    dropdown.style.display = "none";
  }
});
}

// Event listener to close dropdowns when clicking outside
document.addEventListener("click", function () {
closeAllSelect(null);
});

///////////////////////////////////////////////////////////////////////////////////

// are you * field

document.addEventListener("DOMContentLoaded", function () {
const fakeSelect = document.getElementById("fake_enquiry_type");
const dropdown = fakeSelect.querySelector(".dropdown");
const options = dropdown.querySelectorAll(".option");
const selectedOption = fakeSelect.querySelector("#selected_option_person");

// Toggle dropdown visibility when fake select is clicked
fakeSelect.addEventListener("click", function () {
  dropdown.classList.toggle("show");
});

// Handle option selection
options.forEach(function (option) {
  option.addEventListener("click", function () {
    const value = option.getAttribute("data-value");
    selectedOption.textContent = option.textContent;
    dropdown.classList.remove("show");

    // Update hidden select value
    const hiddenSelect = document.querySelector(
      'select[name="enquiry_type"]'
    );
    hiddenSelect.value = value;
  });
});
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
// og options select
window.addEventListener("DOMContentLoaded", (event) => {
var elements = document.querySelectorAll("#kings-enquiry-form input");
for (var i = 0; i < elements.length; i++) {
  elements[i].oninvalid = function (e) {
    e.target.setCustomValidity("");
    if (!e.target.validity.valid) {
      e.target.setCustomValidity("This field cannot be left blank");
      e.target.style.border = "2px solid red";
    }
  };
  elements[i].oninput = function (e) {
    e.target.setCustomValidity("");
    e.target.style.border = "2px solid #59c6e7";
  };
}
});

/////////////////////////////////////////////////////////////////////////////////////////
// fake pref comm
document.addEventListener("DOMContentLoaded", function () {
const fakeSelectComm = document.getElementById("fake_pref_comm");
if (!fakeSelectComm) {
  console.error('Element with ID "fake_pref_comm" not found.');
  return;
}

const dropdownComm = fakeSelectComm.querySelector(".dropdown");
if (!dropdownComm) {
  console.error('Dropdown element not found within "fake_pref_comm".');
  return;
}

const optionsComm = dropdownComm.querySelectorAll(".option");
if (!optionsComm.length) {
  console.error('No options found within the dropdown.');
  return;
}

const selectedOptionComm = document.getElementById("selected_option_comm");
if (!selectedOptionComm) {
  console.error('Element with ID "selected_option_comm" not found.');
  return;
}

// Toggle dropdownComm visibility when fake select is clicked
fakeSelectComm.addEventListener("click", function () {
  dropdownComm.classList.toggle("show");
});

// Handle option selection
optionsComm.forEach(function (option) {
  option.addEventListener("click", function () {
    const value = option.getAttribute("data-value");
    selectedOptionComm.textContent = option.textContent;
    dropdownComm.classList.remove("show");

    // Update hidden select value
    const hiddenSelect = document.querySelector('select[name="contact_by"]');
    if (hiddenSelect) {
      hiddenSelect.value = value;
    } else {
      console.error('Hidden select element with name "contact_by" not found.');
    }
  });
});
});

///////////////////////////////////////////////////////////////////////////////////////
// fake nationality
document.addEventListener("DOMContentLoaded", function () {
const fakeSelect = document.getElementById("fake_nationality");
const dropdown = fakeSelect.querySelector(".dropdown");
const options = dropdown.querySelectorAll(".option");
const selectedOption = fakeSelect.querySelector(
  "#selected_option_nationality"
);

// Toggle dropdown visibility when fake select is clicked or focused
fakeSelect.addEventListener("click", function () {
  dropdown.classList.toggle("show");
});
fakeSelect.addEventListener("focus", function () {
  dropdown.classList.add("show");
});

// Handle option selection
options.forEach(function (option) {
  option.addEventListener("click", function () {
    const value = option.getAttribute("data-value");
    selectedOption.textContent = option.textContent;
    dropdown.classList.remove("show");

    // Update hidden select value
    const hiddenSelect = document.getElementById("nationality");
    hiddenSelect.value = value;
  });
});
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// fake location
document.addEventListener("DOMContentLoaded", function () {
const fakeSelectLocation = document.getElementById("fake_location");
if (!fakeSelectLocation) {
  console.error('Element with ID "fake_location" not found.');
  return;
}

const dropdownLocation = fakeSelectLocation.querySelector(".dropdown");
if (!dropdownLocation) {
  console.error('Dropdown element not found within "fake_location".');
  return;
}

const optionsLocation = dropdownLocation.querySelectorAll(".option");
if (optionsLocation.length === 0) {
  console.error('No options found within the dropdown.');
  return;
}

const selectedOptionLocation = document.getElementById("selected_option_location");
if (!selectedOptionLocation) {
  console.error('Element with ID "selected_option_location" not found.');
  return;
}

// Toggle dropdownLocation visibility when fake select is clicked
fakeSelectLocation.addEventListener("click", function () {
  dropdownLocation.classList.toggle("show");
});

// Handle option selection
optionsLocation.forEach(function (option) {
  option.addEventListener("click", function () {
    const value = option.getAttribute("data-value");
    selectedOptionLocation.textContent = option.textContent;
    dropdownLocation.classList.remove("show");

    // Update hidden select value
    const hiddenSelect = document.querySelector('select[name="preferred_location"]');
    if (hiddenSelect) {
      hiddenSelect.value = value;
    } else {
      console.error('Hidden select element with name "preferred_location" not found.');
    }
  });
});
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// courses
document.addEventListener("DOMContentLoaded", function () {
const fakeSelectCourse = document.getElementById("fake_course_interest1");
const dropdownCourse = fakeSelectCourse.querySelector(".dropdown");
const optionsCourse = dropdownCourse.querySelectorAll(".option");
const selectedOptionCourse = fakeSelectCourse.querySelector(
  "#selected_option_course"
);

// Toggle dropdownCourse visibility when fake select is clicked
fakeSelectCourse.addEventListener("click", function () {
  dropdownCourse.classList.toggle("show");
});

// Handle option selection
optionsCourse.forEach(function (option) {
  option.addEventListener("click", function () {
    const value = option.getAttribute("data-value");
    selectedOptionCourse.textContent = option.textContent;
    dropdownCourse.classList.remove("show");

    // Update hidden select value
    const hiddenSelect = document.querySelector(
      'select[name="course_interest1"]'
    );
    hiddenSelect.value = value;
  });
});
});

// document.addEventListener("DOMContentLoaded", function () {
//   let dataResourceValue = document.body.getAttribute("data-resource");
//   document
//     .getElementById("dataResourceValue")
//     .setAttribute("data-parent", dataResourceValue);
//   console.log("Data Resource Value:", dataResourceValue);
// });

// og js from contactmodal form
var recaptcha_token = false;
function recaptcha_callback(token) {
recaptcha_token = token;
recaptcha_markValid();
}

function recaptcha_expired(arguments) {
recaptcha_token = false;
}

function recaptcha_markValid() {
$("#kings-enquiry-form .g-recaptcha").css({
  border: "",
  borderRadius: "",
  marginRight: "",
  background: "",
});
}

function enquiryFormSubmitHandler(e) {
//Prevent double submission
let frm = document.getElementById("kings-enquiry-form");
let btn = frm.querySelector('input[type="submit"]');

if (btn.classList.contains("disabled") || !recaptcha_token) {
  //prevent double form submission.
  e.preventDefault();
  return;
}
btn.classList.add("disabled");
}

function enquiry_validate() {
let valid = true;

//Validate the required fake_selects
let select_divs = document.querySelectorAll(
  "#kings-enquiry-form .fake-select"
);
select_divs.forEach(function (div) {
  let id = $(div).attr("id");
  let select = $(div).parent().find("select");
  if (select.length) {
    let val = select.val().trim();
    let required = select.attr("required");
    if (val.length === 0 && required) {
      $(div).css("border", "2px solid red");
      valid = false;
    } else {
      $(div).css("border", "2px solid #59c6e7");
    }
  }
});

//validate captcha
if (!recaptcha_token) {
  $("#kings-enquiry-form .g-recaptcha").css({
    border: "2px solid red",
    borderRadius: "5px",
    marginRight: "4px",
    background: "white",
  });

  valid = false;
} else {
  recaptcha_markValid();
}

return valid;
}

window.addEventListener("DOMContentLoaded", (event) => {
var elements = document.querySelectorAll("#kings-enquiry-form input");
for (var i = 0; i < elements.length; i++) {
  elements[i].oninvalid = function (e) {
    e.target.setCustomValidity("");
    if (!e.target.validity.valid) {
      e.target.setCustomValidity("This field cannot be left blank");
      e.target.style.border = "2px solid red";
    }
  };
  elements[i].oninput = function (e) {
    e.target.setCustomValidity("");
    e.target.style.border = "2px solid #59c6e7";
  };
}
});






//  test

describe('Kings Enquiry Form', () => {
    beforeEach(() => {
      // Set up the DOM structure for the tests
      document.body.innerHTML = `
        <form id="kings-enquiry-form">
          <div class="fake-select" id="fake_enquiry_type">
            <div class="label">Enquiry Type</div>
            <div class="dropdown">
              <div class="option" data-value="type1">Type 1</div>
              <div class="option" data-value="type2">Type 2</div>
            </div>
          </div>
          <select name="enquiry_type" required>
            <option value="null">Select</option>
          </select>
          <div class="g-recaptcha"></div>
          <input type="submit" value="Submit" />
        </form>
      `;
    });
  
    test('validates required selects', () => {
      const valid = enquiry_validate();
      expect(valid).toBe(false); // Should be false since select is not filled
    });
  
    test('validates captcha', () => {
      const recaptcha_token = false; // Simulate that recaptcha is not completed
      const valid = enquiry_validate();
      expect(valid).toBe(false); // Should be false since captcha is not valid
    });
  
    test('toggle dropdown visibility', () => {
      const fakeSelect = document.getElementById("fake_enquiry_type");
      fakeSelect.click(); // Simulate click on the fake select
      const dropdown = fakeSelect.querySelector(".dropdown");
      expect(dropdown.classList.contains("show")).toBe(true); // Check if dropdown is visible
    });
  
    test('selects an option and updates the label', () => {
      const fakeSelect = document.getElementById("fake_enquiry_type");
      const dropdown = fakeSelect.querySelector(".dropdown");
      const selectedOption = fakeSelect.querySelector(".label");
      
      // Simulate option click
      const option = dropdown.querySelector(".option");
      option.click();
      
      expect(selectedOption.textContent).toBe(option.textContent); // Check if label is updated
      expect(dropdown.classList.contains("show")).toBe(false); // Check if dropdown is closed
    });
  });
  