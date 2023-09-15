import BaseUi from "../base-ui";
import {Box, Button, Container, InputLabel, TextField, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import TextEditor from "../../../../component/TipTap/TextEditor";
import {dispatch} from "../../../../store";
import {getRouterUrl} from "../../../../router";
import {useState} from "react";
import {projectAdd} from "../../../../store/slice/ccdpv1";
import {read, utils} from "xlsx";

const UiProjectEdit = (props) => {
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

    const rteRef = useRef(null);

    const [project, setProject] = useState({
        id: 0,
        title: '',
        desc: '',
        creator: '',
        info: '',
        created: '',
        job: [],
        task: []
    })
    const {title, desc} = project

    const onChange = (e) => {
        setProject((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        project.id = Math.floor(Math.random() * 1000000)
        project.title = title
        project.desc = desc
        project.info = rteRef.current?.editor?.getHTML()
        project.creator = "User"
        project.created = new Date().toLocaleString()
        project.job = []
        project.task = []

        dispatch(projectAdd(project))
        navigate(getRouterUrl("ccdp-v1-project-list"))

    }

    return (
        <>
            <BaseUi>
                <Container maxWidth={'xl'}>
                    <Typography sx={styles.title}>Edit Project</Typography>

                    <form onSubmit={handleSubmit}>
                        <Box sx={styles.boxField}>
                            <InputLabel sx={styles.formLabel}>
                                Title
                            </InputLabel>
                            <TextField
                                sx={{p: 1}}
                                fullWidth
                                required
                                type="text"
                                name='title'
                                size={'small'}
                                value={title}
                                onChange={onChange}
                            />
                        </Box>

                        <Box sx={styles.boxField}>
                            <InputLabel sx={styles.formLabel}>
                                Description
                            </InputLabel>
                            <TextField
                                sx={{p: 1}}
                                fullWidth
                                required
                                type="text"
                                name='desc'
                                size={'small'}
                                value={desc}
                                onChange={onChange}
                            />
                        </Box>

                        <Box sx={styles.boxField}>
                            <InputLabel sx={styles.formLabel}>
                                Info
                            </InputLabel>
                            <Box sx={{ml: 1, mr: -1, mt: 1}}><TextEditor refId={rteRef}/></Box>

                        </Box>

                        <Button
                            sx={{m: 1}}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary">
                            Submit
                        </Button>
                    </form>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectEdit