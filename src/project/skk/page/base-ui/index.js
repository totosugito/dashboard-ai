import {
    AppBar,
    Box,
    Grid, Link,
    Toolbar, Typography,
} from "@mui/material";
import imageLogo from "../../../../assets/image-logo.png";

const BaseUi = ({children, toolbar, title}) => {
    const styles = {
        logo: {
            width: "30px",
            height: "30px"
        },
        title: {
            ml: 1,
            color: 'white',
            fontSize: '25px'
        },
        boxContainer: {},
    }

    return(
        <>
            <Box sx={styles.boxContainer}>
                <AppBar position="static">
                    <Toolbar>
                            <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                                <Grid item><Link href={"/"} underline={'none'}>
                                    <Box
                                        component="img"
                                        sx={styles.logo}
                                        src={imageLogo}
                                    />
                                    <Typography sx={styles.title}>{title}</Typography>
                                </Link></Grid>
                                <Grid item>{toolbar}</Grid>
                            </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                {children}
            </Box>
        </>
    )
}
export default BaseUi