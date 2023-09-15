import {Avatar, Box, Button, Card, Container, Grid, Link, Paper, Stack, Typography, useTheme} from "@mui/material";
import {getRouterUrl} from "../../../../../router";

const HorItemList = (props) => {
    const theme = useTheme()
    const styles = {
        title: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: theme.palette.secondary.main,
            mb: 1
        },
        titleSub: {
            ml: 5,
            fontSize: '15px',
            mb: 1
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
        },
        gridItem: {
            width: "400px"
        },
        itemButton: {
            height: '80px',
            width: '400px',
            textAlign: 'left',
            textTransform: 'none'
        },
        itemContainer: {
            height: '80px',
            width: '400px'
        },
        avatarContainer: {
            height: '80px'
        },
        itemTitle: {
            fontSize: '130%',
            ml: 1
        },
        itemDesc: {
            fontSize: '100%',
            ml: 1,
            color: theme.palette.text.secondary
        }
    }
    const maxDataShown = 1

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        let sstr = name.split(" ")
        let str0 = sstr.length > 0 ? sstr[0][0] : "0"
        let str1 = sstr.length > 1 ? sstr[1][0] : "0"
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${str0.toUpperCase()}${str1.toUpperCase()}`,
        };
    }

    const createEmptyContainer = () => {
        return (
            <Box sx={styles.boxEmpty}>
                <Button onClick={props.onNewClicked}>{props.newText}</Button>
            </Box>
        );
    }

    const createProjectList = () => {
        return (
            <>
                <Grid container spacing={1}>
                    {
                        props["data"].map((item) =>
                            <Grid item sx={styles.gridItem} key={item["id"]}>
                                <Button sx={styles.itemButton}>
                                <Paper sx={styles.itemContainer}
                                    onClick={() => {props.onItemClicked(item)}}>
                                    <Stack direction={'row'}>
                                        <Avatar
                                            style={styles.avatarContainer}
                                            variant="square" {...stringAvatar(item["title"])}/>
                                        <Box>
                                            <Typography sx={styles.itemTitle}>{item["title"]}</Typography>
                                            <Typography sx={styles.itemDesc}>{item["desc"]}</Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                                </Button>
                            </Grid>
                        )
                    }
                </Grid>
            </>
        )
    }

    const showProjectList = () => {
        if (props["data"].length === 0) {
            return (createEmptyContainer())
        } else {
            return (createProjectList())
        }
    }

    return (
        <>
            <Container maxWidth="xl" sx={styles.container}>
                <Paper sx={styles.card}>
                    <Stack direction={'row'} alignItems={'center'}>
                        <Typography sx={styles.title}>{props.title}</Typography>
                        {props["data"].length >= maxDataShown &&
                            <Link underline={'none'} sx={styles.titleSub} href={props.seeAllUrl}
                                  to={props.seeAllUrl}>{props.see_all}</Link>
                        }
                    </Stack>
                </Paper>

                {showProjectList()}
            </Container>
        </>
    )
}
export default HorItemList