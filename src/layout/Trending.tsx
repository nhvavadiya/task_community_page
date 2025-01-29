import { Box, Button, Typography } from '@mui/material'

const Trending = () => {
    return (
        <Box >
            <Typography fontSize={16} fontWeight={500} color='grey' sx={{ padding: 1 }}>Trending Now</Typography>
            <Button sx={{ textTransform: 'none', width: '100%', justifyContent: 'start' }}>
                <Box>
                    <Typography fontSize={12} color='black' fontWeight={500}>AI to Sharp recruitment</Typography>
                    <Typography fontSize={10} color='grey' fontWeight={500} textAlign="left">20m ago</Typography>
                </Box>
            </Button>
            <Button sx={{ textTransform: 'none', width: '100%', justifyContent: 'start' }}>
                <Box>
                    <Typography fontSize={12} color='black' fontWeight={500}>UPI dominate payment</Typography>
                    <Typography fontSize={10} color='grey' fontWeight={500} textAlign="left">40m ago</Typography>
                </Box>
            </Button>

        </Box >
    )
}

export default Trending