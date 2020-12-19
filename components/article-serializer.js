import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

import styled from "styled-components";

const ScaledImg = styled.img`
  width: 100%;
  margin: 0 0 8px 0;
`;

const constructParagraph = (paragraphBlock) => {
  const spans = [];
  paragraphBlock.content.map((paragraphContentBlock, idx) => {
    switch (paragraphContentBlock.nodeType) {
      case "text":
        spans.push(
          <Typography display="inline" key={idx}>
            {paragraphContentBlock.value}
          </Typography>
        );
        break;
      case "hyperlink":
        spans.push(
          <Typography display="inline" key={idx}>
            <a href={paragraphContentBlock.data.uri} target="_blank">
              {paragraphContentBlock.content[0].value}
            </a>
          </Typography>
        );
        break;
      default:
        console.log(
          "Unknown paragraph content block node type",
          paragraphContentBlock.nodeType
        );
    }
  });
  return spans;
};

const contentBlockToElement = (contentBlock, idx, article) => {
  switch (contentBlock.nodeType) {
    case "paragraph":
      return (
        <div style={{ marginBottom: "8px" }} key={idx}>
          {constructParagraph(contentBlock)}
        </div>
      );
    case "heading-2":
      return <Typography variant="h3" key={idx}>{contentBlock.content[0].value}</Typography>;
    case "embedded-asset-block":
      return (
        <div key={idx} style={{ width: "100%" }}>
          <ScaledImg src={article.images[contentBlock.data.target.sys.id]} />
        </div>
      );
    default:
      console.log("Unknown block type", contentBlock);
      return null;
  }
};

export default function ArticleSerializer({ article }) {
  return (
    <>
      {article && (
        <div>
          {article.fields.content.content.map((contentBlock, idx) =>
            contentBlockToElement(contentBlock, idx, article)
          )}
        </div>
      )}
    </>
  );
}
