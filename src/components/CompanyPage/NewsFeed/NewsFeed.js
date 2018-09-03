import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import * as actions from '../../../actions/newsfeed';

import './style.scss';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar'
    };
  }

  componentDidMount() {
    const { fetchArticles, company } = this.props;
    // const query = company.name.toLowerCase();
    fetchArticles('amazon');
  }

  componentDidUpdate() {
    const { articles } = this.props;
    console.log('HERE ARE THE ARTICLES: ', articles);
  }

  render() {
    const { articles } = this.props;
    return (
      <div className="newsfeed">
        <h3>
          News
        </h3>

        <ul className="articles-list">
          {
            articles.map((article) => {
              return (
                <li className="article">
                  <div className="article-left">
                    <img src={article.urlToImage} />
                  </div>
                  <div className="article-right">
                    <span className="article-source">
                      { article.source.name }
                    </span>
                    <span className="article-published">
                      <Moment fromNow>
                         { article.publishedAt }
                      </Moment>
                    </span>

                    <h5 className="article-headline">
                      { article.title }
                    </h5>

                    <p className="article-preview">
                      { article.description }
                    </p>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.newsfeed.articles,
    loadingArticles: state.newsfeed.loadingArticles,
    error: state.newsfeed.error,
  };
};

export default connect(mapStateToProps, actions)(NewsFeed);
