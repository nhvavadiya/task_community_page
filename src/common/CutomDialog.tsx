import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ImageList, ImageListItem, TextareaAutosize, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import NestedDialog from './NestedDialog';
import { useState } from 'react';
import { PostType } from '../interface/common';

interface CutomDialogProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    postData: Array<PostType> | null;
    setPostData: (state: Array<any>) => void;
}
const CutomDialog = ({ open, setOpen, postData, setPostData }: CutomDialogProps) => {
    const [childopen, setChildOpen] = useState(false);
    const [imgsData, setImgData] = useState([]);
    const [jsonData, setJsonData] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');

    const handleClose = () => {
        setOpen(false);
        setJsonData(null)
        setImgData([])
    };

    const findSmallestUnusedId = (ids: any) => {
        const sortedIds = [...ids].sort((a, b) => a - b);
        let smallestUnused = 1;
        for (const id of sortedIds) {
            if (id === smallestUnused) {
                smallestUnused++;
            } else if (id > smallestUnused) {
                break;
            }
        }
        return smallestUnused;
    };

    const hanldeCreatePost = () => {
        if (postData) {
            const tempdata = [...postData];
            const usedIds = tempdata.map((item: PostType) => item.id)
            const unusedId = findSmallestUnusedId(usedIds);
            const tempPost = {
                id: unusedId,
                description: description,
                images: jsonData,
                createdAt: new Date(),
                createdBy: "John Smith",
                comments: [

                ]
            }
            let temp = [...postData, tempPost]
            setPostData(temp)
            localStorage.setItem('posts', JSON.stringify(temp))
            handleClose()
        }
    }


    const fileLimit = 6;
    const maxFileSize = 200 * 1024; // 100KB in bytes
    const handleUploadImage = (e: any) => {
        const files: File[] = Array.from(e.target.files);
        if (files.length > fileLimit) {
            alert(`You can only select up to ${fileLimit} files.`);
            e.target.value = ""; // Reset the input field
            setChildOpen(false)
            return;
        }
        const oversizedFiles = files.filter(file => file.size > maxFileSize);
        if (oversizedFiles.length > 0) {
            alert(`Each file must be less than 100KB.`);
            e.target.value = ""; // Reset input
            setChildOpen(false)
            return;
        }
        const fileReaders = [];
        const base64Files: any = [];

        files.forEach((file, index) => {
            const reader = new FileReader();
            fileReaders.push(reader);

            reader.onload = () => {
                base64Files.push({
                    name: file.name,
                    data: reader.result,
                });

                // Wait for all files to be read
                if (base64Files.length === files.length) {
                    setImgData(base64Files);
                    setJsonData(JSON.stringify(base64Files, null, 2));
                }
            };

            reader.readAsDataURL(file);
        });
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
                    height: 'fit-content',

                }
            }}
        >
            <DialogTitle id="alert-dialog-title">
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#e91e63' }} >JS</Avatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography fontWeight={600}>John Smith</Typography>
                            <Typography fontSize={12}>Post to Anyone</Typography>
                        </Box>

                    </Box>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ width: { xs: '280px', sm: '350px', md: '500px' } }}>
                <DialogContentText id="alert-dialog-description">
                    <TextareaAutosize
                        minRows={13}
                        aria-label="maximum height"
                        placeholder="What do you want to talk about?"
                        style={{
                            boxSizing: "border-box",
                            resize: "none",
                            width: "100%",
                            fontSize: "0.875rem",
                            fontWeight: 400,
                            lineHeight: 1.5,
                            border: 'none',
                            boxShadow: 'none',
                        }}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContentText>

                <Box>
                    <ImageList cols={3} rowHeight={164}>
                        {jsonData && JSON.parse(jsonData).map((item: any) => (
                            <ImageListItem key={item.data} sx={{ border: '1px solid lightgrey' }}>
                                <img
                                    src={`${item.data}`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>

            </DialogContent>
            <DialogActions>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        component="label"
                        onClick={() => setChildOpen(true)}
                    >
                        <AddPhotoAlternateOutlinedIcon />
                        <input
                            type="file"
                            hidden
                            onChange={handleUploadImage}
                            multiple
                            accept="image/*"
                        />
                    </Button>
                    <NestedDialog open={childopen} setOpen={setChildOpen} imgsData={imgsData} />
                    <Button onClick={hanldeCreatePost} autoFocus disabled={description.length === 0}>
                        Create Post
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default CutomDialog