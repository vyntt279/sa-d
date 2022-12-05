import { Button } from "antd";

type PreviewBookingProps = {
  setFinishTab2: any,
  setActivateKey: any
}

const PreviewBooking = ({ setFinishTab2, setActivateKey }: PreviewBookingProps) => {
  const handleOnClick = () => {
    setFinishTab2(true)
    setActivateKey(3)
  }
  return <>
    <Button onClick={handleOnClick} type='primary'>

    </Button>
  </>
}

export default PreviewBooking;