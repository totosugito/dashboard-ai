import BaseUi from "../base-ui";
import {Breadcrumbs, Container, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {BrProjectCreate, BrProjectList, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import FormProjectEdit from "./component/form_project_edit";
import {skkProjectAdd} from "../../../../store/slice/skk";
import {dispatch} from "../../../../store";
import {getRouterUrl} from "../../../../router";

const UiProjectCreate = (props) => {
    const navigate = useNavigate()
    const theme = useTheme()
    const styles = {
        container: {
            mt: 2
        },
    }

    const project = {
        id: 0,
        title: '',
        desc: "",
        info: "",
        creator: {},
        created: '',
        gantt: [],
        trello: {}
    }
    const dataStore = useSelector((state) => state.skk)

    const handleSubmit = (project) => {
        project.id = Math.floor(Math.random() * 1000000)
        project.created = new Date().toLocaleString()
        project.updated = new Date().toLocaleString()
        project.creator = {"name": dataStore["user"]["name"], "avatar": dataStore["user"]["avatar"]}

        dispatch(skkProjectAdd(project))
        navigate(getRouterUrl("skk-project-list"))
    }

    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Container maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrProjectCreate hasClick={false}/>
                    </Breadcrumbs>

                    <FormProjectEdit data={project} onSubmit={handleSubmit} submitText={"Create Project"}/>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectCreate