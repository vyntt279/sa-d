import { useEffect, useState, memo } from 'react';
import { Button, Space, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import "./navbar.css"

const Navbar = () => {
  const email = localStorage.getItem('email')
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const auth = document.getElementById('authentication')
    const user = document.getElementById('user-info')
    const history = document.getElementById('history')
    const role = localStorage.getItem('role')
    if (auth != null && user != null) {
      if (role != null) {
        auth.classList.add('invisible')
        user.classList.remove('invisible')
        if (role !== 'user' && history != null) {
          history.classList.add('invisible')
        }
      } else {
        auth.classList.remove('invisible')
        user.classList.add('invisible')
      }
    }
  }, [])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('authorization')
    window.location.reload()
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <a className="logo no-underline text-white" href="/">lamabooking</a>
        <div className="navItems">
          <Space>
            <div id="authentication">
              <Button className='signup' href="/signup" type="primary"> Register </Button>
              <Button className='login' href="/login" type="primary"> Log In </Button>
            </div>
            <div id="user-info">
              <Popover
                content={
                  <Space direction='vertical'>
                    <Button className='button text-lg m-2' id='history' href='/bookings'>History</Button>
                    <Button className='button text-lg m-2' type='primary' onClick={handleLogOut}>Log out</Button>
                  </Space>
                }
                title={email != null ? email : 'Unknown'}
                trigger="hover"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <Button shape='circle' icon={<UserOutlined />} />
              </Popover>
            </div>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default memo(Navbar);