export default function Hero() {
  return (
    <div className="hero bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Quote of the Day</h1>
          <p className="pt-6">
            New quote will appear every 24 hours at 12 PM PST!
          </p>
          <p className="pb-6">
            Subscribe to receive daily quotes via email and/or text
          </p>
          <button className="btn btn-accent">Get Started</button>
        </div>
      </div>
    </div>
  )
}
