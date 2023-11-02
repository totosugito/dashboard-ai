import {
    AppBar,
    Box,
    Container,
    Grid,
    Toolbar, Typography,
} from "@mui/material";

const BaseUi = ({children, title}) => {
    const styles = {
        boxContainer: {},
    }

    return(
        <>
            <Box sx={styles.boxContainer}>
                <AppBar position="static">
                    <Toolbar>
                            <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                                <Grid item>{title}</Grid>
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