import {useState} from "react";
import {Box, Button, Container, Typography, useTheme} from "@mui/material";
import BaseUi from "../base-ui";
import {styled} from "@mui/material/styles";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UiInputCsv = () => {
    const theme = useTheme()
    const styles = {
        title: {
            fontSize: "20px"
        },
    }

    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleUpload = async () => {
        // We will fill this out later
    }

    return (
        <>
            <BaseUi title={"Upload CSV"}>
            <Container sx={{mt: 2}}>
                <Typography>Select *.CSV file</Typography>
                <Button component="label" variant="contained">
                    Browse
                    <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
                </Button>
                <Box sx={{mt: 2}}>
                    {file && (
                        <section>
                            File details:
                            <ul>
                                <li>Name: {file.name}</li>
                                <li>Type: {file.type}</li>
                                <li>Size: {file.size} bytes</li>
                            </ul>
                        </section>
                    )}
                </Box>
                {file && <Button variant="outlined" startIcon={<UploadFileIcon/>} onClick={handleUpload}>Upload a file</Button>}
            </Container>
        </BaseUi>
        </>
    )
}
export default UiInputCsv