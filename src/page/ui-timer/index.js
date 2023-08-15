import {
    AppBar,
    Box,
    Button, Card, CardContent, CardHeader,
    Container,
    Grid, IconButton,
    Link,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import imageLogo from "../../assets/image-logo.png"
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {useEffect, useRef, useState} from "react";
import {dispatch} from "../../store";
import {addNewTask, clearTask, setIdxTimerRefresh, updateAllTask} from "../../store/slice/profile-slice";
import {useSelector} from "react-redux";
import MuiDialog from "../../component/MuiDialog";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import PlusOneOutlinedIcon from '@mui/icons-material/PlusOneOutlined';

const UiTimer = () => {
    const theme = useTheme()
    const styles = {
        boxContainer: {},
        imageLogo: {
            height: "42px"
        },
        titleLogo: {
            pl: 1,
            fontSize: "130%",
            color: theme.palette.primary.contrastText,
            display: 'inline'
        },
        toolbarButton: {
            width: "28px",
            height: "28px",
        }
    }

    const timerObjList = [
        {
            id: 0, text: "Off", value: 0
        },
        {
            id: 1, text: "5 Seconds", value: 5
        },
        {
            id: 2, text: "20 Seconds", value: 10
        },
        {
            id: 3, text: "30 Seconds", value: 30
        },
        {
            id: 4, text: "1 Minutes", value: 60
        },
        {
            id: 5, text: "2 Minutes", value: 120
        },
        {
            id: 6, text: "5 Minutes", value: 300
        },
    ]

    const profile = useSelector((state) => state.profile)
    const [idxTimer, setIdxTimer] = useState(profile.idxTimerRefresh)
    const [anchorTimerMenu, setAnchorTimerMenu] = useState(null)
    const hasTimerMenuOpen = Boolean(anchorTimerMenu)
    const [openInputDialog, setOpenInputDialog] = useState(false)
    const [openClearTaskDialog, setOpenClearTaskDialog] = useState(false)
    const [taskLength, setTaskLength] = useState(0)
    const [userTask, setUserTask] = useState(profile.task)
    const [procId, setProcId] = useState(null)
    const previousInputValue = useRef(userTask);

    useEffect(() => {
        previousInputValue.current = userTask;
    }, [userTask]);

    useEffect(() => {
        startTimer(timerObjList[idxTimer])
    }, []);

    const onTimerMenuClicked = (event) => {
        setAnchorTimerMenu(event.currentTarget)
    }

    const startTimer = (item) => {
        setIdxTimer(item["id"])
        dispatch(setIdxTimerRefresh(item["id"]))
        setProcessWithInterval(item["value"] * 1000)
    }

    const onTimerMenuSelected = (item) => {
        startTimer(item)
        setAnchorTimerMenu(null)
    }
    const onTimerMenuClosed = () => {
        setAnchorTimerMenu(null)
    }

    const setProcessWithInterval = (intervalInMs) => {
        clearInterval(procId)
        if (intervalInMs > 0) {
            setProcId(setInterval(checkTasksByTimer, intervalInMs))
        }
    }

    const dialogClearOnCancelClicked = () => {
        setOpenClearTaskDialog(false)
    }
    const dialogClearOnConfirmClicked = () => {
        setUserTask([])
        dispatch(clearTask())
        setOpenClearTaskDialog(false)
    }

    const dialogOnCancelClicked = () => {
        setOpenInputDialog(false)
    }
    const dialogOnConfirmClicked = () => {
        if (taskLength <= 0)
            return

        createNewTask()
        setOpenInputDialog(false)
    }

    const createNewTask = () => {
        let new_task = {
            id: Math.floor(Math.random() * 10000) + 1,
            lenTask: taskLength,
            proc: 0,
            status: "Process"
        }
        setUserTask([...userTask, new_task])
        dispatch(addNewTask(new_task))
    }
    const checkTasksByTimer = () => {
        let need_to_update = false
        let tmp_task = JSON.parse(JSON.stringify(previousInputValue.current))
        // console.log(JSON.stringify(tmp_task))
        for (let i = 0; i < tmp_task.length; i++) {
            let task = tmp_task[i]
            if (task["proc"] === task["lenTask"])
                continue

            task["proc"] += 1
            task["status"] = task["proc"] === task["lenTask"] ? "Done" : "Process"
            need_to_update = true
        }

        if(need_to_update) {
            // console.log(JSON.stringify(tmp_task))
            setUserTask(tmp_task)
            dispatch(updateAllTask(tmp_task))
        }
    }

    return (
        <>
            <Box sx={styles.boxContainer}>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth={'md'}>
                            <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                                <Grid item>
                                    <Link href={"/"} underline={'none'} justifyContent={'center'} display={'flex'}>
                                        <Box
                                            component="img"
                                            sx={styles.imageLogo}
                                            src={imageLogo}
                                        />
                                        <Typography sx={styles.titleLogo}>Dashboard AI</Typography>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <IconButton color={'inherit'} size={'large'}
                                                onClick={() => checkTasksByTimer()}><PlusOneOutlinedIcon
                                        sx={styles.toolbarButton}/></IconButton>

                                    <IconButton color={'inherit'} size={'large'}
                                                onClick={() => setOpenInputDialog(true)}><BookmarkAddOutlinedIcon
                                        sx={styles.toolbarButton}/></IconButton>
                                    <IconButton color={'inherit'} size={'large'}
                                                onClick={() => setOpenClearTaskDialog(true)}><DeleteSweepOutlinedIcon
                                        sx={styles.toolbarButton}/></IconButton>
                                    <Button variant={'text'} color={'inherit'} sx={{textTransform: ' none', ml: 2}}
                                            size={'large'}
                                            onClick={onTimerMenuClicked}
                                            endIcon={<TimerOutlinedIcon
                                                sx={styles.toolbarButton}/>}>{timerObjList[idxTimer]["text"]}</Button>

                                    <Menu anchorEl={anchorTimerMenu} open={hasTimerMenuOpen}
                                          onClose={onTimerMenuClosed}>
                                        {
                                            timerObjList.map((item) =>
                                                <MenuItem key={item["id"]}
                                                          onClick={() => onTimerMenuSelected(item)}>{item["text"]}</MenuItem>)
                                        }
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'md'}>
                    <Grid container spacing={2} sx={{mt: 1}}>
                        {
                            userTask.map((item) => {
                                return (
                                    <Grid item key={item["id"]}>
                                        <Card>
                                            <CardHeader title={item["id"]}></CardHeader>
                                            <CardContent>
                                                <Typography>Progress : {item["proc"]} / {item["lenTask"]}</Typography>
                                                <Typography display={'inline'}>Status: </Typography>
                                                <Typography display={'inline'}
                                                            sx={{color: item["proc"] === item["lenTask"] ? 'green' : 'orange'}}>
                                                {item["status"]}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                            </Grid>
                            )
                            })
                        }
                    </Grid>
                </Container>
            </Box>

            <MuiDialog
                open={openClearTaskDialog}
                title={<Box textAlign={'center'}><Typography variant={'h4'}>Clear Task</Typography></Box>}
                contents={
                    <>
                        <Grid container spacing={2}>
                            <Grid item sx={{maxWidth: '300px'}}>
                                <Typography>Clear all task ?</Typography>
                            </Grid>
                        </Grid>
                    </>
                }
                cancelText={"No"}
                confirmText={"Yes"}
                onCancelClicked={dialogClearOnCancelClicked}
                onConfirmClicked={dialogClearOnConfirmClicked}
            />

            <MuiDialog
                open={openInputDialog}
                title={<Box textAlign={'center'}><Typography variant={'h4'}>Create Task</Typography></Box>}
                contents={
                    <>
                        <Grid container spacing={2}>
                            <Grid item sx={{maxWidth: '300px'}}>
                                <TextField
                                    required
                                    label={"Task Length"}
                                    type={'number'}
                                    variant="filled"
                                    size="small"
                                    value={taskLength}
                                    onChange={(e) => setTaskLength(e.target.value * 1)}
                                />
                            </Grid>
                        </Grid>
                    </>
                }
                cancelText={""}
                confirmText={"Create"}
                onCancelClicked={dialogOnCancelClicked}
                onConfirmClicked={dialogOnConfirmClicked}
            />
        </>
    )
}
export default UiTimer