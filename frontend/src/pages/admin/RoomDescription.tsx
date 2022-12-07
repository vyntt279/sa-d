import { ReactNode, useState, memo } from 'react';
import { Button, Popover } from 'antd';

const RoomDescription = ({description}: any) => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={description}
      title="Description"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary">Detail</Button>
    </Popover>
  );
};

export default memo(RoomDescription);