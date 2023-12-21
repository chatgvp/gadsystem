const React = require("react")
const { Bar } = require("react-chartjs-2")
const {
    LinearScale,
    BarElement,
    CategoryScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip,
    Chart,
} = require("chart.js")

Chart.register(
    LinearScale,
    BarElement,
    CategoryScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip
)

Chart.register(LinearScale, BarElement, CategoryScale)

const MonthlyAttendance = ({ totalAttendanceData, date }) => {
    const formattedDate = convertStringToDateObject(date)
    const filteredData = totalAttendanceData.filter(
        (item) => item.year === formattedDate.year
    )
    filteredData.sort((a, b) => a.month - b.month)
    const data = {
        labels: filteredData.map((item) => getMonthName(item.month)),
        datasets: [
            {
                label: `Total Attendance - ${formattedDate.year}`,
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

// Helper function to get month name
const getMonthName = (month) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    return monthNames[month - 1]
}

// Helper function to convert date string to object
const convertStringToDateObject = (dateString) => {
    const dateArray = dateString.split(" ")
    const month = parseInt(dateArray[0])
    const year = parseInt(dateArray[1])
    return { month, year }
}

module.exports = MonthlyAttendance
