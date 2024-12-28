import { convertFromSpinalTap } from "../../utilities/stringMutations"

export function NavBar({ children, pageName }) {
  let displayName = convertFromSpinalTap(pageName)

  return (
    <nav>
      <h1>{displayName}</h1>
      {children}
    </nav>
  )
}