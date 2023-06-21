import React from 'react';
import placeholder from '../assets/pp.jpg'
import reactLogo from '../assets/react.svg'
import moment from 'moment/moment';

const NewsCard = ({ article: { author :sourceName, urlToImage: articleHeaderImg, title: articleTitle, description: articleText, publishedAt: articlePubTime } }) => {
    
    const stopLongText = (text)=> {
        {
            return text.length > 100 ? `${text.substring(0, 100)}...` : text
        }
    }
    
    return (
        <div className="card">
            <div className="news-title-div">
                <span className="logo-text">{sourceName}</span>
            </div>
            <div className='news-img-div'>
                <img src={articleHeaderImg} alt="" />
            </div>
            <div className='news-time-div'>
                <small>{moment(articlePubTime).fromNow()}</small><br />
            </div>
            <h4>{articleTitle}</h4>
            <p className='news-card-desc'>
            {stopLongText(articleText)}
            </p>
        </div>
    );
}

export default NewsCard;