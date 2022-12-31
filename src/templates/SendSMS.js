import { Box, Button, Divider, Input, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import Error from './Error';
import Selector from './Selector'
import SheduleMessage from './SheduleMessage';

const ariaLabel = { 'placeholder': 'Subject' };

export default function SendSMS(props) {


    const [refresh, setRefres] = React.useState(false)
    const [openSheduler, setOpenSheduler] = React.useState(false)
    const [error, setError] = React.useState("")
    const [notificationData, setNotificationData] = React.useState({
        title: props.title,
        phones: ["8130715372"],
        subject: "",
        message: ""
    })

    React.useEffect(() => {
        setNotificationData({ ...notificationData, title: props.title })
    }, [props])

    function pushData(phone, id) {
        let temp = notificationData
        if (!temp[id].includes(phone)) {
            temp[id].push(phone)
        }

        setNotificationData(temp)
        setRefres(!refresh)
    }

    function removeData(phone, id) {
        let temp = notificationData
        temp[id] = temp[id].filter(x => x !== phone)

        setNotificationData(temp)
        setRefres(!refresh)
    }

    function resetError() {
        setError("")
    }

    function resetSheduler() {
        setOpenSheduler(false)
    }


    async function sendHandler() {

        switch (true) {
            case notificationData.title.length === 0: setError("Title cannot be empty."); break;
            case notificationData.phones.length === 0: setError("Please enter atleast one eamil."); break;
            case notificationData.subject.length === 0: setError("Subject cannot be empty."); break;
            case notificationData.message.length === 0: setError("Message body cannot be empty."); break;

            default: {
                setOpenSheduler(true)
            }
        }
    }

    async function sendMessages(date) {
        try {

            let finalNotificationData = notificationData
            if (date) {
                finalNotificationData.isShedule = true;
                finalNotificationData.sheduleTiming = date
            }
            const { data } = await axios.post("/api/admin/send/sms", notificationData)
            console.log(data)

        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Box>

            {error && <Error error={error} resetError={resetError} />}
            {openSheduler && <SheduleMessage resetSheduler={resetSheduler} sendMessages={sendMessages} />}

            <Selector heading="To" phones={notificationData.phones} pushData={pushData} id="phones" removeData={removeData} />
            <Divider />

            <Input inputProps={ariaLabel} sx={{ outline: "none", border: "none", p: 1 }} disableUnderline fullWidth
                value={notificationData.subject} onChange={(e) => setNotificationData({ ...notificationData, subject: e.target.value })} />
            <Divider />

            <TextField multiline minRows={8} maxRows={15} disableUnderline fullWidth sx={{ "& fieldset": { border: 'none', outline: "none" } }}
                value={notificationData.message} onChange={(e) => setNotificationData({ ...notificationData, message: e.target.value })} />
            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button sx={{ p: 1, marginTop: "1rem", fontWeight: "600", color: "black" }}>Cancel</Button>
                <Button sx={{ p: 1, marginTop: "1rem", fontWeight: "600" }} onClick={sendHandler}>Send</Button>
            </Box>
        </Box>
    )
}
