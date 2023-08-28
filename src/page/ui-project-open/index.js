import {useNavigate, useParams} from "react-router-dom";
import {Button, Container, Typography, useTheme} from "@mui/material";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useState} from "react";
import BaseUi from "../base-ui";
import TableProjectData from "./component/table-project-data";
import {httpPost} from "../../service/http-api";
import {dispatch} from "../../store";
import {projectDataUpdate} from "../../store/slice/profile-slice";

const UiProjectOpen = (props) => {
    const navigate = useNavigate()
    const theme = useTheme()
    const styles = {
        container: {
            mt: 2
        }
    }

    const params = useParams();
    const profile = useSelector((state) => state.profile)
    const [project, setProject] = useState(profile.project)
    const [selectedProject, setSelectedProject] = useState({data: []})

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

    const http_run_prediction = () => {
        httpPost("/api/job/predict-json-list", {data: selectedProject['data']}).then((v) => {
            if (v.isError) {
                console.log(v.message)
            } else {
                setSelectedProject({...selectedProject, data: v.data})
                dispatch(projectDataUpdate({project: selectedProject, data: v.data["data"]}))
                window.location.reload()
            }
        })
    }
    return (
        <>
            <BaseUi>
                <Container maxWidth="xl" sx={styles.container}>
                    <Typography variant={'h5'} sx={{mb: 2}}>Project : {selectedProject["title"]} ({selectedProject["id"]})</Typography>
                    <Typography sx={{mb: 0}}>creator : {selectedProject["creator"]}</Typography>
                    <Typography sx={{mb: 0}}>Created : {selectedProject["created"]}</Typography>
                    <Typography sx={{mb: 0}}>Total data : {selectedProject["total"]}</Typography>
                    <Button variant="outlined" sx={{mt: 1}} onClick={()=>http_run_prediction()}>Run Prediction</Button>
                    <TableProjectData data={selectedProject["data"]}/>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectOpen