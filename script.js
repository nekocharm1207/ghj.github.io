// 获取玩家元素和赛道元素
const player = document.getElementById('player');
const tracks = document.querySelectorAll('.track');
const obstacles = document.querySelectorAll('.obstacle');

// 定义玩家初始位置
let playerTrack = 1; // 初始赛道

// 监听触摸事件
let startX = null;

player.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

player.addEventListener('touchmove', function(e) {
    if (!startX) return;

    let touchX = e.touches[0].clientX;
    let diff = touchX - startX;
    if (diff > 0) {
        moveRight();
    } else {
        moveLeft();
    }
    startX = null; // 重置起始位置
});

// 左移动函数
function moveLeft() {
    if (playerTrack > 0) {
        playerTrack--; // 向左移动一个赛道
        updatePlayerPosition();
    }
}

// 右移动函数
function moveRight() {
    if (playerTrack < tracks.length - 1) {
        playerTrack++; // 向右移动一个赛道
        updatePlayerPosition();
    }
}

// 更新玩家位置函数
function updatePlayerPosition() {
    let trackWidth = tracks[0].offsetWidth; // 获取赛道宽度
    let newPosition = playerTrack * trackWidth;
    player.style.left = newPosition + 'px';
}

// 移动障碍物
setInterval(function() {
    obstacles.forEach(function(obstacle) {
        let obstacleSpeed = obstacle.getAttribute('data-speed'); // 获取障碍物速度
        let obstacleBottom = obstacle.style.bottom ? parseInt(obstacle.style.bottom) : 0;
        obstacleBottom += parseInt(obstacleSpeed);

        // 重置障碍物位置
        if (obstacleBottom >= window.innerHeight) {
            obstacleBottom = -200; // 重新放置在顶部
            let randomTrack = Math.floor(Math.random() * tracks.length);
            obstacle.style.left = tracks[randomTrack].offsetLeft + 'px';
        }

        obstacle.style.bottom = obstacleBottom + 'px';
    });
}, 200); // 每200毫秒更新一次障碍物位置
