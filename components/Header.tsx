import { ThemeButton } from "./ThemeButton";
import { TITLE } from '@/utility/index'

export default function Header() {
  return (
    <div className="py-4">
      <h1 className="text-3xl">{TITLE}</h1>
      <ThemeButton/>
    </div>
  )
}
