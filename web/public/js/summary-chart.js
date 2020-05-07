getData = async function() {
    try {
        const data = await get('/scores/summary')
        const isEmpty = Object.keys(data).length === 0 && data.constructor === Object
        var chartArray = []
        if (!isEmpty) {
            chartArray.push(['Date', 'Score', 'Average', 'Goal'])
            for (var i = data.summary.length - 1; i>-1; i--) {
                chartArray.push([data.summary[i].date,data.summary[i].score,data.summary_stats[0].average, data.summary_stats[0].goal])
            }
            while (chartArray.length < 12) {
                chartArray.push(['',null,data.summary_stats[0].average,data.summary_stats[0].goal])
            }
        } else {
            document.getElementById('no-data').innerHTML = 'No data yet. Post a score!'
        }
        return chartArray
    } catch (e) {
        console.log(e)
    }
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
    try {
    const chartArray = await getData()
    console.log(chartArray)
        if (chartArray.length > 0){
            var data = google.visualization.arrayToDataTable(chartArray);
            //data.addColumn({type: 'string', role: 'tooltip'});
            var options = {
            //curveType: 'function',
            legend: { position: 'top' },
            chartArea: {'width': '90%', 'height': '80%'},
            hAxis: {
                slantedText: true,
              }
            }
            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'))
            chart.draw(data, options)
        }
    } catch (e) {
        console.log(e)
    }
}