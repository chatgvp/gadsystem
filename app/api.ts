// api.ts

const BASE_URL = "http://127.0.0.1:8000"

export const fetchSpecificEventData = async () => {
    const response = await fetch(`${BASE_URL}/charts/specific_month_event`)
    return response.json()
}

export const fetchMonthlyAttendanceData = async () => {
    const response = await fetch(`${BASE_URL}/charts/monthly`)
    return response.json()
}

export const fetchMonthlyGenderData = async () => {
    const response = await fetch(`${BASE_URL}/charts/monthly_distribution`)
    return response.json()
}

export const fetchQuarterlyGenderData = async () => {
    const response = await fetch(`${BASE_URL}/charts/quarterly_distribution`)
    return response.json()
}

export const getEvents = async () => {
    const response = await fetch(`${BASE_URL}/events/read`)
    return response.json()
}

export const getEventsList = async () => {
    const response = await fetch(`${BASE_URL}/events/list`)
    return response.json()
}

export const deleteEvent = async (eventId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/events/delete/${eventId}`, {
            method: "DELETE",
        })

        if (response.ok) {
            return { message: "Event deleted successfully" }
        } else {
            const errorData = await response.json()
            throw new Error(errorData.detail || "Failed to delete event")
        }
    } catch (error) {
        console.error("Error deleting event:", error)
        throw error
    }
}

export const updateEvent = async (eventId: number, newData: string) => {
    console.log("api", eventId)
    console.log("api", newData)

    const data = { event_name: newData } // Create an object with the data

    try {
        const response = await fetch(`${BASE_URL}/events/update/${eventId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Convert data to JSON format
        })

        console.log("ASdasd", newData)

        if (response.ok) {
            return { message: "Event updated successfully" }
        } else {
            const errorData = await response.json()
            throw new Error(errorData.detail || "Failed to update event")
        }
    } catch (error) {
        console.error("Error updating event:", error)
        throw error
    }
}
