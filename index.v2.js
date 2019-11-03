'use strict'

const rnd = (c) => { return Math.floor((Math.random(0) * c) + 1); }
const _newNumber = (count = 1) => {
    if (hasMove) {
        for (let i = 0; i < count; i++) {
            const nullBlocks = blocks.filter(x => x.value === 0);
            let t = rnd(nullBlocks.length);
            const block = nullBlocks[t - 1];
            block.setValue(2);
        }
        hasMove = false;
    }
}

class _user_point {
    constructor(point, name) {
        this.point = point;
        this.name = name;
        this.pointElement = document.getElementById('point');
        this.nameElement = document.getElementById('name');
        this.setName(name)
    }

    setName(newName) {
        this.nameElement.innerText = newName;
    }
    setPoint(newPoint) {
        this.pointElement.innerText = newPoint;
    }
    addPoint(point) {
        this.pointElement.innerText = Number(this.pointElement.innerText) + Number(point);
    }
}

class _block {
    constructor(row, column, value) {
        this.row = row;
        this.column = column;
        this.value = value;
        this.element = document.querySelector('[data-row="' + this.row + '"][data-column="' + this.column + '"]');
    }

    getElement() {
        return this.element;
    }

    setValue(value) {
        this.element.innerText = value;
        user.addPoint(value);
        if (Number(value) !== Number(this.value)) {
            this.element.setAttribute('class', 'box col animated fadeIn c-' + value);
            hasMove = true;
        } else {
            this.element.setAttribute('class', 'box col c-' + value);
        }
        this.value = value;
    }
}

const user =new _user_point(0, 'Can Akburu');

let blocks = [];
let hasMove = true;
const Init = () => {
    let count = 0;
    blocks = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            blocks.push(new _block(i, j, 0));
            blocks[count].setValue(0);
            count++;
        }
    }
    _newNumber(2);
}

window.onload = () => {
    Init();

    document.addEventListener('swiped-left', function (e) {
        pressLeftArrow();
        _newNumber();
    });

    document.addEventListener('swiped-right', function (e) {
        pressRightArrow();
        _newNumber();
    });

    document.addEventListener('swiped-up', function (e) {
        pressUpArrow();
        _newNumber();
    });

    document.addEventListener('swiped-down', function (e) {
        pressBottomArrow();
        _newNumber();
    });
};

document.onkeyup = (e) => {
    const code = e.keyCode | e.which;
    e.preventDefault();
    switch (code) {
        case 37: //left
            pressLeftArrow();
            _newNumber();
            break;
        case 39: //Right
            pressRightArrow();
            _newNumber();
            break;
        case 38: //Up
            pressUpArrow();
            _newNumber();
            break;
        case 40://Down
            pressBottomArrow();
            _newNumber();
            break;
    }
}
const pressRightArrow = () => {
    let _j = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const block = blocks.filter(x => x.column === j && x.row === i)[0];
            if (block != null) {
                _j++;
                const nextblock = blocks.filter(x => x.column === _j && x.row === i)[0];
                nextBlock(nextblock, block);
            }
        }
        _j = 0;
    }
}
const pressLeftArrow = () => {
    let _j = 3;
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            const block = blocks.filter(x => x.column === j && x.row === i)[0];
            if (block != null) {
                _j--;
                const nextblock = blocks.filter(x => x.column === _j && x.row === i)[0];
                nextBlock(nextblock, block);
            }
        }
        _j = 3;
    }
}
const pressUpArrow = () => {
    let _j = 3;
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
            const block = blocks.filter(x => x.column === i && x.row === j)[0];
            if (block != null) {
                _j--;
                const nextblock = blocks.filter(x => x.column === i && x.row === _j)[0];
                nextBlock(nextblock, block);
            }
        }
        _j = 3;
    }
}
const pressBottomArrow = () => {
    let _j = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const block = blocks.filter(x => x.column === i && x.row === j)[0];
            if (block != null) {
                _j++;
                const nextblock = blocks.filter(x => x.column === i && x.row === _j)[0];
                nextBlock(nextblock, block);
            }
        }
        _j = 0;
    }
}
const nextBlock = (nextblock, block) => {
    if (nextblock != null) {
        if (nextblock.value === block.value) {
            nextblock.setValue(block.value + block.value);
            block.setValue(0);
        } else if (nextblock.value !== block.value && nextblock.value === 0) {
            nextblock.setValue(block.value);
            block.setValue(0);
        }
    }
}
