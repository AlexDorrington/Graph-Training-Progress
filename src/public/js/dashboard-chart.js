const chartCanvasWeight = document.getElementById('weightChart').getContext('2d');
const chartCanvasBodyfat = document.getElementById('bodyfatChart').getContext('2d');

const renderWeightChart = async () => {
    const {weigh, dates} = await issueChartData(weightData)
    new Chart(chartCanvasWeight, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Weight progression',
                data: weigh,
                borderColor: '#ff6600',
                borderWidth: 2
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: "#ff6600",
                    fontSize: 16
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: weigh[0],
                        suggestedMax: weigh[weigh.length - 1],
                        fontColor: '#ff6600',
                        fontSize: 14,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: `Weight`,
                        fontColor: '#ff6600',
                        fontSize: 14
                    }
                }],
                xAxes: [{
                    type: 'category',
                    labels: dates,
                    display: false
                }]
            }
        }
    });
}

const renderBodyfatChart = async () => {
    const {bodyfat, dates} = await issueChartData(weightData)
    new Chart(chartCanvasBodyfat, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Bodyfat progression',
                data: bodyfat,
                borderColor: '#ff6600',
                borderWidth: 2
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: "#ff6600",
                    fontSize: 16
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: bodyfat[0],
                        suggestedMax: bodyfat[bodyfat.length - 1],
                        fontColor: '#ff6600',
                        fontSize: 14,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: `Bodyfat %`,
                        fontColor: '#ff6600',
                        fontSize: 14
                    }
                }],
                xAxes: [{
                    type: 'category',
                    labels: dates,
                    display: false
                }]
            }
        }
    });
}


const issueChartData = async (dataset) => {
    const dataRecords = await dataset.map((data) => {
        const {date, weight, bodyfat} = data
        const dateRecord = date.replace(/-/g, '')
        return {
            weight: parseInt(weight),
            bodyfat: parseInt(bodyfat),
            date: parseInt(dateRecord)
        }
    })

    dataRecords.sort((a, b) => a.date - b.date)

    const weigh = dataRecords.map(data => data.weight)
    const bodyfat = dataRecords.map(data => data.bodyfat)

    const dates = dataRecords.map((data) => {
        const {date} = data
        const dateAsArray = date.toString().split('')
        dateAsArray.splice(4, 0, '-')
        dateAsArray.splice(7, 0, '-')
        return dateAsArray.join('')
    })
    return {
        weigh,
        bodyfat,
        dates
    }
}
