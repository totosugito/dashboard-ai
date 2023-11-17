import {
    Avatar,
    Grid,
    Typography
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import moment from 'moment'
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ItemText from "./ItemText";
import ItemPlotly from "./ItemPlotly";
import ItemSmartDataFrame from "./ItemSmartDataFrame";

const ChatItem = (props) => {
    const theme = useTheme()
    const styles = {

        avatarOther: {
            color: theme.palette.getContrastText(theme.palette.divider),
            backgroundColor: theme.palette.primary.dark,
            width: theme.spacing(4),
            height: theme.spacing(4)
        },
        messageContentMine: {
            color: theme.palette.text.primary
        },
        messageContentOther: {
            color: theme.palette.text.primary
        },
        displayNameMine: {
            fontWeight: 'bold',
            color: theme.palette.success.main,
            fontSize: '110%'
        },
        displayNameOther: {
            fontWeight: 'bold',
            color: theme.palette.primary.dark,
            fontSize: '110%'
        },
        containerMessageMine: {
            justifyContent: "flex-end",
            textAlign: "right",
            m: 1
        },
        containerMessageOther: {
            textAlign: "left",
            m: 1
        },
        messageMine: {
            p: 1,
            mr: 1,
            width: 'calc(100% - 100px)',
            backgroundColor: theme.palette.divider,
            textAlign: "left",
            font: "400 90% 'Open Sans', sans-serif",
            borderRadius: "10px",
        },
        messageOther: {
            p: 1,
            width: 'calc(100% - 100px)',
            // backgroundColor: theme.palette.divider,
            font: "400 90% 'Open Sans', sans-serif",
            borderRadius: "10px",
        },
        messageTimeStampMine: {
            fontSize: "70%",
            color: theme.palette.text.secondary,
            textAlign: 'right'
        },
        messageTimeStampOther: {
            fontSize: "70%",
            color: theme.palette.text.secondary,
            textAlign: 'left'
        },
        importantMessage: {
            ml: 1,
            color: theme.palette.warning.main
        }
    }

    const createItemChat = (msg) => {
        switch (msg["type"]) {
            case "text":
                return(<ItemText data={msg.response}/>)
            case "plotly":
                let data = JSON.parse(JSON.stringify(msg.response["data"]))
                let layout = JSON.parse(JSON.stringify(msg.response["layout"]))
                layout["width"] = 500 // force default chart width
                return(<ItemPlotly data={[data]} layout={layout}/>)
            case "SmartDataframe":
                return(<ItemSmartDataFrame data={msg.response} row={10}/>)
            default:
                return(<ItemText data={msg["type"]}/>)
        }
    }

    const MessageOther = (data) => {
        const timestamp = data['timestamp'] ? moment( data['timestamp']*1000 ).format("YYYY-MM-DD  HH:mm:ss") : ""
        return (
            <>
                <Grid container sx={styles.containerMessageOther}>
                    <Grid item sx={{mr: 1}}>
                        <Avatar style={styles.avatarOther}><SmartToyIcon/> </Avatar>
                    </Grid>
                    <Grid item sx={styles.messageOther}>
                        <Typography sx={styles.displayNameOther}>{data.user}</Typography>
                        {createItemChat(data)}
                        <Typography sx={styles.messageTimeStampOther}>{timestamp}</Typography>
                    </Grid>
                </Grid>
            </>
        );
    };

    const MessageMine = (data) => {
        const timestamp = data['timestamp'] ? moment( data['timestamp']*1000 ).format("YYYY-MM-DD  HH:mm:ss") : ""
        return (
            <>
                <Grid container sx={styles.containerMessageMine}>
                    <Grid item sx={styles.messageMine}>
                        <Typography sx={styles.displayNameMine}>{data.user}</Typography>
                        <Typography sx={styles.messageContentMine}>{data.response}</Typography>
                        <Typography sx={styles.messageTimeStampMine}>{timestamp}</Typography>
                    </Grid>
                </Grid>
            </>
        );
    };

    return (
        <>
            {
                props.data?.isAi === 0 ? MessageMine(props.data) : MessageOther(props.data)
            }
        </>
    )
}

export default ChatItem
