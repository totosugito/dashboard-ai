import {useState} from "react"
import {useTheme} from "@mui/material/styles"
import {
    TextField
} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {userName} from "../../../../../config";

const ChatInput = (props) => {
    const theme = useTheme()
    const styles = {
        textField: {

        },
        button: {
        }
    }

    const [msgText, setMsgText] = useState('')
    const sendMessage = () => {
        props.onSendMessage({
            id: Math.floor(Math.random() * 1000000),
            isAi: 0,
            user: userName,
            response: msgText,
            timestamp: (new Date().getTime())/1000
        })
        setMsgText("")
    }
    return (
        <>
            <div style={{position: 'relative'}}>
                <TextField fullWidth sx={styles.textField} size={"small"} value={msgText} minRows={1} maxRows={9} multiline
                           InputProps={{sx: {borderRadius: "10px"}}}
                           style={{zIndex: 1}}
                           onChange={(e) => setMsgText(e.target.value)}
                />
                <ArrowUpwardIcon fontSize={'small'} sx={{borderRadius: '7px', padding: "3px"}} onClick={() => sendMessage()}
                                 style={{
                                     backgroundColor: msgText.trim().length === 0 ? theme.palette.text.disabled : theme.palette.text.primary,
                                     color: theme.palette.background.default,
                                     position: 'absolute', zIndex: 2, right: "5px", bottom: "7px"
                                 }}/>
            </div>
        </>
    )
}
export default ChatInput
