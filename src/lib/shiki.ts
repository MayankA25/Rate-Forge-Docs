import { createHighlighter } from "shiki";



export async function highlightCode(code: string, language: string){

    const highlighter = await createHighlighter({
        themes:["vitesse-dark"],
        langs: [
            "ts",
            "tsx",
            "js",
            "jsx",
            "bash",
            "json",
            "diff"
        ]
    })

    return highlighter.codeToHtml(code, {
        lang: language,
        theme: "vitesse-dark"
    })
}