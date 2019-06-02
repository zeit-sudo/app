import Link from 'next/link'

export default function Index() {
  return (
    <div>
      {/* <h1>Hello Next.js 👋</h1>
      <Link href='/about'><a>About</a></Link> */}
      <h3>Enter a phone number to send a welcome message!</h3>
      <input type="tel" placeholder="14154154155"></input>
      <button>Send</button>
    </div>
  )
}