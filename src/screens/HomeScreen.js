import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SendMessages from '../templates/SendMessages';



export default function HomeScreen() {

    
    return (

        <Box sx={{ display: "flex" }}>



            <Container maxWidth="lg" sx={{ marginTop: "1rem", marginLeft: "0" }}>

                <SendMessages />

            </Container>

        </Box>
    )
}

