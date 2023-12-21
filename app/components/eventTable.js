// eventTable.js

import React from "react"
import { Table } from "@mantine/core"

const EventTable = ({ data }) => {
    return (
        <Table
            caption={data.caption}
            head={data.head}
            data={data.body.map((row) => ({
                key: row[0], // Assuming the first element is unique for each row
                cells: row.slice(1),
            }))}
        />
    )
}

export default EventTable
