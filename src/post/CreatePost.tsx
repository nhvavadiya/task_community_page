import { Avatar, Box, Button } from "@mui/material"
import CutomDialog from "../common/CutomDialog"
import { useState } from "react";
import { PostType } from "../interface/common";
import { getFirstTwoLetters } from "../helper";

interface PropsCreatePost {
    postData: Array<PostType> | null;
    setPostData: (state: Array<PostType>) => void;
}

const CreatePost = ({ postData, setPostData }: PropsCreatePost) => {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#e91e63' }} >{getFirstTwoLetters("John Smith")}</Avatar>
            <Box sx={{ flex: 1 }}>
                <Button variant="outlined" sx={{ width: '100%', borderRadius: '20px' }} disableRipple onClick={() => setOpen(true)}>Create Post</Button>
                <CutomDialog open={open} setOpen={setOpen} postData={postData} setPostData={setPostData} />
            </Box>
        </Box>
    )
}

export default CreatePost