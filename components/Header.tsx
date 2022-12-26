import { ThemeButton } from "./ThemeButton";

export default function Header() {
  const title = "Motivat.io"
  return (
    <div className="py-4">
      <h1 className="text-3xl">{title}</h1>
      <ThemeButton/>
    </div>
  )
}
