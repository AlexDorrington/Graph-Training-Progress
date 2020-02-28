const chartCanvas = document.getElementById('exerciseChart').getContext('2d');

let chartSelection = 'squat';

const renderExerciseChart = async () => {
    const data = await fetch(`http://localhost:3000/exercises/retrieveExist`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const exerciseData = await data.json()
    const exercises = await issueChartData(exerciseData)

    new Chart(chartCanvas, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Rep to Weight ratio throughout the year',
                data: exercises[chartSelection],
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

renderExerciseChart()