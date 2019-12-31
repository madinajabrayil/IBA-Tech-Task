var burger = document.querySelector('.burger-btn');
var menu = document.querySelector('.menu');

burger.addEventListener('click', function() {
    burger.classList.toggle('active')
    menu.classList.toggle('active')
})



let dbTable = document.getElementById("db_table");


var dbRequest = new XMLHttpRequest();
dbRequest.open('GET', 'https://jsonplaceholder.typicode.com/todos');
dbRequest.onload = function() {
    var dbData = JSON.parse(dbRequest.responseText);
    renderHTML(dbData);

};

dbRequest.send();



function renderHTML(data) {
    var tableData = ''
    for (i = 0; i < data.length; i++) {
        tableData += '<tr>';
        tableData += '<td>' + data[i].userId + '</td>';
        tableData += '<td>' + data[i].id + '</td>';
        tableData += '<td>' + data[i].title + '</td>';
        tableData += '<td>' + data[i].completed + '</td>';
        tableData += '</tr>';
    }
    dbTable.insertAdjacentHTML('beforeend', tableData)
}

//SORT TABLE

let th = document.getElementsByClassName('table-heading');

for (let c = 0; c < th.length; c++) {
    th[c].addEventListener('click', sortedItem(c))
}

function sortedItem(c) {
    return function() {
        console.log(c);
        sortTable(c);
    }
}

function sortTable(c) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("db_table");
    switching = true;

    while (switching) {

        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[c];
            y = rows[i + 1].getElementsByTagName("TD")[c];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}