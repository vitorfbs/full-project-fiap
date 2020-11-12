var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');

soundtrack_playing = false;

var score = 0;
var goal = 100;

var frame_to_second_count = 0;
var timer = 80;

var current_letter_objective = 0;

var next_spawn_letter = 1;

var height_player = 60;
var width_player = 60;
var hitbox_player_x = 38;
var hitbox_player_y = 28;
var x_player = 360;
var y_player = 300;

var height_letter = 30;
var width_letter = 30;
var hitbox_letter_x = 21;
var hitbox_letter_y = 21;

var letter_text_1 = getObjectiveLetter(current_letter_objective);
var letter_color_1 = "magenta";
var x_letter_1 = 150;
var y_letter_1 = 180;

var letter_text_2 = getRandomLetter();
var letter_color_2 = "red";
var x_letter_2 = 380;
var y_letter_2 = 180;

var letter_text_3 = getRandomLetter();
var letter_color_3 = "yellow";
var x_letter_3 = 600;
var y_letter_3 = 180;


var speed_player = 1;

var sprite_player = new Image();
sprite_player.src = './assets/char_right_1.png';

sprite_animations = ['./assets/char_right_1.png', './assets/char_right_2.png', './assets/char_right_3.png', './assets/char_right_4.png'];
sprite_animations_right = ['./assets/char_right_1.png', './assets/char_right_2.png', './assets/char_right_3.png', './assets/char_right_4.png'];
sprite_animations_left = ['./assets/char_left_1.png', './assets/char_left_2.png', './assets/char_left_3.png', './assets/char_left_4.png'];

current_sprite_animation = 0;


soundtrack = new sound("./assets/stage-3.mp3");
window.onkeyup = requestAnimationFrame(gameloop);

function gameloop() {
    window.onkeydown = movePlayer;
    window.onkeyup = stopPlayer;

    hitbox_player_position_x = x_player + 13;
    hitbox_player_position_y = y_player + 20;

    spawnPlayer(x_player,y_player);

    hitbox_letter_1_position_x = x_player - 11;
    hitbox_letter_1_position_y = y_player - 27;
    spawnLetter1(x_letter_1, y_letter_1);

    hitbox_letter_2_position_x = x_player - 11;
    hitbox_letter_2_position_y = y_player - 27;
    spawnLetter2(x_letter_2, y_letter_2);

    hitbox_letter_3_position_x = x_player - 11;
    hitbox_letter_3_position_y = y_player - 27;
    spawnLetter3(x_letter_3, y_letter_3);

    collisionCheck();

    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.font='bold 18px Arcade';
    ctx.fillText("Pontos: " + score, 10, 380);
    ctx.fillText("Objetivo: " + goal, 120, 380);
    ctx.fillText("Tempo: " + Math. floor(timer / 60) + ":" + timer%60, 250, 380);
    ctx.fillText("Letra  Atual: " + getObjectiveLetter(current_letter_objective), 350, 380);

    y_player += 0.05;
    if(frame_to_second_count >= 59) {
        timer--;
        frame_to_second_count = 0;
    } else {
        frame_to_second_count++;
    }

    if(frame_to_second_count % 8 == 0) {
        if(current_sprite_animation < 3){
            current_sprite_animation++;
        }
        else {
            current_sprite_animation = 0;
        }
    }

    sprite_player.src = sprite_animations[current_sprite_animation]
    if(x_player > 800){
        x_player = 1;
    }
    if(x_player < 0){
        x_player = 760;
    }
    if(y_player < 0){
        y_player = 1;
    }

    if(y_player > 380){
        soundtrack.stop();
        outOfBounds();
    } else if(timer <= 0){
        soundtrack.stop();
        timeUp();
    } else {
        requestAnimationFrame(gameloop);
    }
}

function spawnPlayer(x,y) {
    ctx.clearRect(0, 0, 800, 400);
    ctx.drawImage(sprite_player, x, y, height_player, width_player);
}

function spawnLetter1(x,y) {
    ctx.fillStyle = letter_color_1;
    ctx.textAlign = "center";
    ctx.font='bold 50px Arcade';
    ctx.strokeStyle = 'black';
    ctx.fillText(letter_text_1, x, y);
    ctx.strokeText(letter_text_1, x, y);
    next_spawn_letter = 2;
}

function spawnLetter2(x,y) {
    ctx.fillStyle = letter_color_2;
    ctx.textAlign = "center";
    ctx.font='bold 50px Arcade';
    ctx.strokeStyle = 'black';
    ctx.fillText(letter_text_2, x, y);
    ctx.strokeText(letter_text_2, x, y);
    next_spawn_letter = 3;
}

function spawnLetter3(x,y) {
    ctx.fillStyle = letter_color_3;
    ctx.textAlign = "center";
    ctx.font='bold 50px Arcade';
    ctx.strokeStyle = 'black';
    ctx.fillText(letter_text_3, x, y);
    ctx.strokeText(letter_text_3, x, y);
    next_spawn_letter = 1
}

function generateLetterY() {
    do {
        new_y = Math.random() * (300 - 40) + 40;
    }
        while (new_y == y_letter_1
            || new_y == y_letter_2
            || new_y == y_letter_3
            || new_y == y_player
            || (new_y > y_letter_1 && new_y < y_letter_1)
            || (new_y < y_letter_2 && new_y > y_letter_2)
            || (new_y < y_letter_3 && new_y > y_letter_3)
            || (new_y < y_player && new_y > y_player));
    return new_y;
}

