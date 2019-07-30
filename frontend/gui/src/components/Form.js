import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import constants from '../constants';

class CustomForm extends React.Component {
    handleFormSubmit = (e, requestType, articleID) => {
        // e.preventDefault();
        const title = e.target.elements.title.value,
            content = e.target.elements.content.value;

        switch (requestType) {
            case 'post':
                axios
                    .post(constants.apiURL, {
                        title,
                        content
                    })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => console.log(err));
                break;
            case 'put':
                axios
                    .put(`${constants.apiURL + articleID}/`, {
                        title,
                        content
                    })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => console.log(err));
                break;
            default:
                return;
        }
    };

    render() {
        const { requestType, articleID, btnText } = this.props;
        return (
            <div>
                <Form
                    onSubmit={e =>
                        this.handleFormSubmit(e, requestType, articleID)
                    }
                >
                    <Form.Item label='Title'>
                        <Input name='title' placeholder='Put a title here' />
                    </Form.Item>
                    <Form.Item label='Content'>
                        <Input
                            name='content'
                            placeholder='Enter some content ...'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='primary'>
                            {btnText}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default CustomForm;
