import BaseUi from "../base-ui";
import {Box, Button, Container, TextField, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {dispatch} from "../../../../store";
import {useNavigate, useParams} from "react-router-dom";
import {read, utils} from "xlsx";
import {getRouterUrl} from "../../../../router";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {projectJobAdd} from "../../../../store/slice/ccdpv1";

const UiJobCreate = (props) => {
    const params = useParams();
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

    const dataStore = useSelector((state) => state.ccdpv1)
    const [projectList, setProjectList] = useState(dataStore["project"])
    const [selectedProject, setSelectedProject] = useState({})
    useEffect(() => {
        let projectId = params["id"] * 1
        for (let i = 0; i < projectList.length; i++) {
            if (projectList[i]["id"] === projectId) {
                setSelectedProject(projectList[i])
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    const [job, setJob] = useState({
        id: 0,
        title: '',
        creator: '',
        created: '',
        total: '',
        status: '',
        data: []
    })
    const {title, creator, total, data} = job

    const onChange = (e) => {
        setJob((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        job.id = Math.floor(Math.random() * 1000000)
        job.creator = creator
        job.created = new Date().toLocaleString()
        job.total = job.data.length
        job.status = ''

        let tmpProject = JSON.parse(JSON.stringify(selectedProject))
        tmpProject["job"].push(job)
        dispatch(projectJobAdd({project: tmpProject}))
        navigate(getRouterUrl("ccdp-v1-project-open", "/", {id: params["id"]}))
    }

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setJob({...job, data: rows})
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }


    return (
        <>
            <BaseUi>
                <Container maxWidth="xl" sx={styles.container}>
                    <Typography sx={styles.title}>Create Job</Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{p: 1}}
                            fullWidth
                            required
                            type="text"
                            name='title'
                            label='Job Title'
                            value={title}
                            onChange={onChange}
                        />
                        <TextField
                            sx={{p: 1}}
                            fullWidth
                            required
                            type="text"
                            name='creator'
                            label='Job Creator'
                            value={creator}
                            onChange={onChange}
                        />

                        <Box sx={{p: 1}}>
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile"
                                   required onChange={handleImport}
                                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                        </Box>

                        {
                            (job.data.length > 0) && (
                                <Box sx={{p: 1}}><Typography>Read data with size
                                    : {job.data.length} rows</Typography></Box>
                            )
                        }
                        <Button
                            sx={{m: 1}}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary">
                            Create Job
                        </Button>
                    </form>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiJobCreate