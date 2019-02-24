/* eslint-disable no-unused-vars */

/**
 * Constructs a warning element
 * @param {string} id Id of the warning element
 * @param {string[]} classArr Classes to be added to the warning element
 * @param {HTMLElement} parent Parent of the warning element
 * @return {HTMLElement} Returns a warning element
 */
function constructWarnElement(id, classArr, parent) {
    const warnELement = document.createElement('small');
    warnELement.setAttribute('id', id);
    for (const cl of classArr) {
        warnELement.classList.add(cl);
    }
    parent.appendChild(warnELement);
    return warnELement;
}

/**
 * Prepares User Posting
 */
function prepareUserPosting() {
    /* eslint-disable max-len */
    const addUserButton = document.querySelector('#addUserForm');
    addUserButton && addUserButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(`Trying to submit`);

        const firstName = document.querySelector('#firstName');
        const lastName = document.querySelector('#lastName');
        const age = document.querySelector('#age');
        const occupation = document.querySelector('#occupation');

        let canSubmit = true;

        if (!firstName.value) {
            const warnFirstName = document.querySelector('#firstNameWarn') || constructWarnElement('firstNameWarn', ['form-text', 'text-danger'], firstName.parentElement);
            warnFirstName.textContent = 'Please enter first name';
            canSubmit = false;
        } else {
            const warnFirstName = document.querySelector('#firstNameWarn');
            if (warnFirstName) {
                warnFirstName.parentElement.removeChild(warnFirstName);
            }
        }

        if (!lastName.value) {
            const warnLastName = document.querySelector('#lastNameWarn') || constructWarnElement('lastNameWarn', ['form-text', 'text-danger'], lastName.parentElement);
            warnLastName.textContent = 'Please enter last name';
            canSubmit = false;
        } else {
            const warnLastName = document.querySelector('#lastNameWarn');
            if (warnLastName) {
                warnLastName.parentElement.removeChild(warnLastName);
            }
        }

        if (!age.value) {
            const warnAge = document.querySelector('#ageWarn') || constructWarnElement('ageWarn', ['form-text', 'text-danger'], age.parentElement);
            warnAge.textContent = 'Please enter age';
            canSubmit = false;
        } else {
            const warnAge = document.querySelector('#ageWarn');
            if (warnAge) {
                warnAge.parentElement.removeChild(warnAge);
            }
        }

        if (!occupation.value) {
            const warnOccupation = document.querySelector('#occupationWarn') || constructWarnElement('occupationWarn', ['form-text', 'text-danger'], occupation.parentElement);
            warnOccupation.textContent = 'Please enter occupation';
            canSubmit = false;
        } else {
            const warnOccupation = document.querySelector('#occupationWarn');
            if (warnOccupation) {
                warnOccupation.parentElement.removeChild(warnOccupation);
            }
        }

        if (canSubmit) {
            const data = {
                'firstName': firstName.value,
                'lastName': lastName.value,
                'age': age.value,
                'occupation': occupation.value,
            };

            fetch('http://localhost:3000/users/addUser', {
                method: 'post',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then((response) => response.text()).then(() => {
                updateUsers();
            }).catch((error) => console.error('Error:', error)); ;
        }
    });
}
