import { TITLE } from '@/utility/index'

export default function Header() {
  return (
    <div className="flex flex-row justify-center items-center py-4 space-x-4">
      <h1 className="text-3xl">{TITLE}</h1>
      {/* <span>
        <ThemeButton/>
      </span> */}
    </div>
  )
}
