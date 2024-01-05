"use client"

// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./styles/globals.css"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import {
    MantineProvider,
    Burger,
    createTheme,
    AppShell,
    Container,
    Button,
    Group,
    Center,
    Image,
    Text,
    Select,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import MyButtonWithModal from "./components/import"
import GadLogo from "@/public/GAD_Logo.png"
import {
    MonthPicker,
    MonthPickerInput,
    YearPicker,
    YearPickerInput,
} from "@mantine/dates"
import { useEffect, useState } from "react"
import React from "react"
import { ModalsProvider } from "@mantine/modals"
// import { sendFormattedDate, getFormattedDate } from "./api"
// import Header from "./header/page"
// import "@mantine/notifications/styles.css"
// import HeaderComponent from "./components/HeaderComponent"

// const inter = Inter({ subsets: ["latin"] })
const theme = createTheme({
    fontFamily: "Poppins, sans-serif",
})

// export const metadata: Metadata = {
//     title: "Create Next App",
//     description: "Generated by create next app",
// }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [opened, { toggle }] = useDisclosure()
    // const [YearValue, YearSetValue] = useState<Date | null>(null)
    // const [dateValue, setDateValue] = useState<Date | null>(new Date())
    // const [formattedDate, setFormattedDate] = useState<{
    //     month: string
    //     year: number
    // } | null>(null)

    // useEffect(() => {
    //     if (dateValue) {
    //         const month = new Intl.DateTimeFormat("en-US", {
    //             month: "long",
    //         }).format(dateValue)
    //         const year = dateValue.getFullYear()

    //         const formattedDate = {
    //             month: month,
    //             year: year,
    //         }

    //         console.log(formattedDate)
    //         // setFormattedDate(formattedDate)
    //         // sendFormattedDateToApi(formattedDate)
    //     }
    // }, [dateValue])

    // const myFormattedDate = "2023-12-14"
    // sendFormattedDate(myFormattedDate)

    // Get the formatted date
    // const retrievedDate = getFormattedDate()
    // console.log(retrievedDate) // Output: 2023-12-14
    const handlePrint = () => {
        window.print()
    }
    return (
        <html lang="en">
            <head>{/* <ColorSchemeScript /> */}</head>
            <body>
                {/* {children} */}
                <MantineProvider theme={theme}>
                    <ModalsProvider>
                        <AppShell
                            header={{ height: 60 }}
                            // aside={{
                            //     width: 300,
                            //     breakpoint: "sm",
                            //     collapsed: { mobile: !opened },
                            // }}
                            // navbar={{
                            //     width: 300,
                            //     breakpoint: "sm",
                            //     collapsed: { mobile: !opened },
                            // }}
                            padding="md">
                            <AppShell.Header>
                                <Burger
                                    opened={opened}
                                    onClick={toggle}
                                    hiddenFrom="sm"
                                    size="sm"
                                />
                                <Container>
                                    <Group justify="space-between">
                                        <Image
                                            src={GadLogo.src}
                                            alt="Company Logo"
                                            height={50}
                                            width={50}
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 24,
                                                fontWeight: "bold",
                                            }}>
                                            GADSYSTEM
                                        </Text>
                                        <Group justify="flex-end">
                                            <Button onClick={handlePrint}>
                                                Export
                                            </Button>
                                            <MyButtonWithModal />
                                        </Group>
                                    </Group>
                                </Container>
                            </AppShell.Header>
                            <AppShell.Main>{children}</AppShell.Main>
                        </AppShell>
                    </ModalsProvider>
                </MantineProvider>
            </body>
        </html>
    )
}
