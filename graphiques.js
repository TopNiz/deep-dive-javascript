function checkChartStatus(chartId) {
    let chart = Chart.getChart(chartId);
    if (chart) {
        chart.destroy();
    }
}

function barsTicket(lignes) {
    let chartId = "bars_ticket";
    checkChartStatus(chartId);
    let canvas = document.querySelector(`#${chartId}`);
    let tickets = lignes.map((ligne) => ligne[0].valeur);
    let intervals = {};
    // for (let index = 0; index < Math.max(...tickets); index += 10) {
    //     intervals[index] = 0;
    // }
    let countTicketsByInterval = tickets.reduce((acc, ticket) => {
        let interval = Math.ceil(ticket / 10) * 10;
        acc[`]${interval - 10}-${interval}]`] = (acc[`]${interval - 10}-${interval}]`] || 0) + 1;
        return acc;
    }
        , intervals);

    const labels = Object.keys(countTicketsByInterval).sort();
    const values = labels.map(k => countTicketsByInterval[k]);
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Distribution des tickets',
                data: values,
                backgroundColor: 'rgba(99, 132, 255, 0.3)',
                borderColor: 'rgb(99, 132, 255)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Montant des tickets'
                    },
                },
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
}

function barsPourboire(lignes) {
    let chartId = "bars_pourboire";
    checkChartStatus(chartId);
    let canvas = document.querySelector(`#${chartId}`);
    let pourboires = lignes.map((ligne) => ligne[1].valeur);
    let intervals = {};
    // for (let index = 0; index < Math.max(...pourboires); index += 1) {
    //     intervals[index] = 0;
    // }
    let countPourboiresByInterval = pourboires.reduce((acc, pourboire) => {
        let interval = Math.ceil(pourboire);
        acc[`]${interval - 1}-${interval}]`] = (acc[`]${interval - 1}-${interval}]`] || 0) + 1;
        return acc;
    }
        , intervals);

    const labels = Object.keys(countPourboiresByInterval).sort();
    const values = labels.map(k => countPourboiresByInterval[k]);
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Distribution des pourboires',
                data: values,
                backgroundColor: 'rgba(99, 132, 255, 0.3)',
                borderColor: 'rgb(99, 132, 255)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Montant des pourboires'
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function bubblePourboireTicketsCouverts(lignes) {
    let chartId = "bubble_pourboire_ticket_couvert";
    checkChartStatus(chartId);
    let canvas = document.querySelector(`#${chartId}`);
    let tickets = lignes.map((ligne) => ligne[0].valeur);
    let pourboires = lignes.map((ligne) => ligne[1].valeur);
    let couverts = lignes.map((ligne) => ligne[6].valeur);
    let data = {
        labels: 'Pourboire',
        datasets: [{
            label: 'Pourboire, tickets et couverts',
            data: couverts.map((couvert, index) => ({
                x: tickets[index],
                y: pourboires[index],
                r: couvert
            })),
            backgroundColor: 'rgba(99, 132, 255, 0.3)',
            borderColor: 'rgb(99, 132, 255)',
            borderWidth: 1
        }]
    };

    new Chart(canvas, {
        type: 'bubble',
        data: data,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Montant des tickets'
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Montant du pourboire'
                    },
                }
            }
        }
    });
}