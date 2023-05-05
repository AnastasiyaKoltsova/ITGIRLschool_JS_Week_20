import { keysRU } from './data.js';

const select = document.querySelector('select');
const input = document.querySelector('.input-amount');
const button = document.querySelector('.btn-request');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const entityType = select.value.toLowerCase();
    const entityId = input.value;
    const url = `https://swapi.nomoreparties.co/${entityType}/${entityId}/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            
            const dataCopy = JSON.parse(JSON.stringify(data));
            const resultBlock = document.querySelector('.container-answer');
            let tableHTML = '<table><thead><tr>';
            let counter = 0;
            for (let key in dataCopy) {
                if (counter >= 6) {
                    break;
                }
                let keyRU = keysRU[key] || key;
                tableHTML += `<th>${keyRU}</th>`;
                counter++;
            }
            tableHTML += '</tr></thead><tbody><tr>';
            counter = 0;
            for (let key in dataCopy) {
                if (counter >= 6) {
                    break;
                }
                let value = dataCopy[key];
                if (key === 'url' && value.startsWith('http')) {
                    value = value.split(',').map((url) => url.trim()).join(', ');
                }
                if (key === 'url') {
                    value = `<a href="${value}">${value}</a>`;
                }
                tableHTML += `<td>${value}</td>`;
                counter++;
            }
            tableHTML += '</tr></tbody></table>';
            resultBlock.innerHTML = tableHTML;
        })
        .catch(error => {
            console.error(error);
            const resultBlock = document.querySelector('.container-answer');
            resultBlock.textContent = `Произошла ошибка: ${error}`;
        });
});