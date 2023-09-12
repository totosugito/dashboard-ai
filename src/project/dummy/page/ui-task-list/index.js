import {
    AppBar,
    Box,
    Button, Card, CardContent,
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
import imageLogo from "../../../../assets/image-logo.png"
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {useEffect, useRef, useState} from "react";
import {dispatch} from "../../../../store";
import {useSelector} from "react-redux";
import MuiDialog from "../../../../component/MuiDialog";
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import {httpGet, httpPost} from "../../../../service/http-api";
import {getRouterApi} from "../../../../router";
import {addNewTaskApi, clearTask, setIdxTimerRefresh, updateAllTaskApi} from "../../../../store/slice/dummy";

const UiTaskList = () => {
    const theme = useTheme()
    const styles = {
        boxContainer: {},
        logo: {
            width: "35px"
        },
        title: {
            ml: 1,
            color: 'white',
            fontSize: '25px'
        },
        toolbarButton: {
            width: "24px",
            height: "24px",
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

    const dummy = useSelector((state) => state.dummy)
    const [idxTimer, setIdxTimer] = useState(dummy["idxTimerRefresh"])
    const [anchorTimerMenu, setAnchorTimerMenu] = useState(null)
    const hasTimerMenuOpen = Boolean(anchorTimerMenu)
    const [openInputDialog, setOpenInputDialog] = useState(false)
    const [openClearTaskDialog, setOpenClearTaskDialog] = useState(false)
    const [taskName, setTaskName] = useState("")
    const [taskNum, setTaskNum] = useState(0)
    const [userTask, setUserTask] = useState(dummy["taskApi"])
    const [procId, setProcId] = useState(null)
    const previousInputValue = useRef(userTask);

    useEffect(() => {
        previousInputValue.current = userTask;
    }, [userTask]);

    useEffect(() => {
        startTimer(timerObjList[idxTimer])
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const showNewTaskDialog = () => {
        setTaskName("")
        setTaskNum(0)
        setOpenInputDialog(true)
    }

    const dialogClearOnCancelClicked = () => {
        setOpenClearTaskDialog(false)
    }
    const dialogClearOnConfirmClicked = () => {
        setUserTask({})
        dispatch(clearTask())
        setOpenClearTaskDialog(false)
    }

    const dialogOnCancelClicked = () => {
        setOpenInputDialog(false)
    }
    const dialogOnConfirmClicked = () => {
        if (taskName.trim().length <= 0)
            return

        createNewTask()
        setOpenInputDialog(false)
    }

    const createNewTask = () => {
        let param = {
            name: taskName,
            num: taskNum
        }

        httpPost(getRouterApi("dummy-task-create"), param).then((v) => {
            if (v.isError) {
                console.log(v.message)
            } else {
                let task_id = v.data["task_id"]
                let task_updated = JSON.parse(JSON.stringify(previousInputValue.current))
                task_updated[task_id] = {...v.data, status: "", result: {result: ""}}
                setUserTask(task_updated)
                dispatch(addNewTaskApi(task_updated))
            }
        })
    }

    const checkTasksByTimer = () => {
        let all_task = JSON.parse(JSON.stringify(previousInputValue.current))
        let task_length = Object.keys(all_task).length

        let proc_task = 0
        let tmp_task = {...all_task}
        Object.keys(all_task).map((key_) => {
            let task = tmp_task[key_]
            if (task["status"] !== "SUCCESS") {
                httpGet(getRouterApi("dummy-task-status", {id: task["task_id"]})).then((v) => {
                    if (v.isError) {
                        console.log("ERROR: " + v.message)
                    } else {
                        // console.log(JSON.stringify(v.data))
                        let task_id = v.data["task_id"]
                        let tmp_ = v.data
                        if (!("result" in v.data))
                            tmp_["result"] = {result: ""}
                        if (v.data["result"] === null)
                            tmp_["result"] = {result: ""}

                        proc_task = proc_task + 1  // add counter
                        tmp_task[task_id] = tmp_

                        // update data when all api called
                        if(proc_task === task_length) {
                            setUserTask(tmp_task)
                            dispatch(updateAllTaskApi(tmp_task))
                        }
                    }
                })
            }
            else {
                proc_task = proc_task + 1
            }
        })
    }

    const handleChange = (e) => {
        const inputValue = e.target.value
        const numericValue = Number(inputValue);
        if (!Number.isNaN(numericValue) || inputValue === '') {
            setTaskNum(numericValue)
        }
    };

    return (
        <>
            <Box sx={styles.boxContainer}>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth={'xl'}>
                            <Grid container direction="row" alignItems="flex-end" justifyContent="space-between">
                                <Grid item>
                                    <Link href={"/"} underline={'none'} display={'flex'}>
                                        <Box
                                            component="img"
                                            sx={styles.logo}
                                            src={imageLogo}
                                        />
                                        <Typography sx={styles.title}>Dashboard AI</Typography>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <IconButton color={'inherit'}
                                                onClick={() => showNewTaskDialog()}><BookmarkAddOutlinedIcon
                                        sx={styles.toolbarButton}/></IconButton>
                                    <IconButton color={'inherit'}
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
                <Container maxWidth={'xl'}>
                    <Grid container spacing={2} sx={{mt: 1}}>
                        {
                            Object.keys(userTask).map((key_) => {
                                return (
                                    <Grid item key={key_}>
                                        <Card>
                                            <CardContent>
                                                { ("result" in userTask[key_]) &&
                                                    userTask[key_]["status"] === "SUCCESS" ?
                                                        (<Typography>Result
                                                            : {userTask[key_]["result"]["result"]}</Typography>) :
                                                        (<Typography>Progress: {userTask[key_]["result"]["done"]} / {userTask[key_]["result"]["total"]}</Typography>)
                                                }
                                                <Typography display={'inline'}>Status: </Typography>
                                                <Typography display={'inline'}
                                                            sx={{color: userTask[key_]["status"] === "SUCCESS" ? 'green' : 'orange'}}>
                                                    {userTask[key_]["status"]}
                                                </Typography>
                                                <Typography>Task ID: {userTask[key_]["task_id"]}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>)
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
                        <Grid container spacing={2} direction={'column'}>
                            <Grid item sx={{maxWidth: '300px'}}>
                                <TextField
                                    required
                                    label={"Task Name"}
                                    variant="filled"
                                    size="small"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{maxWidth: '300px'}}>
                                <TextField
                                    required
                                    type={'number'}
                                    label={"Task Num"}
                                    variant="filled"
                                    size="small"
                                    value={taskNum}
                                    onChange={(e) => handleChange(e)}
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
export default UiTaskList