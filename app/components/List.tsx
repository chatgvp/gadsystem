import { Table, TableData } from "@mantine/core"

type Event = {
    event_date: string
    event_name: string
    event_count: number
}

type EventTableProps = {
    data: Event[]
}

const EventTable: React.FC<EventTableProps> = ({ data }) => {
    const tableData: TableData = {
        caption: "College Events",
        head: ["Date", "Event", "Total Attendance"],
        body: data.map((event) => [
            event.event_date,
            event.event_name,
            event.event_count,
        ]),
    }

    return <Table data={tableData} />
}

export default EventTable
