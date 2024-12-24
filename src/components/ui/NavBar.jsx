import { convertToTitle } from "../../utilities/stringMutations"

export function NavBar({ children, pageName }) {
  let displayName = convertToTitle(pageName)

  return (
    <nav>
      <h1>{displayName}</h1>
      {children}
      <button>Menu</button>
    </nav>
  )
}