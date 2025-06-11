document.getElementById('start').addEventListener('click', function(event) {
    var placeholderCount1 = document.querySelector('input[name="name"]').value.trim();
    var placeholderCount2 = document.querySelector('input[name="name2"]').value.trim();
    var errorMessage = document.getElementById('error-message');

    var latinLetters = /^[A-Za-z]+$/;

    if (!placeholderCount1 && !placeholderCount2) {
        errorMessage.textContent = 'Please, enter your names!';
        event.preventDefault();
    } else if (!placeholderCount1) {
        errorMessage.textContent = 'Please, enter the first name!';
        event.preventDefault();
    } else if (!placeholderCount2) {
        errorMessage.textContent = 'Please, enter the second name!';
        event.preventDefault();
    } else if (!latinLetters.test(placeholderCount1) || !latinLetters.test(placeholderCount2)) {
        errorMessage.textContent = 'Only English!!!';
    } else {
        localStorage.setItem('playerName1', placeholderCount1);
        localStorage.setItem('playerName2', placeholderCount2);
        localStorage.setItem('playerRole1', 'X');
        localStorage.setItem('playerRole2', 'O');
        window.location.href = 'game_logic.html';
    }
});

document.getElementById('back').addEventListener('click', function() {
    window.location.href = 'index.html';
});