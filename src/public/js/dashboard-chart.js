//SORT DATA BY DATE
//FIND MIN AND MAX FOR Y AXIS


const chartCanvas = document.getElementById('weightChart').getContext('2d');

const renderChart = async (dataset) => {
    const weights = await dataset.map((data) => {
        return parseInt(data.weight)
    })
    const bodyfat = await dataset.map((data) => {
        return parseInt(data.bodyfat)
    })
    new Chart(chartCanvas, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Weight data',
                data: weights,
                borderColor: [
                    'rgba(255, 99, 132)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 170,
                        suggestedMax: 185
                    }
                }]
            }
        }
    });
}
