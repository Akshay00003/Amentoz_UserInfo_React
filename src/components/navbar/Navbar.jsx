import React from 'react'
import style from './Navbar.module.scss'

const Navbar = () => {
  return (
    <nav className={style.container}>
<ul>
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
</ul>
    </nav>
  )
}

export default Navbar
