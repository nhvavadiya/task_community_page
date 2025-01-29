import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ImageList, ImageListItem, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { Image } from "../interface/common";

interface CutomDialogProp {
    open: boolean;
    setOpen: (state: boolean) => void;
    imgsData: Image[]
}

const NestedDialog = ({ open, setOpen, imgsData }: CutomDialogProp) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleUploadFile = () => {
        handleClose()
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                '& .MuiDialog-container': {
                    alignItems: 'unset',
                    height: '710px',

                }
            }}
        >
            <DialogTitle id="alert-dialog-title">
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        Image Editor
                    </Box>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ width: { xs: '280px', sm: '350px', md: '500px' } }} >
                <ImageList sx={{ width: { xs: '280px', sm: '350px', md: '500px' }, height: 450 }} cols={3} rowHeight={164}>
                    {imgsData.map((item: Image) => (
                        <ImageListItem key={item.data} sx={{ border: '1px solid grey' }}>
                            <img
                                src={`${item.data}`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    component="label"
                    onClick={handleUploadFile}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default NestedDialog