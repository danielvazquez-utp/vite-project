import ReactECharts from 'echarts-for-react'
const LineChart = ({ temperaturas, fechas, titulo }) => {
    const options = {
        title: {
            text: titulo,
        },
        xAxis: {
          type: 'category',
          data: fechas,
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: temperaturas,
            type: 'line',
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Promedio' }]
            },
            label: {
                show: true,
                position: 'top'
            },
          }
        ]
    };
    return (
        <ReactECharts option={ options } />
    )
}
export default LineChart

LineChart.defaultProps = {
    fechas: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    temperaturas: [150, 230, 224, 218, 135, 147, 260],
    titulo: 'Temperature Change in the Coming Week',
}