import {
    AppBar,
    Box,
    Container,
    Grid,
    Toolbar,
} from "@mui/material";

const BaseUi = ({children}) => {
    const styles = {
        boxContainer: {},
    }

    return(
        <>
            <Box sx={styles.boxContainer}>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth={'md'}>
                            <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                                {/*<Grid item>*/}
                                {/*    <Link href={"/"} underline={'none'} justifyContent={'center'} display={'flex'}>*/}
                                {/*        <Box*/}
                                {/*            component="img"*/}
                                {/*            sx={styles.imageLogo}*/}
                                {/*            src={imageLogo}*/}
                                {/*        />*/}
                                {/*        <Typography sx={styles.titleLogo}>Dashboard AI</Typography>*/}
                                {/*    </Link>*/}
                                {/*</Grid>*/}
                                {/*<Grid item>*/}
                                    {/*<IconButton color={'inherit'} size={'large'}*/}
                                    {/*            onClick={() => checkTasksByTimer()}><PlusOneOutlinedIcon*/}
                                    {/*    sx={styles.toolbarButton}/></IconButton>*/}

                                    {/*<IconButton color={'inherit'} size={'large'}*/}
                                    {/*            onClick={() => setOpenInputDialog(true)}><BookmarkAddOutlinedIcon*/}
                                    {/*    sx={styles.toolbarButton}/></IconButton>*/}
                                    {/*<IconButton color={'inherit'} size={'large'}*/}
                                    {/*            onClick={() => setOpenClearTaskDialog(true)}><DeleteSweepOutlinedIcon*/}
                                    {/*    sx={styles.toolbarButton}/></IconButton>*/}
                                    {/*<Button variant={'text'} color={'inherit'} sx={{textTransform: ' none', ml: 2}}*/}
                                    {/*        size={'large'}*/}
                                    {/*        onClick={onTimerMenuClicked}*/}
                                    {/*        endIcon={<TimerOutlinedIcon*/}
                                    {/*            sx={styles.toolbarButton}/>}>{timerObjList[idxTimer]["text"]}</Button>*/}

                                    {/*<Menu anchorEl={anchorTimerMenu} open={hasTimerMenuOpen}*/}
                                    {/*      onClose={onTimerMenuClosed}>*/}
                                    {/*    {*/}
                                    {/*        timerObjList.map((item) =>*/}
                                    {/*            <MenuItem key={item["id"]}*/}
                                    {/*                      onClick={() => onTimerMenuSelected(item)}>{item["text"]}</MenuItem>)*/}
                                    {/*    }*/}
                                    {/*</Menu>*/}
                                {/*</Grid>*/}
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="xl">
                {children}
            </Container>
        </>
    )
}
export default BaseUi