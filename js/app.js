// Loader:
const loadingWrapper = document.getElementById('loadingWrapper')
const loading = document.getElementById('loading')
loading.setAttribute('src', 'https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif')
loading.setAttribute('alt', 'laoding')
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        loadingWrapper.remove()
    }, 1800)
});

//  Modal:
const ModalBtn = document.getElementById('ModalBtn')
const modal = document.querySelector('.modal')

ModalBtn && ModalBtn.addEventListener('click', function() {
    modal.style.display = 'none'
})

// Not bot chaking:
document.querySelectorAll('.image-container').forEach(container => {
    container.addEventListener('click', () => {
        const checkbox = container.querySelector('.image-checkbox');
        checkbox.checked = !checkbox.checked;
        container.classList.toggle('checked', checkbox.checked);
    });
});

document.getElementById('doneBtn').addEventListener('click', () => {
    resetCheckboxes();
    const allTrueChaked = document.querySelectorAll('input[type="checkbox"][id="trueChaked"]');
    const checkedTrueChaked = Array.from(allTrueChaked).filter(checkbox => checkbox.checked);

    const falseChaked = document.querySelectorAll('input[type="checkbox"][id="falseChaked"]:checked');
    if (falseChaked.length > 0) {
        alert("Please do not select the incorrect images.");
    } else if (checkedTrueChaked.length === allTrueChaked.length) {
        document.getElementById('imageCkekTotbot').style.display = 'none';
        setTimeout(() => {
            document.querySelector('#tastiqlandi').remove()
        }, 3000);
    } else {
        alert("Please select the correct images.");
    }

});

function resetCheckboxes() {
    document.querySelectorAll('.falseChaked').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelectorAll('.trueChaked').forEach(checkbox => {
        checkbox.checked = false;
    });
}

document.getElementById('doneBtn').disabled = false;



// Register:
const form = document.querySelector('.form')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const phoneNumber = document.querySelector('#phoneNumber')
const company = document.querySelector('#company')
const subjects = document.querySelector('#subjects')
const urlImg = document.querySelector('.urlImg')
const Yes = document.querySelector('#Yes')
const No = document.querySelector('#No')
const btn = document.querySelector('#btn')
const block = document.getElementById('block')
const ImageUrlInput = document.querySelector('#imageUrl')
const ImageFileInput = document.querySelector('#imageFile')

function getImageSource() {
    if (ImageUrlInput.value) {
        return ImageUrlInput.value;
    } else if (ImageFileInput.files.length > 0) {
        return URL.createObjectURL(ImageFileInput.files[0]);
    } else {
        return '';
    }
}

function createCard(data) {
    return `
        <div class="card" style="display: flex; flex-direction: column;align-items: center;background-color: #0452b7;text-align: center;gap: 15px; padding: 30px;border-radius: 15px; border:2px solid #fff">
        <img src="${data.urlImg}" width="100px"height="100px" style="border-radius: 50%;" alt='User img'>
        <div class="name" style="display: flex; flex-direction: column;align-items: center;gap: 5px">
            <h3>Firtname:${data.firstname}</h3>
            <h3>Lastname:${data.lastname}</h3>
        </div>
            <ul style="display: flex;align-items: center;flex-direction: column;gap: 5px;">
                <li>Email: ${data.email}</li>
                <li>Password: ${data.password}</li>
                <li>Number: ${data.number}</li>
                <li>Subject: ${data.subjects}</li>
                <li>Company: ${data.company}</li>
                <li>Existing Customer: ${data.isExistingCustomer}</li>
            </ul>
        </div>
    `
}

btn && btn.addEventListener('click', function() {
    const selectedAnswer = document.querySelector('input[name="Answer"]:checked')
    const isExistingCustomer = selectedAnswer ? selectedAnswer.value : "Not Specified";

    if (!firstName.value || !lastName.value || !email.value || !password.value || !phoneNumber.value || !company.value || !subjects.value || !getImageSource()) {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
        return;
    }

    block.style.display = 'flex';
    let data = {
        urlImg: getImageSource(),
        firstname: firstName.value,
        lastname: lastName.value,
        company: company.value,
        email: email.value,
        number: phoneNumber.value,
        subjects: subjects.value,
        password: password.value,
        isExistingCustomer: isExistingCustomer
    }
    form.reset()
    let result = createCard(data)
    block.innerHTML += result
});