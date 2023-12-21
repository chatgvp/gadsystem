const React = require("react")
const { Bar } = require("react-chartjs-2")
const { LinearScale, BarElement, CategoryScale, Chart } = require("chart.js")

Chart.register(LinearScale, BarElement, CategoryScale)

const QuarterlyGender = ({ genderDistributionData, date }) => {
    const formattedDate = convertStringToDateObject(date)

    const filteredData = genderDistributionData.filter(
        (item) => item.year === formattedDate.year
    )
    const uniqueQuarters = [
        ...new Set(filteredData.map((item) => item.quarter)),
    ]
    filteredData.sort(
        (a, b) =>
            uniqueQuarters.indexOf(a.quarter) -
                uniqueQuarters.indexOf(b.quarter) ||
            a.category.localeCompare(b.category)
    )
    const data = {
        labels: uniqueQuarters.map((quarter) => `Quarter ${quarter}`),
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
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgb(54, 162, 235)",
            },
            {
                label: "Others",
                data: filteredData
                    .filter((item) => item.category === "Others")
                    .map((item) => item.total_count),
                backgroundColor: "rgba(255, 206, 86, 0.2)",
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

module.exports = QuarterlyGender
