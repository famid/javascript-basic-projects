let count = 0;

const value = document.getElementById('value');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const classList = event.currentTarget.classList;
        if(classList.contains('decrease')) count--;
        else if(classList.contains('increase')) count++;
        else count = 0;

        let textColor = getColor();

        value.style.color = textColor;
        value.textContent = count;

    });
});


function getColor() {
    if (count === 0) return "";
    return count > 0 ? "green" : "red";
}








/*===========Myself implementation ============*/
// let counter = document.getElementById('value');
//
// let buttons = document.querySelectorAll('.btn');
//
// let downBtn = buttons[0];
// let upBtn = buttons[2];
// let resetBtn = buttons[1];
//
// downBtn.addEventListener('click', () => {
//     let valueToInsert = counter.innerText - 1;
//     counter.style.color = getColor(valueToInsert);
//     counter.innerText = String(valueToInsert);
// });
//
// upBtn.addEventListener('click', () => {
//     let valueToInsert = parseInt(counter.innerText) + 1;
//     counter.style.color = getColor(valueToInsert);
//     counter.innerText = String(valueToInsert);
// });
//
// resetBtn.addEventListener('click', () => {
//     counter.style.color = getColor('0')
//     counter.innerText = '0';
// });
//
// function getColor(value) {
//
//     if(value > 0) {
//         return 'green';
//     }else if(value < 0) {
//         return "red"
//     }
//
//     return '';
// }