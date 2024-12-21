export function NavBar({ children, pageName }) {
    return (
      <nav>
        <h1>{pageName}</h1>
        {children}
        <button>Menu</button>
      </nav>
    )
}