import BaseUi from "../base-ui";
import {Breadcrumbs, Button, Container, useTheme} from "@mui/material";
import {useParams} from "react-router-dom";
import {BrLabel, BrProjectList, BrProjectOpen, SkkToolbar} from "../../component";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
// import Board from "react-trello-ts";

const UiProjectTrello = (props) => {
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
        board: {
            backgroundColor: theme.palette.background.default
        }
    }

    const params = useParams();
    const dataStore = useSelector((state) => state.skk)
    const [project, setProject] = useState(dataStore["project"])
    const [selectedProject, setSelectedProject] = useState({})
    const [trello, setTrello] = useState({lanes: []})


    useEffect(() => {
        let selectedId = params["id"] * 1
        for (let i = 0; i < project.length; i++) {
            if (project[i]["id"] === selectedId) {
                setSelectedProject(project[i])
                let trello_ = project[i]["trello"]
                if (!trello_.hasOwnProperty("lanes")) {
                    trello_ = {lanes: []}
                }
                setTrello(trello_)
                break
            }
        }
        // eslint-disable-next-line
    }, []);

    const onSaveClicked = () => {
        console.log(JSON.stringify(trello))
    }
    return (
        <>
            <BaseUi toolbar={<SkkToolbar user={dataStore["user"]}/>}>
                <Container maxWidth="xl" sx={styles.container}>
                    <Breadcrumbs sx={{mb: 1}}>
                        <BrProjectList/>
                        <BrLabel label={"Trello"}/>
                        <BrProjectOpen label={selectedProject["title"]} hasClick={false}/>
                    </Breadcrumbs>

                    <Button onClick={()=>onSaveClicked()} >Save</Button>
                    {/*<Board data={trello} canAddLanes={true} draggable={true} editable={true} style={styles.board} cardDraggable={true} isDraggingOver={true}/>*/}
                    {/*<Board data={trello} canAddLanes={true} editable={true}/>*/}
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectTrello