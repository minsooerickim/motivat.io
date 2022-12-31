import Checkbox from '@/components/Checkbox'

export default function Subscription() {
  const HOOK = 'Subscribe to Get Daily Quotes!'
  const DESCRIPTION =
    'We will not send any spam or sell any of your information :)'
  const DESCRIPTION2 = 'You can cancel the subscription at any time at no cost!'

  return (
    <div className="flex-col py-4 items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-lg text-">{HOOK}</h1>
        <p className=" text-xs text-opacity-70 text-sub pt-1">{DESCRIPTION}</p>
        <p className=" text-xs text-opacity-70 text-sub pt-1">{DESCRIPTION2}</p>
      </div>
      <Checkbox />
    </div>
  )
}
