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
          paragraphContentBlock.nodeType,
        );
    }
  });
  return <p key={index}>{spans}</p>;
};

const contentBlockToElement = (contentBlock, idx, article) => {
  switch (contentBlock.nodeType) {
    case "paragraph":
      return constructParagraph(contentBlock, idx);
    case "heading-2":
      return <h3 key={idx}>{contentBlock.content[0].value}</h3>;
    case "embedded-asset-block":
      return <img src={article.images[contentBlock.data.target.sys.id]} />
    default:
      console.log("Unknown block type", contentBlock)
      return null;
  }
};

export default function ArticleSerializer({ article }) {
  return (
    <>
      {article && (
        <div>{article.fields.content.content.map((contentBlock, idx) => contentBlockToElement(contentBlock, idx, article))}</div>
      )}
    </>
  );
}
