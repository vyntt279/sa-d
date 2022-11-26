import { Avatar, List } from 'antd';

const data = [
  {
    title: 'Booking 1',
    subtitle: 'abc'
  },
  {
    title: 'Booking 2',
    subtitle: 'abc'
  },
  {
    title: 'Booking 3',
    subtitle: 'abc'
  },
  {
    title: 'Booking 4',
    subtitle: 'abc'
  },
];

const BookList = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<a href="https://ant.design">{item.title}</a>}
            description={item.subtitle}
          />
        </List.Item>
      )}
    />
  )
}

export default BookList;