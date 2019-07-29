import React from 'react';
import axios from 'axios';
import constants from '../constants';

import Articles from '../components/Articles';
import CustomForm from '../components/Form';

class ArticleList extends React.Component {
    state = {
        articles: []
    };

    fetchArticles = () => {
        axios.get(constants.apiURL).then(res => {
            this.setState({
                articles: res.data
            });
        });
    };

    componentDidMount() {
        this.fetchArticles();
    }

    render() {
        return (
            <div>
                <Articles data={this.state.articles} />
                <br />
                <h2>Create an article</h2>
                <CustomForm requestType='post' btnText='Create' />
            </div>
        );
    }
}

export default ArticleList;
