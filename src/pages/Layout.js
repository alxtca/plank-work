import { Outlet, Link } from "react-router-dom";
//The <Outlet> renders the current route selected.

//This file is like basic layout that I extends 'Layout'

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/rules">Rules</Link>
          </li>
          <li>
            <Link to="/setup">Setup</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <small>&copy; alxtca</small>
    </>
  )
};

export default Layout;