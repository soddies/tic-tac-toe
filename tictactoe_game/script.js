document.getElementById('startGame').addEventListener('click', function(event) {
    var playerCount = document.querySelector('input[name="playerCount"]:checked')
    var errorMessage = document.getElementById('error-message');

    if (!playerCount)
    {
        errorMessage.textContent = 'Please, choose the count players!'
        event.preventDefault();
    } else {
        localStorage.setItem('playerCount1', playerCount.value);
        errorMessage.textContent = ' ';
        window.location.href = 'start_game.html'
    }

    if (playerCount.value == '1') {
        window.location.href = 'one_player.html';
    } else if (playerCount.value == '2') {
        window.location.href = 'start_game.html';
    }

});

document.getElementById('settings').addEventListener('click', function() {
    window.location.href = 'settings.html';
});