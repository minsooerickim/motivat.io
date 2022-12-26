import ColorCheckboxes from '@/components/Checkbox'

export default function Subscription() {
  const HOOK = 'Get Daily Quotes!'
  const DESCRIPTION = 'we will not send any spam :)'

  return (
    <div className="flex-col py-4">
      <div className="flex flex-col items-center">
        <h1 className="text-lg text-">{HOOK}</h1>
        <p className=" text-xs text-opacity-70 text-sub">{DESCRIPTION}</p>
      </div>
      <ColorCheckboxes />
    </div>
  )
}
