import { OutlinedInput } from '@mui/material'
import React from 'react'

interface CustomInputProp {
    value: string,
    handleChangeInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const CustomInput = ({ value, handleChangeInput }: CustomInputProp) => {
    return (
        <OutlinedInput
            id="outlined-adornment-weight"
            fullWidth
            placeholder='Add Comment'
            sx={{ borderRadius: '25px', height: '40px', fontSize: '12px' }}
            aria-describedby="outlined-weight-helper-text"
            // inputProps={{
            //     'aria-label': 'weight',
            //     fontSize: '12px'
            // }}
            value={value}
            onChange={(e) => handleChangeInput(e)}
        />
    )
}


export default CustomInput