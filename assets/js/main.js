let userScore = 0;
let computerScore = 0;
const waitingPcChoiceImage = document.getElementById('img-waiting-pc-choices');
const computerChoiceImage = document.getElementById('img-pc-choices');
const announcementClose = document.querySelector('.js-announcement-close');
const announcementContainer = document.querySelector('#announcement .announcement-container');
const announcementElement = document.getElementById('announcement');

// Hàm xử lý khi user bắt đầu click vào các lựa chọn để chơi
function playGame(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    waitingPcChoiceImage.classList.add('close');
    computerChoiceImage.src = `./assets/img/choices/${computerChoice}.png`;
    computerChoiceImage.alt = `${computerChoice}`;
    computerChoiceImage.classList.remove('close');

    const outcome = determineWinner(userChoice, computerChoice);
    updateScoreboard(outcome);
    anounceResult(outcome);
}

// Hàm xác định kết quả của trò chơi
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    }
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
}

// Hàm cập nhật tỉ số
function updateScoreboard(outcome) {
    if (outcome === 'win') {
        userScore++;
    } else if (outcome === 'lose') {
        computerScore++;
    }
    
    document.querySelector('#scoreboard p').innerText = `${userScore} - ${computerScore}`;
}

// Hàm hiển thị thông báo về kết quả trò chơi
function anounceResult(outcome) {
    const headerAnnouncement = document.querySelector('#announcement .announcement-header');
    const bodyAnnouncement = document.querySelector('.announcement-body h2');
    const imageAnnouncement = document.querySelector('.announcement-body img');

    if (outcome === 'win') {
        headerAnnouncement.innerText = 'Yeahh!!! Thắng keo này rồi.'
        bodyAnnouncement.innerText = `Tỉ số đã được nâng lên thành ${userScore} - ${computerScore}. Tiếp tục phát huy nào!`;
        imageAnnouncement.src = `./assets/img/announcement-status/${outcome}.jpg`;
    } else if (outcome === 'lose') {
        headerAnnouncement.innerText = '30 chưa phải là Tết. Làm lại nào!'
        bodyAnnouncement.innerText = `PC Player đã ghi điểm nâng tỉ số lên ${userScore} - ${computerScore}. Vẫn còn cơ hội lật kèo!`;
        imageAnnouncement.src = `./assets/img/announcement-status/${outcome}.jpg`;
    } else if (outcome == 'draw') {
        headerAnnouncement.innerText = 'Hòa rồi! Chơi lại nào!'
        bodyAnnouncement.innerText = `Tỉ số ${userScore} - ${computerScore} không thay đổi. Cơ hội vẫn còn cho hai bên!`;
        imageAnnouncement.src = `./assets/img/announcement-status/${outcome}.jpg`;
    }
   
    announcementElement.classList.add('open');
}

// Hàm đóng thông báo
function closeAnnouncement() {
    announcementElement.classList.remove('open');
    computerChoiceImage.classList.add('close');
    waitingPcChoiceImage.classList.remove('close');
}

announcementClose.addEventListener('click', closeAnnouncement);
announcementElement.addEventListener('click', closeAnnouncement);
announcementContainer.addEventListener('click', function(event) {
    event.stopPropagation();
})