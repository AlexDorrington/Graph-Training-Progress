//SORT DATA BY DATE
//FIND MIN AND MAX FOR Y AXIS

const chartCanvas = document.getElementById('weightChart').getContext('2d');

const renderChart = async () => {
    const data = await issueChartData(weightData)
    new Chart(chartCanvas, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Weight',
                data: data.weigh,
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
                        suggestedMin: data.weigh[0],
                        suggestedMax: data.weigh[data.weigh.length - 1]
                    },
                    scaleLabel: {
                        display: true,
                        labelString: `Weight`
                    }
                }],
                xAxes: [{
                    type: 'category',
                    labels: data.dates,
                    display: false
                }]
            }
        }
    });
}


const issueChartData = async (dataset) => {
    const dataRecords = await dataset.map((data) => {
        let dateRecord = data.date.replace(/-/g, '')
        return {
            weight: parseInt(data.weight),
            bodyfat: parseInt(data.bodyfat),
            date: parseInt(dateRecord)
        }
    })
    dataRecords.sort((a, b) => a.date - b.date)
    const weigh = dataRecords.map(data => {
        return data.weight
    })
    const dates = dataRecords.map(data => {
        return data.date
    })
    return {
        weigh,
        dates
    }
}