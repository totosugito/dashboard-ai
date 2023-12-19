import BaseUi from "../base-ui";
import {Breadcrumbs, Container, TextField, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {BrLabel, BrProjectList, BrProjectOpen, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import FormProjectEdit from "../ui-project-create/component/form_project_edit";
import {dispatch} from "../../../../store";
import {skkProjectUpdate} from "../../../../store/slice/skk";
import {getRouterUrl} from "../../../../router";

const UiProjectEdit = (props) => {
    const navigate = useNavigate()
    const theme = useTheme()
    const styles = {
        container: {
            mt: 2
        },
        label: {
            mt: 2,
            fontWeight: 'bold',
            color: theme.palette.secondary.main
        },
    }

    const params = useParams();
    const dataStore = useSelector((state) => state.skk)
    const [project, setProject] = useState(dataStore["project"])
    const [selectedProject, setSelectedProject] = useState({})

    useEffect(() => {
        let selectedId = params["id"] * 1
        for (let i = 0; i < project.length; i++) {
            if (project[i]["id"] === selectedId) {
                setSelectedProject(project[i])
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (project) => {
        project.updated = new Date().toLocaleString()
        dispatch(skkProjectUpdate(project))
        navigate(getRouterUrl("skk-project-list"))
    }

    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Container maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrLabel label={"Edit"}/>
                        <BrProjectOpen label={selectedProject["title"]} hasClick={false}/>
                    </Breadcrumbs>

                    {Object.keys(selectedProject).length > 0 &&
                        <FormProjectEdit data={selectedProject} onSubmit={handleSubmit} submitText={"Update Project"}/>
                    }
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectEdit