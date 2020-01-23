/*-----------------Function Declarations-----------------*/

function toggleValidClass(idValue, addFirst) {
  if (addFirst === "first") {
    idValue.addClass("validStyle");
    idValue.removeClass("invalidStyle");
    enableForm();
  } else {
    idValue.addClass("invalidStyle");
    idValue.removeClass("validStyle");
    preventForm();
  }
}

function displayShirtColors(idValue) {
  if (idValue.val() === "js puns") {
    for (let i = 0; i < $shirtOptions.length; i++) {
      if (i > 3) {
        $($shirtOptions[i]).hide();
      } else {
        $($shirtOptions[i]).show();
      }
    }
  }
  //selects only heart js designs
  if (idValue.val() === "heart js") {
    for (let i = 0; i < $shirtOptions.length; i++) {
      if (i <= 3) {
        $($shirtOptions[i]).hide();
      } else {
        $($shirtOptions[i]).show();
      }
    }
  }
}

function prependOption() {
  $("#color").prepend(
    "<option selected disabled hidden>Choose a design </option>"
  );
}

function otherJobTitle() {
  $otherLabel.hide();
  $jobInput.hide();
  $jobTitle.change(function() {
    if ($(this).val() === "other") {
      $otherLabel.slideDown(500);
      $jobInput.slideDown(500);
    } else {
      $otherLabel.delay(250).slideUp(250);
      $jobInput.slideUp(250);
    }
  });
}

function testRegex(regex, newArray, parentArray, desiredClass, counter) {
  if (regex.test(parentArray.parent()[counter].textContent)) {
    newArray.push(parentArray[counter]);
    parentArray[counter].className = desiredClass;
  }
}

function disableCheckboxes(array, className, event) {
  for (let i = 0; i < array.length; i++) {
    if (event.target.className === className) {
      array[i].disabled = true;
      event.target.disabled = false;
    }
    if (
      event.target.checked === false &&
      event.target.className === className
    ) {
      array[i].disabled = false;
    }
  }
}

/*-----------------Variable Declarations-----------------*/

//job title declarations
$jobTitle = $("#title");
$jobInput = $("#input");
$otherLabel = $("#otherLabel");
//activity event declarations
$activityEvents = $(".activities input");
let totalCost = 0;
const labelofInputAM = /Tuesday ?9[a][m]/;
const labelofInputPM = /Tuesday ?1[p][m]/;
const eventRegex = /[^\$]\d*$/;
let morningActivity = [];
let dayActivity = [];
//shirt design declarations
$shirtDesign = $("#design");
prependOption();
//payment declarations
$paymentOptions = $("#payment option");
$creditCardDetails = $("#credit-card");
$paypal = $("p")[0];
$bitcoin = $("p")[1];
$($paypal).hide();
$($bitcoin).hide();

/*-----------------Job Title-----------------*/
//hides text input field from view until "other" occupation is selected
otherJobTitle();
/*-----------------Shirt Design-----------------*/

//hide the color options on page load
$("#colors-js-puns").hide();
$shirtDesign.change(function() {
  $shirtOptions = $("#color option");
  //show or hide the color options if a value is selected
  if ($("#design").val() === "js puns" || $("#design").val() === "heart js") {
    $("#colors-js-puns").show();
  } else if ($("#design").val()) {
    $("#colors-js-puns").hide();
  }
  displayShirtColors($(this));
});
/*-----------------Events for the conference-----------------*/
/*create arrays based on timing of the events that conflict by gathering
   a conflicting event using regex and declare a class name*/
for (let i = 0; i < $activityEvents.length; i++) {
  testRegex(labelofInputAM, morningActivity, $activityEvents, "morningTime", i);
  testRegex(labelofInputPM, dayActivity, $activityEvents, "dayTime", i);
}
let checked = $("input:checked");
  checked.length = 0;
