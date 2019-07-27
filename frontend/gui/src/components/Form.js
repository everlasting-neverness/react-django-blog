import React from 'react';
import { Form, Input, Button } from 'antd';

class CustomForm extends React.Component {

    handleFormSubmit = e => {
        e.preventDefault();
        const title = e.target.elements.title.value,
            content = e.target.elements.content.value;
        
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Item label='Title'>
                        <Input name='title' placeholder='Put a title here' />
                    </Form.Item>
                    <Form.Item label='Content'>
                        <Input name='content' placeholder='Enter some content ...' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary'>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default CustomForm;
