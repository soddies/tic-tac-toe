document.addEventListener('DOMContentLoaded', function() {
    var savedDiff = localStorage.getItem('difficulty');
    if (savedDiff) {
        document.querySelector(`input[name="difficulty"][value="${savedDiff}"]`).checked = true;
    }

    var savedSize = localStorage.getItem('size');
    if (savedSize) {
        document.querySelector(`input[name="size"][value="${savedSize}"]`).checked = true;
    }
});

document.querySelectorAll('input[name="difficulty"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('difficulty', this.value);
        }
    });
});

document.querySelectorAll('input[name="size"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('size', this.value);
        }
    });
});


document.getElementById('back-main').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('save-settings').addEventListener('click', function(event) {
    var successMessage = document.getElementById('success-message');
    var errorMessage = document.getElementById('error-message');
    var diffChoose = document.querySelector('input[name="difficulty"]:checked')
    var fieldChoose = document.querySelector('input[name="size"]:checked');
    
    if (!diffChoose && !fieldChoose) {
        errorMessage.textContent = "Please, choose something!";
    } else {
        errorMessage.textContent = " ";
        successMessage.textContent = "Success!";
        event.preventDefault();
    }
});

document.getElementById('clean-settings').addEventListener('click', function() {
    const diffRadios = document.querySelectorAll('input[name="difficulty"]');
    diffRadios.forEach(radio => {
        radio.checked = false;
    });

    const fieldRadios = document.querySelectorAll('input[name="size"]');
    fieldRadios.forEach(radio => {
        radio.checked = false;
    });

    document.getElementById('success-message').textContent = '';

    localStorage.removeItem('difficulty');
    localStorage.removeItem('size');
});