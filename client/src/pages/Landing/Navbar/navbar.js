import React, {useState, useEffect} from 'react'
import './navbar.css'
import logo from './../../../assets/logo_landing.png'
export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)


  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    return () => {
        window.removeEventListener('resize', changeWidth)
    }

  }, [])

  return (
    <nav className='font-antiga'>
        <div className='nav-item'>
            <img src={logo} width={'100px'}/> 
            <span>REVELS' 22</span>
        </div>
      {(toggleMenu || screenWidth > 500) && (
      <ul className="list">
        <li className="items">Login</li>
        <li className="items">Events</li>
        <li className="items">Tshirts</li>
        <li className="items">Schedule</li>
        </ul>
      )}

      <button onClick={toggleNav} className="btn">
          | | |
          </button>
    </nav>
  )
}