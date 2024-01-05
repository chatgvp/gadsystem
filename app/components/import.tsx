import React, { useEffect, useRef, useState } from "react"
import {
    Button,
    Modal,
    Box,
    Select,
    FileInput,
    Tabs,
    TextInput,
    ActionIcon,
    Group,
    Text,
    Input,
} from "@mantine/core"
import { rem } from "@mantine/core"
import { DatePicker, DatePickerInput, MonthPickerInput } from "@mantine/dates"
import {
    IconPhoto,
    IconMessageCircle,
    IconEdit,
    IconTrash,
} from "@tabler/icons-react"
import { Table, TableData } from "@mantine/core"

import { getEvents, deleteEvent, updateEvent } from "@/app/api"
import { modals } from "@mantine/modals"

type EventData = {
    title: string | null
    file?: File | null
    date?: Date | null
}

const MyButtonWithEventModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dateValue, setDateValue] = useState<Date | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [selectedEventType, setSelectedEventType] = useState<string | null>(
        null
    )
    const [existingEventName, setExistingEventName] = useState("")
    const [activeTab, setActiveTab] = useState("AddEvent") // New state for active tab

    const handleTabsChange = (value: string | null) => {
        if (value !== null) {
            setActiveTab(value)
        }
    }

    const handleExistingEventNameChange = (value: string) => {
        setExistingEventName(value)
    }

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file)
    }

    const handleEventTypeChange = (value: string | null) => {
        setSelectedEventType(value)
        console.log("animal:", selectedEventType)
        console.log("monster", dateValue)
    }

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const [eventData, setEventData] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents()
                setEventData(data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchEvents()
    }, [])

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
                    // window.location.reload()
                    reloadPageAndShowAlert("Event added successfully.")
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
                    // window.location.reload()
                    reloadPageAndShowAlert("Existing event added successfully.")
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
    const [newEventName, setNewEventName] = useState("")

    const handleUpdateChange = (newData: any) => {
        setNewEventName(newData.currentTarget.value)
    }

    const editModal = (name: string, id: number) => {
        modals.openConfirmModal({
            title: "Please confirm your action",
            children: (
                <>
                    <Text size="sm">
                        You are about to Update <b>{name}</b>
                    </Text>
                    <Input
                        placeholder="Enter new event name"
                        onChange={handleUpdateChange}
                    />
                </>
            ),
            labels: { confirm: "Confirm", cancel: "Cancel" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => {
                setNewEventName((prevName) => {
                    // console.log("Confirmed")
                    // console.log(prevName) // Use prevName directly inside the callback
                    handleUpdateEvent(id, prevName)
                    return prevName
                })
            },
        })
    }

    const handleUpdateEvent = async (eventId: any, newData: any) => {
        try {
            const result = await updateEvent(eventId, newData)
            console.log(result.message)
            reloadPageAndShowAlert(result.message)
        } catch (error) {
            console.error("Error updating event:", error)
        }
    }

    const deleteModal = (name: string, id: number) =>
        modals.openConfirmModal({
            title: "Delete Event",
            children: (
                <Text size="sm">
                    Are you Sure you want to Delete <b>{name}</b>
                </Text>
            ),
            labels: { confirm: "Confirm", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => {
                console.log("Confirmed")
                handleDeleteEvent(id)
            },
        })

    const reloadPageAndShowAlert = (message: string) => {
        window.location.reload()
        alert(message)
    }

    const handleDeleteEvent = async (eventId: number) => {
        try {
            const result = await deleteEvent(eventId)
            // console.log(result.message)
            reloadPageAndShowAlert(result.message)
        } catch (error) {
            console.error("Error deleting event:", error)
        }
    }

    interface Event {
        event_id: number
        event_name: string
    }
    const eventDataOptions = eventData.map((event: Event) => ({
        id: event.event_id,
        value: event.event_name,
        label: event.event_name,
    }))

    const rows = eventDataOptions.map((element) => (
        <Table.Tr key={element.value}>
            <Table.Td>{element.value}</Table.Td>
            <Table.Td>
                <Group>
                    <ActionIcon
                        variant="filled"
                        aria-label="Edit"
                        color="yellow"
                        onClick={() => editModal(element.value, element.id)}>
                        <IconEdit
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon
                        variant="filled"
                        aria-label="Delete"
                        color="red"
                        onClick={() => deleteModal(element.value, element.id)}>
                        <IconTrash
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ))

    return (
        <>
            <Button onClick={openModal}>Import</Button>
            <Modal
                size="lg"
                opened={isOpen}
                onClose={closeModal}
                title="Create a New Event"
                withCloseButton>
                <Tabs
                    defaultValue={activeTab}
                    id="tabs"
                    onChange={handleTabsChange}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="AddEvent"
                            leftSection={
                                <IconPhoto
                                    style={{ width: rem(12), height: rem(12) }}
                                />
                            }>
                            Add new Event
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="ExistingEvent"
                            leftSection={
                                <IconMessageCircle
                                    style={{ width: rem(12), height: rem(12) }}
                                />
                            }>
                            Add Existing Event
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="EditEvent"
                            leftSection={
                                <IconMessageCircle
                                    style={{ width: rem(12), height: rem(12) }}
                                />
                            }>
                            EditEvent
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="AddEvent">
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
                    </Tabs.Panel>

                    <Tabs.Panel value="ExistingEvent" p="sm">
                        <TextInput
                            py="xl"
                            label="Event Name"
                            placeholder="Enter Event Name"
                            value={existingEventName}
                            onChange={(event) =>
                                handleExistingEventNameChange(
                                    event.currentTarget.value
                                )
                            }
                        />
                        <Button onClick={handleCreateEvent} type="submit">
                            Add Existing Event
                        </Button>
                    </Tabs.Panel>
                    <Tabs.Panel value="EditEvent">
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </Tabs.Panel>
                </Tabs>
            </Modal>
        </>
    )
}

export default MyButtonWithEventModal
