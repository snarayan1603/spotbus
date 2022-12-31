import { Box, Input, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import validator from "validator";

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default function Selector(props) {

    let data = props.emails ? props.emails : props.phones ? props.phones : []

    const ariaLabel = { 'placeholder': props.phones ? "Phone" : 'Email' };

    const [inputValue, setInputValue] = React.useState("")

    function inputHandler(e) {
        if (validator.isEmail(e.target.value) && e.key === "Enter") {
            props.pushData(e.target.value.toLowerCase(), props.id)
        }
    }

    return (
        <Box className="row center" sx={{ justifyContent: "left" }}>
            <Box sx={{ color: "grey" }}>{props.heading}</Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: "5px 10px",
                    bgcolor: 'background.paper',
                    borderRadius: "5rem",
                }}
            >

                {data.map((x) => (
                    <Item key={x}>{x} <span style={{ cursor: "pointer", marginLeft: "10px" }} onClick={() => props.removeData(x, props.id)}>x</span></Item>
                ))}

                <Input inputProps={ariaLabel} sx={{ outline: "none", border: "none" }} disableUnderline
                    value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={inputHandler} />


            </Box>
        </Box>
    )
}
