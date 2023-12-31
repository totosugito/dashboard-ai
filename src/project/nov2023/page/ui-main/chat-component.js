import ChatList from "./component/ChatList";
import {useState} from "react";
import {httpPost} from "../../../../service/http-api";
import {useSelector} from "react-redux";
import {addData, clearData} from "../../../../store/slice/chat";
import {dispatch} from "../../../../store";
import {Box, Button, Grid} from "@mui/material";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ChatInput from "./component/ChatInput";
import CF from "../../../../config";

const ChatComponent = () => {
    const chatStore = useSelector((state) => state.chat)
    const [chatList, setChatList] = useState(chatStore["data"])
    const [showLoader, setShowLoader] = useState(false)


    const submitQuestion = async (text) => {
        setShowLoader(true)
        let bodyFormData = new FormData();
        let config = {
            headers: {"Content-Type": "multipart/form-data"}
        }
        bodyFormData.append('question', text);
        httpPost(CF.baseURL + "/send-question", bodyFormData, config).then((v) => {
            if (v.isError) {
                console.log(v.message)
            } else {
                dispatch(addData(v.data))
                setChatList((chatList) => [...chatList, v.data])
            }
            setShowLoader(false)
        })
    }

    const onSendMessage = (msg) => {
        if (showLoader) {
            return;
        }

        if (msg.response === "")
            return
        setChatList((chatList) => [...chatList, msg])
        dispatch(addData(msg))
        submitQuestion(msg.response).then(r => {
        })
    }

    const clearChatHistory = () => {
        setChatList([]);
        dispatch(clearData())
    }
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <Box>
                    <Button variant="outlined" color={'error'} sx={{mb: 1}}
                            startIcon={<AutoDeleteIcon/>} onClick={() => clearChatHistory()}>
                        Clear Chat
                    </Button>
                </Box>
                <Box flexGrow={1} style={{height: '100%', overflowY: "auto"}}>
                    <ChatList data={chatList} showLoader={showLoader}/>
                </Box>

                <Box sx={{pt: 1}}>
                    <ChatInput onSendMessage={onSendMessage}/>
                </Box>
            </div>
        </>
    )
}
export default ChatComponent