import React from "react";
import remarkGfm from "remark-gfm";
import { remark } from "remark";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";

export const MarkdownRenderer: React.FC<{ markdownContent: string }> = ({
  markdownContent,
}) => {
  const renderAst = remark()
    .use(remarkGfm)
    .use(remark2rehype)
    .use(rehype2react, {
      createElement: React.createElement,
      components: {
        h1: ({ children }: any) => (
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            {children}
          </h1>
        ),
        h2: ({ children }: any) => (
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            {children}
          </h2>
        ),
        h3: ({ children }: any) => (
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            {children}
          </h3>
        ),
        p: ({ children }: any) => (
          <p style={{ marginBottom: "1rem", lineHeight: "1.6rem" }}>
            {children}
          </p>
        ),
        ul: ({ children }: any) => (
          <ul style={{ paddingLeft: "2rem", marginBottom: "1rem" }}>
            {children}
          </ul>
        ),
        ol: ({ children }: any) => (
          <ol style={{ paddingLeft: "2rem", marginBottom: "1rem" }}>
            {children}
          </ol>
        ),
      },
    })
    .processSync(markdownContent).result;

  return <div>{renderAst}</div>;
};
