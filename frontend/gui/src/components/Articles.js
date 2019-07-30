import React from 'react';
import { List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

function Articles(props) {
    return (
        <div>
            <List
                itemLayout='vertical'
                size='large'
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3
                }}
                dataSource={props.data}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText type='star-o' text='156' />,
                            <IconText type='like-o' text='156' />,
                            <IconText type='message' text='2' />
                        ]}
                        extra={
                            <img
                                width={272}
                                alt='logo'
                                src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={
                                        item.avatar ||
                                        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                    }
                                />
                            }
                            title={
                                <Link to={`/articles/${item.id}`}>
                                    {item.title}
                                </Link>
                            }
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Articles;
