import JoditEditor from "jodit-react";
import { useMemo, useRef } from "react";
import "./JoditEditor.css";

const Jodit = ({ setPostText }) => {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
    }),
    []
  );
  return (
    <JoditEditor
      ref={editor}
      config={config}
      onChange={(content) => setPostText(content)}
    />
  );
};

export default Jodit;
