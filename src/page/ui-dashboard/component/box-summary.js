import {Container, Grid} from "@mui/material";
import AppWidgetSummary from "../../../component/AppWidgetSummary";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StorageIcon from "@mui/icons-material/Storage";
import {useSelector} from "react-redux";
import {useState} from "react";

const BoxSummary = () => {
    const styles = {
        container: {
            mt: 2,
        }
    }

    const profile = useSelector((state) => state.profile)
    const [project, setProject] = useState(profile.project)
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
                        <AppWidgetSummary title="Item Tasks" total={17} color="warning" icon={<AssignmentIcon/>}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Data" total={234} color="error" icon={<StorageIcon/>}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default BoxSummary