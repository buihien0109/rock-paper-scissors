// Truy cập vào các thành phần
const choicesEl = document.querySelectorAll(".player .choice-item");
const btn = document.querySelector(".btn-play");
const resultEl = document.querySelector(".result-text");

// Biến kiểm tra xem có được chơi game hay không
let isPlaying = true;

// Danh sách các lựa chọn
const choices = ["rock", "paper", "scissors"];

// Điểm người chơi
let scorePlayer = 0;
let scoreComputer = 0;

// Random 1 phần tử bất kỳ trong mảng
function randomChoice(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

// Lắng nghe sự kiện khi người chơi click vào các lựa chọn
// Lựa chọn nào được click thì add class "choose" => Đang chọn
Array.from(choicesEl).forEach((choice) => {
    choice.addEventListener("click", () => {
        Array.from(choicesEl).map((ele) => {
            ele.classList.remove("choose");
            ele.classList.add("unchoose");
        });
        choice.classList.add("choose");
        choice.classList.remove("unchoose");
    });
});

// Lấy lựa chọn của người chơi
function getPlayerChoice() {
    let chooseEl = document.querySelector(".choose");

    // Nếu người chơi không lựa chọn thì thông báo
    if (!chooseEl) {
        alert("Choose one choice please");
        return false;
    }

    // Nếu người chơi đã lựa chọn thì trả về tên của lựa chọn đó
    return chooseEl.dataset.name;
}

// Lắng nghe sự kiện khi bấm vào nút "play game"
btn.addEventListener("click", function () {
    if (isPlaying) {
        // Không cho phép bấm liên tục khi đang lắc
        isPlaying = false;

        // Tạo biến đếm để đếm số lần random
        let count = 0;

        // Lấy lựa chọn của người chơi
        let choicePlayer = getPlayerChoice();
        if (!choicePlayer) {
            isPlaying = true;
            return;
        }

        // Reset kết quả trước đó
        resultEl.innerText = "";

        let interval = setInterval(function () {
            count++;

            // Random lựa chọn của máy
            let choiceComputer = randomChoice(choices);
            // Hiển thị lựa chọn của máy lên giao diện
            document.querySelector(
                ".computer img"
            ).src = `${choiceComputer}.png`;

            if (count == 10) {
                // Kiểm tra kết quả của người chơi và máy
                checkResult(choicePlayer, choiceComputer);

                // Sau khi có kết quả thì cho phép chơi tiếp
                isPlaying = true;

                clearInterval(interval);
            }
        }, 300);
    }
});

// Kiểm tra kết quả của người chơi và máy
function checkResult(choicePlayer, choiceComputer) {
    if (choicePlayer == choiceComputer) {
        resultEl.innerText = "Draw!";
        return;
    }

    if (choicePlayer == "rock") {
        if (choiceComputer == "paper") {
            resultEl.innerText = "Computer Win!";
            scoreComputer++;
        } else {
            resultEl.innerText = "Player Win!";
            scorePlayer++;
        }
    }

    if (choicePlayer == "paper") {
        if (choiceComputer == "scissors") {
            resultEl.innerText = "Computer Win!";
            scoreComputer++;
        } else {
            resultEl.innerText = "Player Win!";
            scorePlayer++;
        }
    }

    if (choicePlayer == "scissors") {
        if (choiceComputer == "rock") {
            resultEl.innerText = "Computer Win!";
            scoreComputer++;
        } else {
            resultEl.innerText = "Player Win!";
            scorePlayer++;
        }
    }

    document.querySelector(".score-player").innerText = scorePlayer;
    document.querySelector(".score-computer").innerText = scoreComputer;
}
