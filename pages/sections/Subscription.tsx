import ColorCheckboxes from '@/components/Checkbox'

export default function Subscription() {
  return (
    <div className="flex-col py-4">
      <div className="flex flex-col items-center">
        <h1 className="text-lg">Get Daily Quotes!</h1>
        <p className=" text-xs">we will not send any spam :)</p>
      </div>
      <ColorCheckboxes />
    </div>
  )
}