function generateLetterX() {
    do {
        new_x = Math.random() * (600 - 40) + 40;
    }
    while (new_x == x_letter_1
        || new_x == x_letter_2
        || new_x == x_letter_3
        || new_x == x_player
        || (new_x < x_letter_1 && new_x > x_letter_1)
        || (new_x > x_letter_2 && new_x < x_letter_2)
        || (new_x > x_letter_3 && new_x < x_letter_3)
        || (new_x > x_player - 50 && new_x < x_player + 50));
    return new_x;
}

function movePlayer(keyPress){
    if(soundtrack_playing == false){
        soundtrack.play();
        soundtrack_playing = true;
    }
    speed_player+=0.5;
    if(speed_player > 10){
        speed_player = 10;
    }
    if(keyPress.keyCode == 38  ) {
        y_player = y_player - speed_player;
    }
    if(keyPress.keyCode == 40  ) {
        y_player = y_player + speed_player;
    }
    if(keyPress.keyCode == 39  ) {
        sprite_animations = sprite_animations_right;
        x_player = x_player + speed_player;
    }
    if(keyPress.keyCode == 37  ) {
        sprite_animations = sprite_animations_left;
        x_player = x_player - speed_player;
    }
}

function stopPlayer(keyPress){
    if(speed_player > 5) {
        speed_player = 5;
    }
    while(speed_player > 1){
        speed_player--;
        if(keyPress.keyCode == 38) {
            y_player = y_player - speed_player;
        }
        if(keyPress.keyCode == 40) {
            y_player = y_player + speed_player;
        }
        if(keyPress.keyCode == 39) {
            x_player = x_player + speed_player;
        }
        if(keyPress.keyCode == 37) {
            x_player = x_player - speed_player;
        }
    if(speed_player <= 1){
        speed_player = 1;
        }
    }
}

function collisionCheck() {
    if(((x_letter_1 + width_letter - 10) > x_player
        && x_letter_1 < (x_player + width_player))
        && ((y_letter_1 + height_letter - 20) > y_player + 20
        && y_letter_1 < (y_player + height_player)))
      {
        check_validity(1);
      }
    if(((x_letter_2 + width_letter - 10) > x_player
        && x_letter_2 < (x_player + width_player))
        && ((y_letter_2 + height_letter - 20) > y_player + 20
        && y_letter_2 < (y_player + height_player)))
      {
        check_validity(2);
      }
    if(((x_letter_3 + width_letter - 10) > x_player 
        && x_letter_3 < (x_player + width_player)) 
        && ((y_letter_3 + height_letter - 20) > y_player + 20
        && y_letter_3 < (y_player + height_player))) 
      {
        check_validity(3);
      }
}

function check_validity(collision){
    x_letter_1 = generateLetterX();
    y_letter_1 = generateLetterY();
    x_letter_2 = generateLetterX();
    y_letter_2 = generateLetterY();
    x_letter_3 = generateLetterX();
    y_letter_3 = generateLetterY();

    if( collision == 1){
        score += 10;
        correct = new sound("./assets/correct.wav");
        correct.play();
        current_letter_objective ++;
    } else {
        score -= 10;
        wrong = new sound("./assets/wrong.wav");
        wrong.play();
    }
    letter_color_1 = getRandomColor();
    letter_color_2 = getRandomColor();
    letter_color_3 = getRandomColor();

    letter_text_1 = getObjectiveLetter(current_letter_objective);
    letter_text_2 = getRandomLetter();
    letter_text_3 = getRandomLetter();
}

function timeUp(){
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font='24px Arcade';
    if(score >= goal){
        victory = new sound("./assets/victory.wav");
        victory.play();
        ctx.fillText("Voce venceu! Va para a proxima fase: " + score, canvas.width-400, canvas.height-200);
        nextStageButton();
    } else {
        defeat = new sound("./assets/defeat.wav");
        defeat.play();
        ctx.fillText("Voce nao conseguiu pontos o suficiente! Tente novamente: " + score, canvas.width-400, canvas.height-200);
    }

    clearTimeout();

}

function outOfBounds(){
    explosion = new sound("./assets/explosion.flac");
    explosion.play();
    defeat = new sound("./assets/defeat.wav");
    defeat.play();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font='24px Arcade';
    ctx.fillText("Oh nao, voce caiu no chao! Tente de novo: " + score, canvas.width-400, canvas.height-200); 
    clearTimeout();
}

function nextStageButton(){
    document.getElementById("next-stage").style.display = "inline";
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";

    document.body.appendChild(this.sound);

    this.play = function(){
        this.sound.play();
    }

    this.stop = function(){
        this.sound.pause();
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLetter() {
    alphabet = getAlphabet();
    letter = getRandomInt(0, 25);
    while(letter == current_letter_objective){
        letter = getRandomInt(0, 25);
    }
    return alphabet[letter];
}

function getRandomColor() {
    colors = ["magenta","red","blue","green","yellow","pink","lightblue", "lightred", "purple", "brown", "white"]
    return colors[getRandomInt(0,10)]
}

function getObjectiveLetter(number) {
    if(current_letter_objective > 25){
        current_letter_objective = 0;
        number = 0;
    }
    alphabet = getAlphabet();
    return alphabet[number];
}

function getAlphabet() {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
}