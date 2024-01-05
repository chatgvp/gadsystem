"use client"
import SpecificMonth from "./components/SpecificMonth"
import MonthlyAttendance from "./components/MonthlyAttendance"
import MonthlyGender from "./components/MonthlyGender"
import QuarterlyGender from "./components/QuarterlyGender"
import EventList from "./components/List"
import YearlyGender from "./components/YearlyGender"
import { Center, Container, SimpleGrid } from "@mantine/core"
import { useState, useEffect } from "react"
import {
    fetchSpecificEventData,
    fetchMonthlyAttendanceData,
    fetchMonthlyGenderData,
    fetchQuarterlyGenderData,
    fetchYearlyGenderData,
    getEventsList,
} from "./api"
import { MonthPickerInput } from "@mantine/dates"

export default function Home() {
    const [specificEventData, setSpecificEventData] = useState([])
    const [monthlyAttendanceData, setMonthlyAttendanceData] = useState([])
    const [monthlyGenderData, setMonthlyGenderData] = useState([])
    const [quarterlyGenderData, setQuarterlyGenderData] = useState([])
    const [yearlyGenderData, setYearlyGenderData] = useState([])
    const [eventList, setEventList] = useState([])
    const [databaseChange, setDatabaseChange] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const specificEventData = await fetchSpecificEventData()
                setSpecificEventData(specificEventData)

                const monthlyAttendanceData = await fetchMonthlyAttendanceData()
                setMonthlyAttendanceData(monthlyAttendanceData)

                const monthlyGenderData = await fetchMonthlyGenderData()
                setMonthlyGenderData(monthlyGenderData)

                const quarterlyGenderData = await fetchQuarterlyGenderData()
                setQuarterlyGenderData(quarterlyGenderData)

                const yearlyGenderData = await fetchYearlyGenderData()
                setYearlyGenderData(yearlyGenderData)

                const eventData = await getEventsList()
                setEventList(eventData)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [databaseChange]) // Re-fetch data when databaseChange state changes

    const [dateValue, setDateValue] = useState<Date | null>(new Date())
    const [formattedDate, setFormattedDate] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    })

    useEffect(() => {
        if (dateValue) {
            const format = {
                month: dateValue.getMonth() + 1,
                year: dateValue.getFullYear(),
            }
            setFormattedDate(format)
        }
    }, [dateValue])

    const getMonthName = (monthNumber: any) => {
        const months = [
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
        // Make sure monthNumber is in a valid range (1 to 12)
        const validMonthNumber = Math.max(1, Math.min(12, monthNumber))

        return months[validMonthNumber - 1]
    }

    const monthName = getMonthName(formattedDate.month)

    return (
        <div>
            <Container size="xl">
                <Center>
                    {" "}
                    <MonthPickerInput
                        defaultValue={new Date()}
                        placeholder="Pick Date"
                        value={dateValue}
                        onChange={setDateValue}
                    />
                </Center>
                <SimpleGrid cols={1} spacing="xl" verticalSpacing="xl">
                    <div>
                        <h1>
                            Events in {monthName} {formattedDate.year}
                        </h1>
                        <SpecificMonth
                            totalAttendanceData={specificEventData}
                            date={`${formattedDate.month} ${formattedDate.year}`}
                        />
                    </div>
                    <div>
                        <h1>Monthly Attendance</h1>
                        <MonthlyAttendance
                            totalAttendanceData={monthlyAttendanceData}
                            date={`${formattedDate.month} ${formattedDate.year}`}
                        />
                    </div>
                    <div>
                        <h1>Gender Monthly Distribution</h1>
                        <MonthlyGender
                            genderMonthlyData={monthlyGenderData}
                            date={`${formattedDate.month} ${formattedDate.year}`}
                        />
                    </div>
                    <div>
                        <h1>Gender Quarterly Distribution</h1>
                        <QuarterlyGender
                            genderDistributionData={quarterlyGenderData}
                            date={`${formattedDate.month} ${formattedDate.year}`}
                        />
                    </div>

                    <div>
                        <h1>Yearly Distribution</h1>
                        <YearlyGender
                            genderDistributionData={yearlyGenderData}
                        />
                    </div>
                </SimpleGrid>
                <div className="exclude-print">
                    <h1>LIST | Event List</h1>
                    <EventList data={eventList} />
                </div>
            </Container>
        </div>
    )
}
