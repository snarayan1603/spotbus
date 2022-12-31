import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Divider, Input, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import SendEmails from '../templates/SendEmails';
import SendSMS from '../templates/SendSMS';

const ariaLabel = { 'placeholder': 'Title' };

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function SendMessages() {

    const [vars, setVars] = React.useState({ sendEmail: true, title: "" })

    return (
        <>
            <Box sx={{ border: "1px solid lightgrey", borderRadius: "5px", zIndex: "1", boxShadow: "0px 0px 1px 0px grey", padding: "2rem", paddingBottom: "1rem" }} >

                <Typography variant="h4" gutterBottom>Create Notification</Typography>
                <Input inputProps={ariaLabel} value={vars.title} onChange={(e) => setVars({ ...vars, title: e.target.value })} />

                <Box sx={{ flexGrow: 1, width: "20rem", marginTop: "1rem", marginBottom: "1rem" }}>
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <Item className="row center" sx={vars.sendEmail ? { color: '#4285F4', fontWeight: "600", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => setVars({ ...vars, sendEmail: true })}><EmailIcon /> Email</Item>
                        </Grid>

                        <Grid item xs={4}>
                            <Item className="row center" sx={!vars.sendEmail ? { color: '#4285F4', fontWeight: "600", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => setVars({ ...vars, sendEmail: false })}><SmsIcon /> SMS</Item>
                        </Grid>

                    </Grid>
                </Box>

                <Divider />

                {vars.sendEmail
                    ? <SendEmails title={vars.title} />
                    : <SendSMS title={vars.title} />
                }

            </Box>
        </>
    )
}
