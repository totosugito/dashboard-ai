import {Button, Container, Typography, useTheme} from "@mui/material";
import BaseUi from "../base-ui";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import TableProjectList from "./component/table-project-list";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {getRouterUrl} from "../../../../router";

const UiProjectList = () => {
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
        boxField: {
            mb: 1
        },
        formLabel: {
            ml: 1
        }
    }

    const dataStore = useSelector((state) => state.ccdpv1)
    const [project, setProject] = useState(dataStore["project"])

    const onClickCreateProject = () => {
        navigate(getRouterUrl("ccdp-v1-project-edit"))
    }
    return(
        <>
            <BaseUi>
                <Container maxWidth={'xl'}>
                    <Typography sx={styles.title}>Project List</Typography>
                    <Button variant="outlined" startIcon={<PostAddIcon/>} sx={{textTransform: 'none', mr: 2}} onClick={onClickCreateProject}>Create project</Button>
                    <TableProjectList data={project}/>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectList