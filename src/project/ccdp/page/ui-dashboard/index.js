import {Button, Card, CardHeader, Container, Typography, useTheme} from "@mui/material";
import BaseUi from "../base-ui";
import BoxSummary from "./component/box-summary";
import TableProjectList from "./component/table-project-list";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getRouterUrl} from "../../../../router";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const UiDashboard = () => {
    const theme = useTheme()
    const styles = {
        title: {
            mt: 2,
            mb: 1,
            fontSize: '25px',
            color: theme.palette.secondary.main
        },
        container: {
            mt: 2,
        },
        card: {
            p: 0,
            boxShadow: 0,
        }
    }

    const dummy = useSelector((state) => state.dummy)
    const [project, setProject] = useState(dummy["project"])
    const navigate = useNavigate()
    const onClickCreateProject = () => {
        navigate(getRouterUrl("ccdp-project-create"))
    }
    const onClickTaskList = () => {
        navigate(getRouterUrl("dummy-task-list"))
    }

    return (
        <>
            <BaseUi>
                <Typography sx={styles.title}>Dummy Dashboard</Typography>
                <BoxSummary/>
                <Container maxWidth="xl" sx={styles.container}>
                    <Card sx={styles.card}>
                        <CardHeader title={'Project List'}/>
                        <Button variant="outlined" startIcon={<PostAddIcon/>} sx={{textTransform: 'none', mr: 2}} onClick={onClickCreateProject}>Create project</Button>
                        <TableProjectList data={project}/>
                    </Card>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiDashboard