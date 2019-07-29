import React from 'react';
import axios from 'axios';
import constants from '../constants';

import { Card, Button } from 'antd';
import CustomForm from '../components/Form';

class ArticleDetail extends React.Component {
    state = {
        articleID: this.props.match.params.articleID,
        article: {}
    };

    componentDidMount() {
        axios
            .get(`${constants.apiURL + this.state.articleID}`)
            .then(res => {
                this.setState({
                    article: res.data
                });
            })
            .catch(err => console.log(err));
    }

    handleDelete = e => {
        axios.delete(`${constants.apiURL + this.state.articleID}`);
    };

    render() {
        const { title, content } = this.state.article;
        return (
            <div>
                <Card title={title}>
                    <p>{content}</p>
                </Card>
                <CustomForm
                    requestType='put'
                    articleID={this.state.articleID}
                    btnText='Update'
                />
                <form onSubmit={this.handleDelete}>
                    <Button type='danger' htmlType='submit'>
                        Delete
                    </Button>
                </form>
            </div>
        );
    }
}

export default ArticleDetail;
