// EventTable.js
import React from "react"
import { Button, Table } from "@mantine/core"

const EventTable = () => {
    const tableData = {
        caption: "Some elements from periodic table",
        head: ["Element position", "Atomic mass", "Symbol", "Element name"],
        body: [
            [6, 12.011, "C", "Carbon"],
            [7, 14.007, "N", "Nitrogen"],
            [39, 88.906, "Y", "Yttrium"],
            [56, 137.33, "Ba", "Barium"],
            [58, 140.12, "Ce", "Cerium"],
        ],
    }

    const handleCreateEvent = () => {
        // Your logic for creating an event in the table
    }

    return (
        <>
            <Table data={tableData} />
            <Button onClick={handleCreateEvent} type="submit">
                Add Existing Event
            </Button>
        </>
    )
}

export default EventTable
