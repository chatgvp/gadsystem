const React = require("react")
const { Bar } = require("react-chartjs-2")
const { LinearScale, BarElement, CategoryScale, Chart } = require("chart.js")

Chart.register(LinearScale, BarElement, CategoryScale)

const MonthlyGender = ({ genderMonthlyData, date }) => {
    const formattedDate = convertStringToDateObject(date)
    const filteredData = genderMonthlyData.filter(
        (item) => item.year === formattedDate.year
    )
    filteredData.sort((a, b) => a.category.localeCompare(b.category))

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

    // Get distinct months
    const distinctMonths = [...new Set(filteredData.map((item) => item.month))]

    const data = {
        labels: distinctMonths.map((month) => monthNames[month - 1]),
        datasets: [
            {
                label: "Female",
                data: filteredData
                    .filter((item) => item.category === "Female")
                    .map((item) => item.total_count),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
            },
            {
                label: "Male",
                data: filteredData
                    .filter((item) => item.category === "Male")
                    .map((item) => item.total_count),
                backgroundColor: "rgba(255, 99, 302, 0.2)",
                borderColor: "rgb(255, 99, 132)",
            },
            {
                label: "Others",
                data: filteredData
                    .filter((item) => item.category === "Others")
                    .map((item) => item.total_count),
                backgroundColor: "rgba(255, 206, 86, 3)",
                borderColor: "rgb(255, 206, 86)",
            },
        ],
    }

    return (
        <div>
            <Bar data={data} />
        </div>
    )
}

// Helper function to convert date string to object
const convertStringToDateObject = (dateString) => {
    const dateArray = dateString.split(" ")
    const month = parseInt(dateArray[0])
    const year = parseInt(dateArray[1])
    return { month, year }
}

module.exports = MonthlyGender
