import {useNavigate, useParams} from "react-router-dom";
import {Button, Container, Typography, useTheme} from "@mui/material";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useState} from "react";
import BaseUi from "../base-ui";
import TableProjectData from "./component/table-project-data";
import {httpPost} from "../../../../service/http-api";
import {dispatch} from "../../../../store";
import {getRouterApi} from "../../../../router";
import {projectJobUpdate, projectUpdate} from "../../../../store/slice/ccdpv1";

const UiJobOpen = (props) => {
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
        }
    }

    const params = useParams();
    const dataStore = useSelector((state) => state.ccdpv1)
    const [project, setProject] = useState(dataStore["project"])
    const [selectedProject, setSelectedProject] = useState({data: []})
    const [selectedJob, setSelectedJob] = useState({data: []})

    useEffect(() => {
        let projectId = params["id"] * 1
        let jobId = params["jobId"] * 1
        for (let i = 0; i < project.length; i++) {
            if (project[i]["id"] === projectId) {
                setSelectedProject(project[i])

                let selectedJob_ = project[i]["job"]
                for(let j=0; j<selectedJob_.length; j++) {
                    if(selectedJob_[j]["id"] === jobId) {
                        setSelectedJob(selectedJob_[j])
                        break
                    }
                }
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    const http_run_prediction = () => {
        let param = {projectId: `${selectedProject["id"]}`, jobId: `${selectedJob["id"]}`, data: selectedJob['data']}
        httpPost(getRouterApi("dummy-job-predict"), param).then((v) => {
            if (v.isError) {
                console.log(v.message)
            } else {
                setSelectedJob({...selectedJob, data: v.data})
                dispatch(projectJobUpdate({projectId: selectedProject["id"], jobId: selectedJob["id"], data: v.data["data"]}))
                window.location.reload()
            }
        })
    }

    // const http_run_prediction = () => {
    //     let param = {projectId: `${selectedProject["id"]}`, jobId: "", data: selectedProject['data']}
    //     httpPost(getRouterApi("dummy-job-predict"), param).then((v) => {
    //         if (v.isError) {
    //             console.log(v.message)
    //         } else {
    //             setSelectedJob({...selectedJob, data: v.data})
    //             // dispatch(dummyProjectUpdate({project: selectedProject, data: v.data["data"]}))
    //             // window.location.reload()
    //         }
    //     })
    // }
    return (
        <>
            <BaseUi>
                <Container maxWidth="xl" sx={styles.container}>
                    <Typography sx={styles.title}>Job : {selectedJob["title"]}</Typography>
                    <Typography sx={{mb: 0}}>creator : {selectedJob["creator"]}</Typography>
                    <Typography sx={{mb: 0}}>Created : {selectedJob["created"]}</Typography>
                    <Typography sx={{mb: 0}}>Total data : {selectedJob["total"]}</Typography>
                    <Typography sx={{mb: 0}}>Status : {selectedJob["status"]}</Typography>
                    <Button variant="outlined" sx={{mt: 1}} onClick={()=>http_run_prediction()}>Run Prediction</Button>
                    <TableProjectData data={selectedJob["data"]}/>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiJobOpen