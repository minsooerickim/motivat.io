interface ErrorButton {
  text: string
}
export default function ErrorButton({ text }: ErrorButton) {
  return <button className="btn btn-outline btn-secondary">{text}</button>
}
