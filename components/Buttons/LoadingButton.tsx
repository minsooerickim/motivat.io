interface LoadingButtonProps {
  text: string
}

export default function LoadingButton({ text }: LoadingButtonProps) {
  return <button className="btn loading btn-accent">{text}</button>
}
