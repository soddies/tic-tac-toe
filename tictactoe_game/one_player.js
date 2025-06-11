document.getElementById('start').addEventListener('click', function(event) {
    var errorMessage = document.getElementById('error-message');
    var yourName = document.querySelector('input[name="name"]').value.trim();
    var role = document.getElementById('combobox').value;

    var latinLetters = /^[A-Za-z]+$/;
    if (!yourName) {
        errorMessage.textContent = "Please, enter your name!";
        event.preventDefault();
    } else if (!latinLetters.test(yourName)) {
        errorMessage.textContent = "Only English!!!";
        event.preventDefault();
    } else {
        localStorage.setItem('playerNames', yourName);
        localStorage.setItem('playerRole', role);
        window.location.href = 'game_logic.html';
    }
});

document.getElementById('back').addEventListener('click', function() {
    window.location.href = 'index.html';
});