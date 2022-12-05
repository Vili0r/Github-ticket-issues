import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import moment from 'moment';
import Comments from './Comments';
import ReactMarkdown from 'react-markdown';

const Details = () => {
  const params = useParams();
  const {
    data: issue,
    isSuccess,
    isLoading,
  } = useQuery(['issue', params.id], getIssue);

  function getIssue() {
    return axios
      .get(
        `https://api.github.com/repos/facebook/create-react-app/issues/${params.id}`
      )
      .then((res) => res.data);
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <div className="comments-container m-10">
          <h2>
            {issue.title} <span>#{issue.number}</span>
          </h2>
          <div className="issue-details">
            <Link to="">{issue.user.login}</Link> opened this issue{' '}
            {moment(issue.created_at).format('MMM DD, YYYY')}
          </div>
          <div className="grid grid-cols-1 mt-5 gap-10">
            <div className="flex">
              <Link to="">
                <img
                  src={issue.user.avatar_url}
                  alt="avatar"
                  className="avatar"
                />
              </Link>
              <div className="comment">
                <div className="comment-heading">
                  <Link to="">mdaj06</Link> commented{' '}
                  {moment(issue.created_at).format('MMM DD, YYYY')}
                </div>
                <div className="comment-body markdown-body">
                  <ReactMarkdown children={issue.body} />
                </div>
              </div>
              <div className="border"></div>
            </div>

            <Comments number={issue.number} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
