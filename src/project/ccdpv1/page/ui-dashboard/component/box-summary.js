import {Box, Container, Grid, Typography} from "@mui/material";
import AppWidgetSummary from "../../../../../component/AppWidgetSummary";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import {useSelector} from "react-redux";
import {useState} from "react";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import MuiDialog from "../../../../../component/MuiDialog";
import {dispatch} from "../../../../../store";
import {clearAllData} from "../../../../../store/slice/ccdpv1";
import ViewInArIcon from '@mui/icons-material/ViewInAr';

const BoxSummary = () => {
    const styles = {
        container: {
            mt: 2,
        }
    }

    const dataStore = useSelector((state) => state.ccdpv1)
    const [project, setProject] = useState(dataStore["project"])
    const [model, setModel] = useState(dataStore["model"])
    const [openClearDialog, setOpenClearDialog] = useState(false)
    const dialogClearOnCancelClicked = () => {
        setOpenClearDialog(false)
    }
    const dialogClearOnConfirmClicked = () => {
        dispatch(clearAllData())
        setOpenClearDialog(false)
        window.location.reload()
    }

    const getTaskCount = () => {
        if ("task" in project) {
            return (Object.keys(project["task"]).length)
        }
        return (0)
    }
    return(
        <>
            <Container maxWidth="xl" sx={styles.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total User" total={10} icon={<GroupIcon/>}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Projects" total={project.length} color="success" icon={<WorkIcon/>}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Item Models" total={model.length} color="warning" icon={<ViewInArIcon/>}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Clear Data" total={"-"} color="error" icon={<FolderDeleteIcon/>} onClick={()=> setOpenClearDialog(true)}/>
                    </Grid>
                </Grid>
            </Container>

            <MuiDialog
                open={openClearDialog}
                title={<Box textAlign={'center'}><Typography variant={'h4'}>Clear Data</Typography></Box>}
                contents={
                    <>
                        <Grid container spacing={2}>
                            <Grid item sx={{maxWidth: '300px'}}>
                                <Typography>Are you want to clear all data ?</Typography>
                            </Grid>
                        </Grid>
                    </>
                }
                cancelText={"No"}
                confirmText={"Yes"}
                onCancelClicked={dialogClearOnCancelClicked}
                onConfirmClicked={dialogClearOnConfirmClicked}
            />
        </>
    )
}
export default BoxSummary