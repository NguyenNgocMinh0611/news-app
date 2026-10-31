import type { ArticleContentBlock } from "@/types/article";
import ArticleImage from "./ArticleImage";

interface ArticleContentProps {
  content: ArticleContentBlock[];
}
export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="article-content">
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 className="article-content__heading" key={index}>
                {block.text}
              </h2>
            );
          case "image":
            return (
              <ArticleImage key={index} src={block.src} alt={block.alt} caption={block.caption}
                className="article-content__image"/>
            );
          case "paragraph":
            return (
              <p className="article-content__paragraph" key={index}>
                {block.text}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}