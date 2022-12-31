
import { Box, Button, Divider, Input, TextField, Typography } from '@mui/material';
import * as React from 'react';
import Selector from './Selector';
import axios from "axios"
import Error from './Error';
import SheduleMessage from './SheduleMessage';

const ariaLabel = { 'placeholder': 'Subject' };

export default function SendEmails(props) {

    const [refresh, setRefres] = React.useState(false)
    const [openSheduler, setOpenSheduler] = React.useState(false)
    const [error, setError] = React.useState("")
    const [notificationData, setNotificationData] = React.useState({
        title: props.title,
        emails: ["narayan@gmail.com"],
        cc: ["narayan@gmail.com", "Anuj@gmail.com", "satyam@gmail.com"],
        bcc: ["narayan@gmail.com", "Anuj@gmail.com", "satyam@gmail.com"],
        subject: "",
        message: ""
    })

    React.useEffect(() => {
        setNotificationData({ ...notificationData, title: props.title })
    }, [props])

    function pushData(email, id) {
        let temp = notificationData
        if (!temp[id].includes(email)) {
            temp[id].push(email)
        }

        setNotificationData(temp)
        setRefres(!refresh)
    }

    function removeData(email, id) {
        let temp = notificationData
        temp[id] = temp[id].filter(x => x !== email)

        setNotificationData(temp)
        setRefres(!refresh)
    }

    function resetError() {
        setError("")
    }

    function resetSheduler() {
        setOpenSheduler(false)
    }


    const [showCcBcc, setShowCcBcc] = React.useState({ cc: false, bcc: false })


    async function sendHandler() {

        switch (true) {
            case notificationData.title.length === 0: setError("Title cannot be empty."); break;
            case notificationData.emails.length === 0: setError("Please enter atleast one eamil."); break;
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

            console.log(finalNotificationData)
            const { data } = await axios.post("/api/admin/send/emails", finalNotificationData)
            console.log(data)

        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
        <Box>

            {error && <Error error={error} resetError={resetError} />}

            {openSheduler && <SheduleMessage resetSheduler={resetSheduler} sendMessages={sendMessages} />}


            <Box sx={notificationData.emails.length === 0 ? { display: "flex", justifyContent: "space-between", alignItems: "center" } : {}}>
                <Selector heading="To" emails={notificationData.emails} pushData={pushData} id="emails" removeData={removeData} />

                <Box fullWidth sx={{ display: "flex", alignContent: "flex-end", justifyContent: "right" }}>
                    <Typography onClick={() => setShowCcBcc({ ...showCcBcc, cc: true })} sx={{ cursor: "pointer", marginRight: "10px" }}>Cc</Typography>
                    <Typography onClick={() => setShowCcBcc({ ...showCcBcc, bcc: true })} sx={{ cursor: "pointer", }}>Bcc</Typography>
                </Box>
            </Box>
            <Divider />

            {showCcBcc.cc && (
                <>
                    <Selector heading="Cc" emails={notificationData.cc} pushData={pushData} id="cc" removeData={removeData} />
                    <Divider />
                </>
            )}

            {showCcBcc.bcc && (
                <>
                    <Selector heading="Bcc" emails={notificationData.bcc} pushData={pushData} id="bcc" removeData={removeData} />
                    <Divider />
                </>
            )}


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
    );
}
