import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import {Container, Typography, useTheme} from "@mui/material";
import BaseUi from "../base-ui";
import {useEffect} from "react";
import TextEditorReadOnly from "../../../../component/TipTap/TextEditorReadOnly";

const UiModelOpen = () => {
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
        subTitle: {
            fontSize: '140%',
            color: theme.palette.text.secondary
        },
        subTitleVal: {
            mb: 2,
            color: theme.palette.text.primary
        }
    }

    const params = useParams();
    const dataStore = useSelector((state) => state.ccdpv1)
    const [data, setData] = useState(dataStore["model"])
    const [selectedData, setSelectedData] = useState({data: {}})

    useEffect(() => {
        let selectedId = params["id"] * 1
        for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] === selectedId) {
                setSelectedData(data[i])
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    return(
        <>
            <BaseUi>
                <Container maxWidth="xl" sx={styles.container}>
                    <Typography sx={styles.title}>Model : {selectedData["title"]} ({selectedData["id"]})</Typography>
                    <Typography sx={styles.subTitle}>Creator</Typography>
                    <Typography sx={styles.subTitleVal}>{selectedData["creator"]}</Typography>

                    <Typography sx={styles.subTitle}>Created</Typography>
                    <Typography sx={styles.subTitleVal}>{selectedData["created"]}</Typography>

                    <Typography sx={styles.subTitle}>Description</Typography>
                    <Typography sx={styles.subTitleVal}>{selectedData["desc"]}</Typography>

                    <Typography sx={styles.subTitle}>Info</Typography>
                    <TextEditorReadOnly text={selectedData["info"]}/>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiModelOpen