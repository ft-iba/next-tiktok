export function convertNewlineToBr(text: string): React.ReactNode {
  return text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}