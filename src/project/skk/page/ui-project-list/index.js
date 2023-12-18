import {Avatar, Breadcrumbs, Button, Container, Link, Typography, useTheme} from "@mui/material";
import BaseUi from "../base-ui";
import TableProjectList from "./component/table-project-list";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getRouterUrl} from "../../../../router";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {BrProjectList, SkkToolbar} from "../../component";

const UiProjectList = () => {
    const theme = useTheme()
    const styles = {
        title: {
            mt: 2,
            mb: 1,
            fontSize: '120%',
            fontWeight: 'bold',
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

    const dataStore = useSelector((state) => state.skk)
    const [project, setProject] = useState(dataStore["project"])
    const navigate = useNavigate()
    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Container maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                    </Breadcrumbs>

                    <Button variant="outlined" startIcon={<PostAddIcon/>} sx={{textTransform: 'none', mb: 1, mr: 2}} size={'small'}
                            onClick={()=>navigate(getRouterUrl("skk-project-create"))}>Create project</Button>
                    <TableProjectList data={project}/>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectList