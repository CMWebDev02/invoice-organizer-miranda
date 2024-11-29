export function NavBar({ children, PageName }) {
    return (
      <nav>
        <h1>{PageName}</h1>
        {children}
        <button>Menu</button>
      </nav>
    )
}