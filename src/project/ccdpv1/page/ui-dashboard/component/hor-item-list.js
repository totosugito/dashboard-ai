import {Box, Button, Card, Container, Link, Paper, Stack, Typography, useTheme} from "@mui/material";

const HorItemList = (props) => {
    const theme = useTheme()
    const styles = {
        title: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: theme.palette.secondary.main
        },
        titleSub: {
            ml: 5,
            fontSize: '15px',
            // color: theme.palette.secondary.main
        },
        container: {
            mt: 3,
        },
        card: {
            p: 0,
            boxShadow: 0,
        },
        boxEmpty: {
            mt: 1,
            border: '1px dashed grey',
            width: '100px'
        }
    }
    const maxDataShown = 5

    const createEmptyContainer = () => {
        return (
            <Box sx={styles.boxEmpty}>
                <Button onClick={props.onNewClicked}>{props.newText}</Button>
            </Box>
        );
    }

    const createProjectList = () => {
        return(<></>)
    }

    const showProjectList = () => {
        if(props["data"].length === 0) {
            return(createEmptyContainer())
        }
        else {
            return (createProjectList())
        }
    }

    return(
        <>
            <Container maxWidth="xl" sx={styles.container}>
                <Paper sx={styles.card}>
                    <Stack direction={'row'} alignItems={'center'}>
                        <Typography sx={styles.title}>{props.title}</Typography>
                        { props["data"].length > maxDataShown &&
                            <Link underline={'none'} sx={styles.titleSub}>{props.see_all}</Link>
                        }
                    </Stack>
                </Paper>

                {showProjectList()}
            </Container>
        </>
    )
}
export default HorItemList