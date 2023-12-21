const React = require("react")
const { Bar } = require("react-chartjs-2")
const { LinearScale, BarElement, CategoryScale, Chart } = require("chart.js")

Chart.register(LinearScale, BarElement, CategoryScale)

const convertStringToDateObject = (dateString) => {
    const dateArray = dateString.split(" ")
    const month = parseInt(dateArray[0])
    const year = parseInt(dateArray[1])
    return { month, year }
}

const SpecificMonth = ({ totalAttendanceData, date }) => {
    const formattedDate = convertStringToDateObject(date)
    const filteredData = totalAttendanceData.filter(
        (item) =>
            item.event_year === formattedDate.year &&
            item.event_month === formattedDate.month
    )
    filteredData.sort((a, b) => a.event_month - b.event_month)
    const data = {
        labels: filteredData.map((item) => item.event_name),
        datasets: [
            {
                label: "Total Attendance",
                data: filteredData.map((item) => item.total_count),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    }
    return (
        <div>
            <Bar data={data} />
        </div>
    )
}

module.exports = SpecificMonth
