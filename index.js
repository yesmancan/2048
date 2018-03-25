"use strict";

let UserPoint = 0;
let box = [
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0
];
let a = [2, 4];
let log = [];
$(document).ready(function () {
  userNum(0);
  let t = rnd(15);
  box[t] = a[rnd(2) - 1];
  let T = rnd(15);
  while (t === T) {
    T = rnd(15);
  }
  box[T] = a[rnd(2) - 1];
  loadhtml();
});
$(document).keydown(function (event) {
  var code = event.keyCode | event.which;
  event.preventDefault();
  switch (code) {
    //left
    case 37:
      left();
      newNumber();
      break;
    //Right
    case 39:
      right();
      newNumber();
      break;
    //Up
    case 38:
      up();
      newNumber();
      break;
    //Down
    case 40:
      down();
      newNumber();
      break;
  }
});

function left() {
  for (let i = 3; i >= 1; i--)
    contCheckNeg(1, i)
  for (let i = 7; i >= 5; i--)
    contCheckNeg(1, i)
  for (let i = 11; i >= 9; i--)
    contCheckNeg(1, i)
  for (let i = 15; i >= 13; i--)
    contCheckNeg(1, i)
}

function right() {
  for (let i = 0; i <= 2; i++)
    contCheckPos(1, i);
  for (let i = 4; i <= 6; i++)
    contCheckPos(1, i);
  for (let i = 8; i <= 10; i++)
    contCheckPos(1, i);
  for (let i = 12; i <= 14; i++)
    contCheckPos(1, i);
}

function up() {
  for (let i = 12; i >= 0; i -= 4)
    contCheckNeg(4, i);
  for (let i = 13; i >= 1; i -= 4)
    contCheckNeg(4, i);
  for (let i = 14; i >= 2; i -= 4)
    contCheckNeg(4, i);
  for (let i = 15; i >= 3; i -= 4)
    contCheckNeg(4, i);
}

function down() {
  for (let i = 0; i <= 12; i += 4)
    contCheckPos(4, i);
  for (let i = 1; i <= 13; i += 4)
    contCheckPos(4, i);
  for (let i = 2; i <= 14; i += 4)
    contCheckPos(4, i);
  for (let i = 3; i <= 15; i += 4)
    contCheckPos(4, i);
}

function contCheckNeg(a, i) {
  if (box[i - a] === 0) {
    box[i - a] = box[i];
    box[i] = 0;
  } else if (box[i] == box[i - a]) {
    box[i - a] = box[i] * 2;
    logger("Hamle index :" + i + " | " + " Eksi Deger  :" + a);
    userNum(box[i]);
    box[i] = 0;
  }
}

function contCheckPos(a, i) {
  if (box[i + a] === 0) {
    box[i + a] = box[i];
    box[i] = 0;
  } else if (box[i] == box[i + a]) {
    box[i + a] = box[i] * 2;
    logger("Hamle index :" + i + " | " + " Eksi Deger  :" + a);
    userNum(box[i]);
    box[i] = 0;
  }
}

function newNumber() {
  let z = 0;

  for (let i = 0; i < rnd(2); i++) {
    let t = rnd(15);
    if (box[t] === 0) {
      box[t] = a[rnd(2) - 1];
      logger("Yeni Oluşturulan Sayı " + box[t] + " Konumu :" + t)
    } else {
      let countEmptyCell = 0;
      for (let i = 0; i < box.length; i++) {
        if (box[i] !== 0) {
          countEmptyCell++;
        }
      }
      if (countEmptyCell == box.length) {
        alert("Oyun Bitti");
      } else {
        i--;
      }
    }
  }

  loadhtml();
}
function logger(L) {
  log.push("<div>" + log.length + " : " + L + "</div>")
  $('#LogSec').append(log[log.length - 1])
  console.log(L);
}
function rnd(c) {
  return Math.floor((Math.random(0) * c) + 1);
}
function userNum(num) {
  UserPoint += Number(num);
  logger("Kullanıcı Puan Kazandı : " + num + " Toplam Puan : " + UserPoint);
  $('#userSec #point').text(UserPoint);
}
function loadhtml() {
  for (let i = 0; i < box.length; i++) {
    $(".gameCont > .color > .col").eq(i).removeClass(function (index, className) {
      return (className.match(/\bc-\S+/g) || []).join(' ');
    });
    $('.gameCont > .color > .col').eq(i).html(box[i]);
    $('.gameCont > .color > .col').eq(i).addClass("c-" + box[i]);
  }
}
