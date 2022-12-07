import { useState } from 'react';
import hotel from 'assets/hotel.jpg'

import "./featured.css";
import { Space } from 'antd';
const contentStyle: React.CSSProperties = {
  height: '400px',
  color: '#fff',
  lineHeight: '250px',
  textAlign: 'center',
  backgroundImage: `url(${hotel})`,
  backgroundSize: 'cover',
  backgroundPositionY: "50%",
};

type WelcomeCardProps = {
  title: string,
  subtitle: string
}

const WelcomeCard = ({ title, subtitle }: WelcomeCardProps) => {

  return (
    <div className="w-full">
      <div className='text-7xl comforta font-black tracking-widest' style={contentStyle}>
        {title}
      </div>
    </div>
  )
}

export default WelcomeCard;