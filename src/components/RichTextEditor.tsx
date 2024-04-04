"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// we have to import the Editor from wysiwyg lib with dynamic so that our server doens't try to render this compoennt. cuz this component uses the window object which doesn't exist on the server.
// note: dynamic import only runs on the client!

// we also have to chain the import below with a then cuz the Editor that we're trying to import is not the default export. nice...
const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((module) => module.Editor),
    { ssr: false },
);

// The type of te DOM node in the first argument of the generic is Object. cuz it is the type that we get provided by the WhatYouSeeIsWhatYouGet library lol

const RichTextEditor = forwardRef<Object, EditorProps>((props, ref) => {
    return (
        <Editor
            editorClassName={cn(
                "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                props.editorClassName,
            )}
            toolbar={{
                options: ["inline", "list", "link", "history"],
                inline: {
                    options: ["bold", "italic", "underline"],
                },
            }}
            editorRef={(r) => {
                // basically, the ref from the forwardRef above can be either a function or an object.
                // if it is a function, we have to call it..
                if (typeof ref === "function") {
                    ref(r);
                } else if (ref) {
                    ref.current = r;
                }
            }}
            {...props}
        />
    );
});
RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
