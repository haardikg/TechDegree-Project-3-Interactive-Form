// when other is selected, a box to input other job is shown
document.addEventListener('DOMContentLoaded', function() {
    function onJobChange(event) {
        if (event.target.value === 'other') {
            otherField.style.display = 'block';
            otherFieldLabel.style.display = 'block';
        } else {
            otherField.style.display = 'none';
            otherFieldLabel.style.display = 'none';
        }
    }
    document.querySelector('select[name="user_title"]').addEventListener('change', onJobChange);

    var otherField = document.getElementById('other-title');
    var otherFieldLabel = document.getElementById('other-title-label');

    otherFieldLabel.style.display = 'none';
    otherField.style.display = 'none';

    // hide the color drop down menu and label
    var colorSelect = document.getElementById("color");
    var colorLabel = document.getElementById("color-label");
    colorSelect.style.display = "none";
    colorLabel.style.display = "none";

    // T-shirt color options are revealed based on the design selected.
    // grab and group all of the design options
    var designsOptions = {
        selectdesign: [document.getElementById('selecttheme')],
        'js puns': [
            document.getElementById('cornflowerblue'),
            document.getElementById('darkslategrey'),
            document.getElementById('gold')
        ],
        'heart js': [
            document.getElementById('tomato'),
            document.getElementById('steelblue'),
            document.getElementById('dimgrey')
        ]
    };
    function onDesignChange(event) {

        if (event.target.value === 'selectdesign') {
            colorSelect.style.display = "none";
            colorLabel.style.display = "none";
            return
        } else {
            colorSelect.style.display = "block";
            colorLabel.style.display = "block";
        }
        // Hide all options
        designsOptions['selectdesign']
            .concat(designsOptions['js puns'])
            .concat(designsOptions['heart js'])
            .forEach(function(optionElement) {
                if (optionElement.parentElement) {
                    optionElement.parentElement.removeChild(optionElement);
                }
            });

        // Add the options back in that match the current selection
        var select = document.getElementById('color');
        designsOptions[event.target.value].forEach(function(optionElement) {
            select.appendChild(optionElement);
        });

        // Select the first option
        select.options[0].selected = 'selected';
    }
    // Select the first option
    onDesignChange({ target: { value: 'selectdesign' } });
    document.querySelector('select[name="user_design"]').addEventListener('change', onDesignChange);

    // When we choose a payment option, the chosen payment section is revealed and the other payment sections are hidden
    function hidePaymentFields() {
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('bitcoin-div').style.display = 'none';
        document.getElementById('paypal-div').style.display = 'none';
    }

    // Hide bitcoin and paypal divs intially
    function hideBitCoinPaypal() {
        document.getElementById('bitcoin-div').style.display = 'none';
        document.getElementById('paypal-div').style.display = 'none';
    }
    hideBitCoinPaypal();

    // strips anything that's not a number out of a text field
    function numbersOnly(event) {
        event.target.value = event.target.value.replace(/[^0-9]+/, '');
    };

    document.getElementById('cc-num').addEventListener('keyup', numbersOnly);
    document.getElementById('zip').addEventListener('keyup', numbersOnly);
    document.getElementById('cvv').addEventListener('keyup', numbersOnly);

    function changePaymentHandler(event) {
        hidePaymentFields();
        var ccreq = document.getElementById('cc-num');
        var cczip = document.getElementById('zip');
        var cccvv = document.getElementById('cvv');

        if (event.target.value === 'credit card') {
            removeSelectPaymentError();
            document.getElementById('credit-card').style.display = 'block';

            ccreq.setAttribute('type', 'tel');
            ccreq.setAttribute('minlength', 13);
            ccreq.setAttribute('maxlength', 16);

            cczip.setAttribute('type', 'number');
            cczip.setAttribute('min', 10000);
            cczip.setAttribute('max', 99999);

            cccvv.setAttribute('type', 'number');
            cccvv.setAttribute('min', 100);
            cccvv.setAttribute('max', 999);
        } else if (event.target.value === 'bitcoin') {
            removeSelectPaymentError();
            document.getElementById('bitcoin-div').style.display = 'block';
        } else if (event.target.value === 'paypal') {
            removeSelectPaymentError();
            document.getElementById('paypal-div').style.display = 'block';
        }
    }
    document.querySelector('select[name="user_payment"]').addEventListener('change', changePaymentHandler);

    // Remove the select payment error
    function removeSelectPaymentError() {
        if (npsError.parentElement !== null) {
            if (npsError.parentElement) {
                paymentFieldset.removeChild(npsError);
            }
        }
    }
    // User cannot select two activities that are at the same time
    var jsf = document.getElementById('jsframeworks');
    var express = document.getElementById('express');
    var node = document.getElementById('node');
    var jslib = document.getElementById('jslib');
    var mainconf = document.getElementById('mainconf');
    var buildtools = document.getElementById('buildtools');
    var npmw = document.getElementById('npmw');

    var checkboxes = document.getElementsByName('checkbox');

    function enableButtonDisplayTotal() {
        submitButton.removeAttribute('disabled');
        displayTotal();
        validateActivity();
    }

    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function(e) {
            var data = { data: e.target.dataset, checked: e.target.checked };
            enableButtonDisplayTotal(data);
        });
    }

    //both on Tuesday 9am-12pm
    jsf.addEventListener('change', function(event) {
        express.disabled = event.target.checked;
        express.parentElement.style.setProperty("text-decoration", event.target.checked ? "line-through" : "");
        enableButtonDisplayTotal();
    });

    express.addEventListener('change', function(event) {
        jsf.disabled = event.target.checked;
        jsf.parentElement.style.setProperty("text-decoration", event.target.checked ? "line-through" : "");
        enableButtonDisplayTotal();
    });

    // both on Tuesday 1pm-4pm
    node.addEventListener('change', function(event) {
        jslib.disabled = event.target.checked;
        jslib.parentElement.style.setProperty("text-decoration", event.target.checked ? "line-through" : "");
        enableButtonDisplayTotal();
    });

    jslib.addEventListener('change', function(event) {
        node.disabled = event.target.checked;
        node.parentElement.style.setProperty("text-decoration", event.target.checked ? "line-through" : "");
        enableButtonDisplayTotal();
    });

    // event listener for submit button
    var selectActivity = document.createElement('label');
    var activitiesTotal = document.createElement('total-cost');
    var activitiesFieldset = document.getElementsByTagName('fieldset')[2];

    var theForm = document.querySelector('form');

    theForm.addEventListener('submit', function(event) {
        if (!checkName() || !checkMail() || !validateActivity() || !checkPaymentMethod()) {
            event.stopPropagation();
            event.preventDefault();
        };
    });

    var submitButton = document.querySelector('button[type="submit"]');

    // Check in real time that the user entered a name at all and is longer than two characters
    var nameInput = document.getElementById('name');
    var nameLabel = document.getElementsByTagName('label')[0];
    var nameError = document.createElement('label');

    function checkName(event) {
        if (nameInput.value === '' || nameInput === null) {
            window.scrollTo(0, nameInput.parentElement.offsetTop);
            nameInput.setCustomValidity("Please enter a name");
            nameError.textContent = 'Please enter a name';
            nameError.setAttribute('class', 'error');
            nameLabel.appendChild(nameError);
            return false
        } else if (nameInput.value.length < 2) {
            nameInput.setCustomValidity("Please enter a name longer than two characters");
            nameError.textContent = 'Please enter a name longer than two characters';
            nameError.setAttribute('class', 'error');
            nameLabel.appendChild(nameError);
            window.scrollTo(0, nameInput.parentElement.offsetTop);
            return false
        } else if (nameError.parentElement !== null) {
            nameInput.setCustomValidity("");
            nameLabel.removeChild(nameError);
        }
        return true
    };
    nameInput.addEventListener("input", checkName);


    // Check that the user entered anything in the email field
    var mail = document.getElementById('mail');
    var mailLabel = document.getElementsByTagName('label')[1];
    var mailError = document.createElement('label');
    var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    function checkMail(event) {
        if (mail.value === '' || mail.value === null) {
            mail.setCustomValidity("Please enter an email address");
            mailError.textContent = 'Please enter an email address';
            mailError.setAttribute('class', 'error');
            mailLabel.appendChild(mailError);
            window.scrollTo(0, mail.parentElement.offsetTop);
            return false
        } else if (!mail.value.match(emailPattern)) {
            mail.setCustomValidity("Please enter a valid email address");
            mailError.textContent = 'Please enter a valid email address';
            mailError.setAttribute('class', 'error');
            mailLabel.appendChild(mailError);
            window.scrollTo(0, mail.parentElement.offsetTop);
            return false
        } else if (mailError.parentElement !== null) {
            mail.setCustomValidity("");
            if (mailError.parentElement) {
                mailError.parentElement.removeChild(mailError);
            }
        }
        return true
    }
    mail.addEventListener("input", checkMail);

    // display total price of activities selected
    function displayTotal(data) {
        var price = [].slice.call(document.querySelectorAll('[data-price]')).reduce(function(total, checkbox) {
            return checkbox.checked ? total + parseInt(checkbox.dataset.price, 10) : total;
        }, 0);
        activitiesTotal.textContent = 'Your total is $' + price;
        activitiesFieldset.appendChild(activitiesTotal);
    }
    displayTotal();

    // Error message for when no activity is selected
    function activitiesError() {
        selectActivity.textContent = 'Please select an activity';
        selectActivity.setAttribute('class', 'error');
        activitiesFieldset.appendChild(selectActivity);
        window.scrollTo(0, activitiesFieldset.offsetTop);
    }

    // Check that the user has ticked an activity checkbox, if not, submit button is disabled
    function validateActivity() {
        var activitySelected =
            jsf.checked ||
            express.checked ||
            node.checked ||
            jslib.checked ||
            mainconf.checked ||
            buildtools.checked ||
            npmw.checked;

        // If at least one activity is selected
        if (activitySelected) {
            // remove error label if it exists
            if (selectActivity.parentElement) {
                selectActivity.parentElement.removeChild(selectActivity);
            }
        } else {
            submitButton.setAttribute('disabled', '');
            activitiesError();
            return false;
        }
        return true;
    }

    //Check that the user entered anything in the CVV field
    function checkCvv() {
        if (cvvfield.value === '' || cvvfield.value === null) {
            cvvfield.setCustomValidity("Please enter a CVV number");
            cvvError.textContent = 'Please enter a CVV number';
            cvvError.setAttribute('class', 'error');
            cvvClass.appendChild(cvvError);
            return false;
        } else if (cvvfield.value.length < 3) {
            cvvfield.setCustomValidity("Please enter a 3 digit CVV number");
            cvvError.textContent = 'Please enter a 3 digit CVV number';
            cvvError.setAttribute('class', 'error');
            cvvClass.appendChild(cvvError);
            return false;
        } else if (cvvfield.value.length > 3) {
            cvvfield.setCustomValidity("Please enter only 3 digits");
            cvvError.textContent = 'Please enter only 3 digits';
            cvvError.setAttribute('class', 'error');
            cvvClass.appendChild(cvvError);
            return false;
        } else if (cvvError.parentElement !== null) {
            cvvfield.setCustomValidity("");
            cvvClass.removeChild(cvvError);
        }
        return true;
    }
    var cvvfield = document.getElementById('cvv');
    var cvvClass = cvvfield.parentElement;
    var cvvError = document.createElement('label');
    cvvfield.addEventListener('keyup', checkCvv, false);

    //Check that the user entered anything in the zip field
    function checkZip() {
        if (zipfield.value === '' || zipfield.value === null) {
            zipfield.setCustomValidity("Please enter a valid 5 digit zip code");
            zipError.textContent = 'Please enter a valid 5 digit zip code';
            zipError.setAttribute('class', 'error');
            zipClass.appendChild(zipError);
            return false;
        } else if (zipfield.value.length < 5) {
            zipfield.setCustomValidity("Please enter a zip code that is at least 5 digits long");
            zipError.textContent = 'Please enter a zip code that is at least 5 digits long';
            zipError.setAttribute('class', 'error');
            zipClass.appendChild(zipError);
            return false;
        } else if (zipfield.value.length > 5) {
            zipfield.setCustomValidity("Please enter a zip code that is no more than 5 digits long");
            zipError.textContent = 'Please enter a zip code that is no more than 5 digits long';
            zipError.setAttribute('class', 'error');
            zipClass.appendChild(zipError);
            return false;
        } else if (zipError.parentElement !== null) {
            zipfield.setCustomValidity("");
            zipClass.removeChild(zipError);
        }
        return true;
    }
    var zipfield = document.getElementById('zip');
    var zipClass = zipfield.parentElement;
    var zipError = document.createElement('label');
    zipfield.addEventListener('keyup', checkZip, false);

    //Check that the user entered anything in the credit card field
    function checkCC() {
        if (ccfield.value === '' || ccfield.value === null) {
            ccfield.setCustomValidity("Please enter a valid Credit Card number.");
            ccError.textContent = 'Please enter a valid Credit Card number.';
            ccError.setAttribute('class', 'error');
            ccClass.appendChild(ccError);
            return false;
        } else if (ccfield.value.length < 13) {
            ccfield.setCustomValidity("Please enter a number that is at least 13 digits long.");
            ccError.textContent = 'Please enter a number that is at least 13 digits long.';
            ccError.setAttribute('class', 'error');
            ccClass.appendChild(ccError);
            return false;
        } else if (ccfield.value.length > 16) {
            ccfield.setCustomValidity("Please enter a number that is no more than 16 digits long.");
            ccError.textContent = 'Please enter a number that is no more than 16 digits long.';
            ccError.setAttribute('class', 'error');
            ccClass.appendChild(ccError);
            return false;
        } else if (ccError.parentElement !== null) {
            ccfield.setCustomValidity("");
            ccClass.removeChild(ccError);
        }
        return true;
    }
    var ccfield = document.getElementById('cc-num');
    var ccClass = ccfield.parentElement;
    var ccError = document.createElement('label');
    ccfield.addEventListener('keyup', checkCC, false);

    // Check that the user selected a payment method
    function checkPaymentMethod() {
        if (paymentSelector.value === "select_method") {
            npsError.textContent = "Please select a payment method";
            npsError.setAttribute('class', 'error');
            paymentFieldset.appendChild(npsError);
            return false;
        } else if (paymentSelector.value === "credit card") {
            return checkCC() && checkZip() && checkCvv();
        }
        return true;
    }

    var paymentSelector = document.getElementById('payment');

    paymentSelector.addEventListener('change', function () {
        ccfield.setCustomValidity("");
        zipfield.setCustomValidity("");
        cvvfield.setCustomValidity("");
    });

    var paymentFieldset = document.getElementsByTagName('fieldset')[3];
    var npsError = document.createElement('label');
    var selectID = document.getElementsByName('user_payment');
});
