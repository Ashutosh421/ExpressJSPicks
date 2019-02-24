/* eslint-disable max-len */
let signUpButton;
let formSubmitButton;

window.onload = () => {
    signUpButton = document.querySelector('#signup');

    signUpButton.addEventListener('click', () => {
        console.log(`On Sign Up Model click`);
        document.querySelector('#signUpModal').classList.remove('hidden');
    });

    formSubmitButton = document.querySelector('#formSubmit');
    formSubmitButton.addEventListener('click', () => {
        const firstName = document.querySelector('input[name="firstName"]').value;
        const lastName = document.querySelector('input[name="lastName"]').value;
        const age = document.querySelector('input[name="age"]').value;
        const occupation = document.querySelector('input[name="occupation"]').value;

        console.log(`-----> Submitting <-----`);
        console.log(`Firstname: ${firstName}`);
        console.log(`Lastname: ${lastName}`);
        console.log(`Age: ${age}`);
        console.log(`Occupation: ${occupation}`);

        let message = '';

        if (!firstName) {
            message += 'Please enter firstname.';
        }
        if (!lastName) {
            message += ' Please enter lastname.';
        }
        if (!age) {
            message += ' Please enter age.';
        } else if (!parseInt(age)) {
            message += ' Age must be a number.';
        }

        if (!occupation) {
            message += ' Please enter occupation.';
        }

        const form = document.querySelector('.signUpForm');
        const existingErrorMessage = form.querySelector('#formError');
        if (existingErrorMessage) {
            form.removeChild(existingErrorMessage);
        }

        if (message) {
            const textMessage = document.createElement('span');
            textMessage.setAttribute('id', 'formError');
            textMessage.innerText = message;

            form.appendChild(textMessage);
        } else {
            const data = {
                'firstName': firstName,
                'lastName': lastName,
                'age': age,
                'occupation': occupation,
            };

            fetch('http://localhost:3000/users/addUser', {
                method: 'post',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then((response) => response.text()).then(() => {
                console.log(``);
                document.querySelector('#signUpModal').classList.add('hidden');
            }).catch((error) => console.error('Error:', error));;
        }
    });

    document.querySelector('#users').addEventListener('click', (event) => {
        updateUsers();
    });
};

/**
 * Updates users on screen
 */
function updateUsers() {
    let usersSection = document.querySelector('#usersSection');
    if (!usersSection) {
        preparePosting = true;
        usersSection = document.createElement('div');
        usersSection.setAttribute('id', 'usersSection');
        document.body.appendChild(usersSection);
    }

    fetch('http://localhost:3000/users/getUsers', {
        method: 'GET',
    })
    .then((response) => response.text())
    .then((data) => {
        usersSection.innerHTML = data;
        prepareUserPosting();
    });
}
