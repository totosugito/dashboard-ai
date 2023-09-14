import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import {
    Avatar,
    Box, Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemButton, ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    useTheme
} from "@mui/material";
import BaseUi from "../base-ui";
import {useEffect} from "react";
import TextEditorReadOnly from "../../../../component/TipTap/TextEditorReadOnly";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import TableData from "./component/table-data";
import {httpPost} from "../../../../service/http-api";
import {getRouterApi} from "../../../../router";
import {dispatch} from "../../../../store";
import {projectUpdate} from "../../../../store/slice/ccdpv1";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { green, pink, blue } from '@mui/material/colors';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';

const UiProjectOpen = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const styles = {
        container: {
            mt: 2
        },
        title: {
            mt: 2,
            mb: 1,
            fontSize: '25px',
            color: theme.palette.secondary.main
        },
        subTitle: {
            fontSize: '140%',
            color: theme.palette.text.secondary
        },
        subTitleVal: {
            mb: 2,
            color: theme.palette.text.primary
        },
        paperModel: {
            height: '100%',
            p: 1
        },
        cardTitle: {
            fontSize: '130%',
            color: theme.palette.secondary.main
        },
        modelTitle: {
            fontSize: '100%',
            fontWeight: 'normal'
        },
        modelTitleDesc: {
            fontSize: '80%',
            color: theme.palette.text.secondary
        }
    }

    const params = useParams();
    const dataStore = useSelector((state) => state.ccdpv1)
    const [data, setData] = useState(dataStore["project"])
    const [model, setModel] = useState(dataStore["model"])
    const [selectedData, setSelectedData] = useState({data: {}})

    useEffect(() => {
        let selectedId = params["id"] * 1
        for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] === selectedId) {
                setSelectedData(data[i])
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    const createProjectView = () => {
        return (
            <>
                <Paper sx={{p: 1, height: '100%'}}>
                    <Typography sx={styles.cardTitle}>Project
                        : {selectedData["title"]} ({selectedData["id"]})</Typography>
                    <Typography sx={styles.subTitle}>Creator</Typography>
                    <Typography sx={styles.subTitleVal}>{selectedData["creator"]}</Typography>

                    <Typography sx={styles.subTitle}>Created</Typography>
                    <Typography sx={styles.subTitleVal}>{selectedData["created"]}</Typography>

                    <Typography sx={styles.subTitle}>Description</Typography>
                    <Typography sx={styles.subTitleVal}>{selectedData["desc"]}</Typography>

                    <Typography sx={styles.subTitle}>Status</Typography>
                    <Typography sx={styles.subTitleVal}>{selectedData["status"]}</Typography>

                    <Typography sx={styles.subTitle}>Info</Typography>
                    <TextEditorReadOnly text={selectedData["info"]}/>
                </Paper>
            </>)
    }

    const createModelView = () => {
        return (
            <>
                <Paper sx={styles.paperModel}>
                    <Typography sx={styles.cardTitle}>Model List</Typography>
                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {
                            model.map((item) => (
                                <ListItem disablePadding key={item["id"]}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ViewInArIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <>
                                                <Typography sx={styles.modelTitle}>{item["title"]}</Typography>
                                                <Typography sx={styles.modelTitleDesc}>{item["desc"]}</Typography>
                                            </>
                                        }/>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Paper>
            </>
        )
    }

    const createActivityItem = (icon, color, title, desc) => {
        return(
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Avatar sx={{ bgcolor: color }}>
                            {icon}
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={
                        <Box>
                            <Typography sx={styles.modelTitle}>{title}</Typography>
                            <Typography sx={styles.modelTitleDesc}>{desc}</Typography>
                        </Box>}/>
                </ListItemButton>
            </ListItem>
        )
    }
    const createActivityView = () => {
        return (
            <>
                <Paper sx={styles.paperModel}>
                    <Typography sx={styles.cardTitle}>Activity</Typography>
                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {createActivityItem(<InfoOutlinedIcon />, pink[500], "Create a project", "1 minutes ago")}
                        {createActivityItem(<EventNoteOutlinedIcon />, pink[300], "Adding note", "5 minutes ago")}
                        {createActivityItem(<DirectionsRunOutlinedIcon />, blue[500], "Run prediction", "20 minutes ago")}
                        {createActivityItem(<ViewInArIcon />, green[500], "Create a project", "1 hours ago")}
                        {createActivityItem(<ViewInArIcon />, green[500], "Create a project", "2 hours ago")}
                        {createActivityItem(<BackupTableOutlinedIcon />, blue[300], "Update data table", "3 hours ago")}
                        {createActivityItem(<BackupTableOutlinedIcon />, blue[300], "Create data table", "3 hours ago")}
                    </List>
                </Paper>
            </>
        )
    }

    const http_run_prediction = () => {
        let param = {projectId: `${selectedData["id"]}`, jobId: "", data: selectedData['data']}
        httpPost(getRouterApi("dummy-job-predict"), param).then((v) => {
            if (v.isError) {
                console.log(v.message)
            } else {
                setSelectedData({...selectedData, data: v.data})
                dispatch(projectUpdate({project: selectedData, data: v.data["data"]}))
                window.location.reload()
            }
        })
    }

    return (
        <>
            <BaseUi>
                <Container maxWidth="xl" sx={styles.container}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            {createProjectView()}
                        </Grid>
                        <Grid item xs={3}>
                            {createModelView()}
                        </Grid>
                        <Grid item xs={3}>
                            {createActivityView()}
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{mt: 2}}>
                                <Typography sx={styles.cardTitle}>Project Data</Typography>
                                <Button variant="outlined" sx={{mt: 1}} onClick={() => http_run_prediction()}>Run
                                    Prediction</Button>
                                <TableData data={selectedData["data"]}/>
                            </Box>
                            <Box sx={{height: "30px"}}/>
                        </Grid>
                    </Grid>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectOpen