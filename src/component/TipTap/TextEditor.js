import {
    LinkBubbleMenu,
    RichTextEditor,
} from "mui-tiptap";
import EditorControl from "./EditorControl";
import editorExtension from "./EditorExtension";

const TextEditor = (props) => {
        return (
        <>
            <RichTextEditor
                ref={props.refId}
                extensions={editorExtension()}
                renderControls={() => <EditorControl/>}>
                {() => (
                    <>
                        <LinkBubbleMenu/>
                    </>
                )}
            </RichTextEditor>
        </>
    )
}
export default TextEditor