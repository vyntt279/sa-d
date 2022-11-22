import { Button, Space } from 'antd'

import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">lamabooking</span>
        <div className="navItems">
          <Space>
            <Button href="/signup" type="primary"> Register </Button>
            <Button href="/login" type="primary"> Log In </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default Navbar