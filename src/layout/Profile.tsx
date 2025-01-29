import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Link,
    Typography,
} from "@mui/material";

const Profile = () => {
    return (
        <>
            <Card sx={{}}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 70,
                        backgroundColor: "orange",
                    }}
                >
                    <Avatar
                        sx={{
                            position: "relative",
                            top: "30px",
                            color: "white",
                            width: 50,
                            height: 50,
                            bgcolor: '#e91e63'
                        }}
                    >
                        JS
                    </Avatar>
                </Box>
                <CardContent>
                    <Box>
                        <Typography
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                position: "relative",
                                top: "10px",
                            }}
                            gutterBottom
                            variant="h6"
                            component="div"
                        >
                            John Smith
                        </Typography>
                    </Box>
                </CardContent>
                <Divider />
                <Box sx={{ margin: "0.5rem" }}>
                    <Typography fontSize={14}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
                        ipsa?
                    </Typography>
                </Box>
                <Divider />
                <CardActions>
                    <Button size="small">Saved Items</Button>
                </CardActions>
            </Card>

            {/* Second Card */}
            <Card sx={{ mt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
                    <Link href="#" underline="hover">
                        {"Groups"}
                    </Link>
                    <Link href="#" underline="hover">
                        {"Events"}
                    </Link>
                </Box>
                <Divider />
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography fontWeight={500} color="gray">
                        Discover More
                    </Typography>
                </CardActions>
            </Card>
        </>
    );
};

export default Profile;
