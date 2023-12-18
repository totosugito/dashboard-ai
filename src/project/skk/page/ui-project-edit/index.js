import BaseUi from "../base-ui";
import {Breadcrumbs, Container, TextField, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {BrProjectList, BrProjectOpen, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import FormProjectEdit from "../ui-project-create/component/form_project_edit";
import {dispatch} from "../../../../store";
import {skkProjectAdd} from "../../../../store/slice/skk";
import {getRouterUrl} from "../../../../router";
import {useRef} from "react";

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
        console.log(project)
        // project.id = Math.floor(Math.random() * 1000000)
        // project.created = new Date().toLocaleString()
        // project.creator = {"name": dataStore["user"]["name"], "avatar": dataStore["user"]["avatar"]}
        //
        // dispatch(skkProjectAdd(project))
        // navigate(getRouterUrl("skk-project-list"))
    }

    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Container maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrProjectOpen label={selectedProject["title"]} hasClick={false}/>
                    </Breadcrumbs>

                    <FormProjectEdit data={selectedProject} onSubmit={handleSubmit} submitText={"Submit Project"}/>
                    {/*<TextField*/}
                    {/*    sx={{p: 1}}*/}
                    {/*    fullWidth*/}
                    {/*    required*/}
                    {/*    type="text"*/}
                    {/*    name='title'*/}
                    {/*    size={'small'}*/}
                    {/*    value={selectedProject.title || ''}*/}
                    {/*    onChange={()=>{}}*/}
                    {/*/>*/}
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectEdit