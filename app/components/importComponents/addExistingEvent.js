// AddExistingEvent.js
import React, { useState } from "react"
import { Button, TextInput } from "@mantine/core"
import { rem } from "@mantine/core"
import { IconMessageCircle } from "@tabler/icons-react"

const AddExistingEvent = () => {
    const [existingEventName, setExistingEventName] = useState("")

    const handleExistingEventNameChange = (value) => {
        setExistingEventName(value)
    }

    const handleCreateEvent = () => {
        // Your logic for creating an existing event
    }

    return (
        <>
            <TextInput
                py="xl"
                label="Event Name"
                placeholder="Enter Event Name"
                value={existingEventName}
                onChange={(event) =>
                    handleExistingEventNameChange(event.currentTarget.value)
                }
            />
            <Button onClick={handleCreateEvent} type="submit">
                Add Existing Event
            </Button>
        </>
    )
}

export default AddExistingEvent
