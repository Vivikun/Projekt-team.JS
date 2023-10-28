const colorSwitch = document.getElementById('colorSwitch');
const body = document.body;
const header = document.querySelector('.main-header');


colorSwitch.addEventListener('change', () => {
    if (colorSwitch.checked) {
        body.style.backgroundColor = '#000'; 
        header.style.backgroundColor = '#000';
    } else {
        body.style.backgroundColor = '#fff';
        header.style.backgroundColor = '#fff';
    }
});

