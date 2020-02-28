const chartCanvasSquats = document.getElementById('squatChart').getContext('2d');
const chartCanvasBench = document.getElementById('benchChart').getContext('2d');
const chartCanvasShoulder = document.getElementById('shoulderChart').getContext('2d');
const chartCanvasDeadlift = document.getElementById('deadliftChart').getContext('2d');

const renderSquatChart = async () => {
    const data = await fetch(`http://localhost:3000/exercises/retrieveExist`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const exerciseData = await data.json()
    const {squat, dates} = await issueChartData(exerciseData)

    new Chart(chartCanvasSquats, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Rep to Weight ratio throughout the year',
                data: squat,
                borderColor: '#ff6600',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'Weight'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Reps'
                    }
                }]
            }
        }
    });
}

const renderBenchChart = async () => {
    const data = await fetch(`http://localhost:3000/exercises/retrieveExist`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const exerciseData = await data.json()
    const {bench, dates} = await issueChartData(exerciseData)

    new Chart(chartCanvasBench, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Rep to Weight ratio throughout the year',
                data: bench,
                borderColor: '#ff6600',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'Weight'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Reps'
                    }
                }]
            }
        }
    });
}

const renderShoulderChart = async () => {
    const data = await fetch(`http://localhost:3000/exercises/retrieveExist`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const exerciseData = await data.json()
    const {shoulder, dates} = await issueChartData(exerciseData)

    new Chart(chartCanvasShoulder, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Rep to Weight ratio throughout the year',
                data: shoulder,
                borderColor: '#ff6600',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'Weight'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Reps'
                    }
                }]
            }
        }
    });
}

const renderDeadliftChart = async () => {
    const data = await fetch(`http://localhost:3000/exercises/retrieveExist`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const exerciseData = await data.json()
    const {deadlift, dates} = await issueChartData(exerciseData)

    new Chart(chartCanvasDeadlift, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Rep to Weight ratio throughout the year',
                data: deadlift,
                borderColor: '#ff6600',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'Weight'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Reps'
                    }
                }]
            }
        }
    });
}

const issueChartData = async (dataset) => {
    const dataRecords = await dataset.map((data) => {
        const {dateBtn, squats, bench, shoulder, deadlift} = data
        const dateRecord = dateBtn.replace(/-/g, '')
        return {
            date: parseInt(dateRecord),
            squats: {
                x: parseInt(squats.weight),
                y: parseInt(squats.reps)
            },
            bench: {
                x: parseInt(bench.weight),
                y: parseInt(bench.reps)
            },
            shoulder: {
                x: parseInt(shoulder.weight),
                y: parseInt(shoulder.reps)
            },
            deadlift: {
                x: parseInt(deadlift.weight),
                y: parseInt(deadlift.reps)
            }
        }
    })

    dataRecords.sort((a, b) => a.date - b.date)

    const squat = dataRecords.map((data) => data.squats)
    const bench = dataRecords.map((data) => data.bench)
    const shoulder = dataRecords.map((data) => data.shoulders)
    const deadlift = dataRecords.map((data) => data.deadlift)

    const dates = await dataRecords.map((data) => {
        const dateProp = data.date
        const datePropAsArray = dateProp.toString().split('')
        datePropAsArray.splice(1, 0, '-')
        const datePropString = datePropAsArray.join('')
        return datePropString
    })

    return {
        squat,
        bench,
        shoulder,
        deadlift,
        dates
    }
}

renderSquatChart()
renderBenchChart()
renderShoulderChart()
renderDeadliftChart()