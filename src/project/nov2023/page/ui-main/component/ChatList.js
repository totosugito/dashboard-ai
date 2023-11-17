import {useTheme} from "@mui/material/styles";
import {createRef, useEffect} from "react";
import ChatItem from "./ChatItem";
import LoadingIndicator from "./LoadingIndicator";

const ChatList = (props) => {
    const theme = useTheme()
    const styles = {
        messagesBody: {
            width: "calc(100% - 10px)"
        }
    }

    const messagesEndRef = createRef()
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [props.data])

    return (
        <>
            <div style={styles.messagesBody}>
                {props.data &&
                    props.data.map((msg) => (
                        <ChatItem key={msg.id} data={msg}/>))
                }
                {props.showLoader &&
                    <LoadingIndicator/>
                }
                <div ref={messagesEndRef}/>
            </div>
        </>
    );
}
export default ChatList