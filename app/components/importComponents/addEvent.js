// AddEvent.js
import React, { useState } from "react"
import { Button, FileInput, Select, DatePickerInput } from "@mantine/core"
import { rem } from "@mantine/core"
import { IconPhoto } from "@tabler/icons-react"

const AddEvent = () => {
    const [eventDataOptions, setEventDataOptions] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedEventType, setSelectedEventType] = useState(null)
    const [dateValue, setDateValue] = useState(null)

    const handleFileChange = (file) => {
        setSelectedFile(file)
    }

    const handleEventTypeChange = (value) => {
        setSelectedEventType(value)
    }

    const handleCreateEvent = () => {
        const handleAddEvent = async () => {
            try {
                const formData = new FormData()
                formData.append("title", selectedEventType || "")
                formData.append("file", selectedFile || "")
                formData.append("date", dateValue?.toISOString() || "")
                console.log(dateValue?.toISOString())
                const response = await fetch(
                    "http://127.0.0.1:8000/uploadfile/",
                    {
                        method: "POST",
                        body: formData,
                    }
                )

                if (response.ok) {
                    console.log("Event added successfully.")
                    window.location.reload()
                } else {
                    console.error(
                        "Failed to add event. Server response:",
                        response.status
                    )
                }
            } catch (error) {
                console.error(
                    "Error occurred while making the API call:",
                    error
                )
            }
        }
        const handleAddExistingEvent = async () => {
            if (!existingEventName.trim()) {
                alert("Please enter an Event Name.")
                return
            }

            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/events/create/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: new URLSearchParams({
                            event_name: existingEventName,
                        }),
                    }
                )

                if (response.ok) {
                    console.log("Existing event added successfully.")
                    window.location.reload()
                } else {
                    console.error(
                        "Failed to add existing event. Server response:",
                        response.status
                    )
                }
            } catch (error) {
                console.error(
                    "Error occurred while making the API call:",
                    error
                )
            }
        }
        if (activeTab === "AddEvent") {
            if (!selectedFile) {
                alert("Please select an Excel file.")
                return
            }
            const validFileTypes = [
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel",
            ]
            if (!validFileTypes.includes(selectedFile.type)) {
                alert("Invalid file type. Please select an Excel file.")
                return
            }
            handleAddEvent()

            closeModal()
        } else if (activeTab === "ExistingEvent") {
            handleAddExistingEvent()

            closeModal()
        }
    }

    return (
        <>
            <Select
                required
                label="Add event"
                placeholder="Pick an event"
                data={eventDataOptions}
                py="xl"
                onChange={handleEventTypeChange}
            />

            <FileInput
                required
                description="Add Excel File"
                placeholder="Input placeholder"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
            />
            <DatePickerInput
                py="xl"
                required
                label="Pick date"
                placeholder="Pick date"
                value={dateValue}
                onChange={setDateValue}
            />
            <Button onClick={handleCreateEvent} type="submit">
                Add Existing Event
            </Button>
        </>
    )
}

export default AddEvent
