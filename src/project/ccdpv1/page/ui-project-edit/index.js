import BaseUi from "../base-ui";
import {Container, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {PlainTextPlugin} from "@lexical/react/LexicalPlainTextPlugin";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";

import {$getRoot, $getSelection} from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";

function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

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
        }
    }

    function onError(error) {
        console.error(error);
    }

    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
    };

    function onChange(editorState) {
        editorState.read(() => {
            // Read the contents of the EditorState here.
            const root = $getRoot();
            const selection = $getSelection();
            console.log(root, selection);
            // const htmlString = $generateHtmlFromNodes(root, null);
            // console.log('htmlString', htmlString);
        });
    }

    return(
        <>
            <BaseUi>
                <Container maxWidth={'xl'}>
                    <Typography sx={styles.title}>Edit Project</Typography>

                    <LexicalComposer initialConfig={initialConfig}>
                        <PlainTextPlugin
                            contentEditable={<ContentEditable />}
                            placeholder={<div>Enter some text...</div>}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <OnChangePlugin onChange={onChange} />
                        <HistoryPlugin />
                        <MyCustomAutoFocusPlugin />
                    </LexicalComposer>
                </Container>
            </BaseUi>
        </>
    )
}
export default UiProjectEdit