//makes the events  disable if they are at conflicting times
$activityEvents.change(function(e) {
  //enables submit form when checkbox is clicked

  //disables any morning event or day event that conflicts with the selected event
  disableCheckboxes(morningActivity, "morningTime", e);
  disableCheckboxes(dayActivity, "dayTime", e);
  //add up total costs of events that are checked
  if (e.target.checked) {
    totalCost += +eventRegex.exec(e.target.parentElement.textContent)[0];
  } else if (e.target.checked === false) {
    totalCost += -+eventRegex.exec(e.target.parentElement.textContent)[0];
  }
  if ($(".activities p")) {
    $(".activities p").remove();
  }
  $(".activities").append(
    $(`<p class = "money">Total Cost: $${totalCost}</p>`)
      .hide()
      .fadeIn(500)
  );
    checked = $("input:checked");
    if(checked.length ===0){
      $(".activities").append(
      $(`<p style="color: rgb(244, 60, 2);">*Please select at least 1 event</p>`));
    }
});

/*-----------------Payment Options-----------------*/


$("#payment option")[1].selected = true;
$("#payment").change(function() {
  if (
    $(this).val() != "creditCard" ||
    $(this).val() != "paypal" ||
    $(this).val() != "bitcoin"
  ) {
    $creditCardDetails.slideUp(500);
    $($paypal).slideUp(250);
    $($bitcoin).slideUp(250);
  }
  if ($(this).val() === "creditCard") {
    $creditCardDetails.slideDown(500);
  } else if ($(this).val() === "paypal") {
    $($paypal).show();
  } else if ($(this).val() === "bitcoin") {
    $($bitcoin).show();
  }

});
$("#name").focus();
const name = $("#name");
const email = $("#mail");
const card = $("#cc-num");
const zip = $("#zip");
const cvv = $("#cvv");

const nameRegex = /^[A-Za-z]+ ?[A-Za-z]* ?[A-Za-z]* ?$/;
const emailRegex = /^[A-Za-z0-9]*?_?[A-Za-z0-9]+@[A-Za-z0-9]*.[c][o][m]$/;
const cardRegex = /^\d{13,16}$/;
const zipRegex = /^\d{5}$/;
const cvvRegex = /^\d{3}$/;
// $("button").on("click", (e) => {
// alert('fill out all fields');
//   e.preventDefault();
// });
//validation for Name input
function nameValidation() {
  if (nameRegex.test(name.val())) {
    return true;
  } else {
    return false;
  }
}
//email
function emailValidation() {
  if (emailRegex.test(email.val())) {
    return true;
  } else {
    return false;
  }
}
//card
function cardValidation() {
  if (cardRegex.test(card.val())) {
    return true;
  } else {
    return false;
  }
}
//zip
function zipValidation() {
  if (zipRegex.test(zip.val())) {
    return true;
  } else {
    return false;
  }
}
//cvv
function cvvValidation() {
  if (cvvRegex.test(cvv.val())) {
    return true;
  } else {
    return false;
  }
}

function changeTextBorder(input, regex) {
  input.on("keyup", () => {
    if (regex.test(input.val())) {
      input.css({
        border: "rgb(20, 241, 89) 2px solid"
      });
      console.log("This value is valid");
    } else if (!regex.test(input.val())) {
      input.css({
        border: "rgb(244, 60, 2) 2px solid"
      });
      console.log("This value is invalid");
    }
  });
}

$("form").on("submit", e => {
  if ($paymentOptions[2].selected || $paymentOptions[3].selected) {
    if (
      !nameValidation() ||
      !emailValidation() ||
      checked.length === 0 ||
      name.val() === "" ||
      email.val() === ""
    ) {
      alert("not all forms are filled correctly");
      e.preventDefault();
    }
  } else if ($paymentOptions[1].selected) {
    if (!cardValidation() || !zipValidation() || !cvvValidation()|| card.val()===""||zip.val()===""||cvv.val()==="") {
      e.preventDefault();
    }
    if (
      !nameValidation() ||
      !emailValidation() ||
      checked.length === 0 ||
      name.val() === "" ||
      email.val() === ""
    ) {
      alert("not all forms are filled correctly");
      e.preventDefault();
    }
  }
  if(checked.length===0){
    alert("select at least 1 event before submitting");
  }

});

changeTextBorder(name, nameRegex);
changeTextBorder(email, emailRegex);
changeTextBorder(card, cardRegex);
changeTextBorder(zip, zipRegex);
changeTextBorder(cvv, cvvRegex);
