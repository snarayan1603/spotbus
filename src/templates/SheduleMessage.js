import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function SheduleMessage(props) {

    const [open, setOpen] = React.useState(true);
    const [radioValue, setRadioValue] = React.useState("now")
    const [value, setValue] = React.useState(dayjs());

    const handleClose = async (val) => {
        setOpen(false);
        props.resetSheduler()

        if (val === 1) {
            props.sendMessages(value)
        } else
            props.sendMessages()
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ minWidth: "30rem" }}>
                    {"When do you want to send?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="now"
                            name="radio-buttons-group"
                            value={radioValue}
                            onChange={(e) => setRadioValue(e.target.value)}
                        >
                            <FormControlLabel value="now" control={<Radio />} label="Now" />
                            <FormControlLabel value="shedule" control={<Radio />} label="Shedule" sx={{ marginBottom: "1rem" }} />

                            {radioValue === "shedule" && (
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={5}>
                                        <DateTimePicker
                                            label="Select Date & Time"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            )}


                        </RadioGroup>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(0)}>Close</Button>
                    <Button onClick={() => handleClose(1)}>Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
