import Table from "./Table.js";

const getData = async () => {
    try {
        const res = await fetch('https://mahmoud-morsi0.github.io/jsonData/data.json');
        const data = await res.json();
        createTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

getData();
const groupDataByYear = (data) => {
    const groupedData = {};
    const uniqueYearsData = [];

    data.forEach(entry => {
        const year = entry.dateOfBirth.split('-')[0];
        if (groupedData[year]) {
            groupedData[year].push(entry);
        } else {
            groupedData[year] = [entry];
        }
    });

    for (const year in groupedData) {
        if (groupedData[year].length === 1) {
            uniqueYearsData.push(groupedData[year][0]);
            delete groupedData[year];
        }
    }

    if (uniqueYearsData.length > 0) {
        groupedData['unique years'] = uniqueYearsData;
    }

    console.log(groupedData)
    return groupedData;
};

const createTable = (data) => {
    const groupedData = groupDataByYear(data);
    let tableHTML = `<table  
    class="table table-striped table-hover table-borderless  align-middle">
    <thead>
        <tr class="table-primary">
           <th>Date of Birth</th>
           <th>First Name</th>
           <th>Last Name</th>
        </tr>
    </thead>
    <tbody>`;

    for (const year in groupedData) {
        const entries = groupedData[year];

        tableHTML += `<tr class="table-primary">
                        <td colspan="3" style="font-weight: bold;">${year}</td>
                      </tr>
                      `;

        entries.forEach(entry => {
            const row = new Table(entry);
            tableHTML += row.render();
        });
    }

    tableHTML += '</tbody></table>';
    // 

    document.getElementById('root').insertAdjacentHTML("beforeend", `${tableHTML}`)
};


