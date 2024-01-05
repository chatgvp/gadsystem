const React = require("react")
const { Bar } = require("react-chartjs-2")
const { LinearScale, BarElement, CategoryScale, Chart } = require("chart.js")

Chart.register(LinearScale, BarElement, CategoryScale)

const YearlyGender = ({ genderDistributionData }) => {
    const uniqueYears = [
        ...new Set(genderDistributionData.map((item) => item.year)),
    ]
    const sortedYears = uniqueYears.sort((a, b) => a - b)

    const data = {
        labels: sortedYears.map((year) => year.toString()),
        datasets: [
            {
                label: "Female",
                data: sortedYears.map((year) =>
                    getTotalCountByCategory(
                        genderDistributionData,
                        year,
                        "Female"
                    )
                ),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgb(255, 99, 132)",
            },
            {
                label: "Male",
                data: sortedYears.map((year) =>
                    getTotalCountByCategory(
                        genderDistributionData,
                        year,
                        "Male"
                    )
                ),
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgb(54, 162, 235)",
            },
            {
                label: "Others",
                data: sortedYears.map((year) =>
                    getTotalCountByCategory(
                        genderDistributionData,
                        year,
                        "Others"
                    )
                ),
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

// Helper function to get total count for a specific category in a given year
const getTotalCountByCategory = (data, year, category) => {
    return data
        .filter((item) => item.year === year && item.category === category)
        .reduce((total, item) => total + item.total_count, 0)
}

module.exports = YearlyGender
