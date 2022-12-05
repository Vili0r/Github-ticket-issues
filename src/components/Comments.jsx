import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

const Comments = ({ number }) => {
  const {
    data: comments,
    isSuccess,
    isLoading,
  } = useQuery(['comments', number], getComments);

  function getComments() {
    return axios
      .get(
        `https://api.github.com/repos/facebook/create-react-app/issues/${number}/comments`
      )
      .then((res) => res.data);
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <div className="grid grid-cols-1">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-container">
              <a href={comment.user.html_url}>
                <img
                  src={comment.user.avatar_url}
                  alt="avatar"
                  className="avatar"
                />
              </a>
              <div className="comment">
                <div className="comment-heading">
                  <a href={comment.user.html_url}>{comment.user.login}</a>{' '}
                  commented {moment(comment.created_at).format('MMM DD, YYYY')}
                </div>
                <div className="comment-body markdown-body">
                  <ReactMarkdown children={comment.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
