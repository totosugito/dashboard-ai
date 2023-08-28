import BaseUi from "../base-ui";
import {Box, Button, Container, TextField, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {dispatch} from "../../store";
import {addProject} from "../../store/slice/profile-slice";
import {useNavigate} from "react-router-dom";
import {read, utils} from "xlsx";

const UiProjectCreate = (props) => {
    const navigate = useNavigate()
    const theme = useTheme()
    const styles = {
        container: {
            mt: 2
        }
    }

    const [project, setProject] = useState({
        id: 0,
        title: '',
        creator: '',
        created: '',
        total: '',
        status: '',
        data: []
    })
    const {title, creator, total, data} = project

    const onChange = (e) => {
        setProject((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        project.id = Math.floor(Math.random() * 1000000)
        project.creator = "User"
        project.created = new Date().toLocaleString()
        project.total = project.data.length
        project.status = ''

        dispatch(addProject(project))
        navigate('/ui-dashboard')
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
                    setProject({...project, data: rows})
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }


    return (
        <>
            <BaseUi>
                <Container maxWidth="xl" sx={styles.container}>
                    <Typography variant={'h5'} sx={{mb: 2}}>Create Project</Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{p: 1}}
                            fullWidth
                            required
                            type="text"
                            name='title'
                            label='Project Title'
                            value={title}
                            onChange={onChange}
                        />
                        <TextField
                            sx={{p: 1}}
                            fullWidth
                            required
                            type="text"
                            name='creator'
                            label='Project Creator'
                            value={creator}
                            onChange={onChange}
                        />

                        <Box sx={{p: 1}}>
                            {/*<Button className="custom-file-label" htmlFor="inputGroupFile">Choose file</Button>*/}
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile"
                                   required onChange={handleImport}
                                   accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                        </Box>

                        {
                            (project.data.length > 0) && (
                                <Box sx={{p: 1}}><Typography>Read data with size : {project.data.length} rows</Typography></Box>
                            )
                        }
                        <Button
                            sx={{m: 1}}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary">
                            Create Project
                        </Button>
                    </form>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectCreate