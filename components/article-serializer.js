const constructParagraph = (paragraphBlock, index) => {
  const spans = [];
  paragraphBlock.content.map((paragraphContentBlock, idx) => {
    switch (paragraphContentBlock.nodeType) {
      case "text":
        spans.push(<span key={idx}>{paragraphContentBlock.value}</span>);
        break;
      case "hyperlink":
        spans.push(
          <span key={idx}>
            <a href={paragraphContentBlock.data.uri} target="_blank">
              {paragraphContentBlock.content[0].value}
            </a>
          </span>
        );
        break;
      default:
        console.log(
          "Unknown paragraph content block node type",
          paragraphContentBlock.nodeType
        );
    }
  });
  return <p key={index}>{spans}</p>;
};

const contentBlockToElement = (contentBlock, idx) => {
  switch (contentBlock.nodeType) {
    case "paragraph":
      return constructParagraph(contentBlock, idx);
    case "heading-2":
      return <h3 key={idx}>{contentBlock.content[0].value}</h3>;
    default:
      return null;
  }
};

export default function ArticleSerializer({ article }) {
  return <div>{article.fields.content.content.map(contentBlockToElement)}</div>;
}
