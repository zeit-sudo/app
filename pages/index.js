import Link from 'next/link'

export default function Index() {
  function handleClick(e) {
    e.preventDefault();

    document.getElementById("phoneInput").disabled = true;
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("workingSpan").hidden = false;
  }

  return (
    <div>
      {/* <h1>Hello Next.js 👋</h1>
      <Link href='/about'><a>About</a></Link> */}
      <h3>Enter your phone number to receive a welcome message!</h3>

      <form
          method="post"
          action="/api/sendmessage.js">
        <input id="phoneInput" type="tel" placeholder="14154154155" name="phone"></input>
        <button id="submitBtn" type="submit" onClick="{handleClick}" name="submitBtn">Send</button>
        <span id="workingSpan" hidden>  Working...</span>
        </form>
    </div>
  )
}