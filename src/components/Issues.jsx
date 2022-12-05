import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import IconOpen from './IconOpen';
import IconClosed from './IconClosed';
import moment from 'moment';

const Issues = () => {
  const [filter, setFilter] = useState('open');
  const {
    data: issues,
    isSuccess,
    isLoading,
  } = useQuery(['issues', filter], getIssues);

  const { isSuccess: isSuccessIssuesOpen, data: issuesOpen } = useQuery(
    'issuesOpen',
    getIssuesOpen
  );

  const { isSuccess: isSuccessIssuesClosed, data: issuesClosed } = useQuery(
    'issuesClosed',
    getIssuesClosed
  );

  function getIssues() {
    return axios
      .get(
        `https://api.github.com/repos/facebook/create-react-app/issues?per_page=10&state=${filter}`
      )
      .then((res) => res.data);
  }

  function getIssuesOpen() {
    return axios
      .get(
        `https://api.github.com/search/issues?q=repo:facebook/create-react-app+type:issue+state:open&per_page=1`
      )
      .then((res) => res.data);
  }

  function getIssuesClosed() {
    return axios
      .get(
        `https://api.github.com/search/issues?q=repo:facebook/create-react-app+type:issue+state:closed&per_page=1`
      )
      .then((res) => res.data);
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}

      {isSuccess && (
        <div className="container max-w-2xl mx-auto">
          <div className="issues-container">
            <div className="issues-heading">
              <Link to="">facebook / create-react-app</Link>
              <div className="open-closed-buttons">
                <button onClick={() => setFilter('open')}>
                  <IconOpen />
                  {isSuccessIssuesOpen && (
                    <span className={filter === 'open' ? 'font-bold' : ''}>
                      {issuesOpen.total_count} Open
                    </span>
                  )}
                </button>
                <button onClick={() => setFilter('closed')}>
                  <IconClosed />
                  {isSuccessIssuesClosed && (
                    <span className={filter === 'closed' ? 'font-bold' : ''}>
                      {issuesClosed.total_count} Closed
                    </span>
                  )}
                </button>
              </div>
            </div>
            <div className="issues-table">
              {issues.map((issue) => (
                <div key={issue.id} className="issues-entry">
                  <div className="issues-entry-title-container">
                    {issue.state === 'open' ? <IconOpen /> : <IconClosed />}
                    <div className="issues-title">
                      <Link to={`/issues/${issue.number}`}>{issue.title}</Link>
                      <div className="issues-title-details">
                        #{issue.number} opened{' '}
                        {moment(issue.created_at).format('MMM DD, YYYY')} by{' '}
                        {issue.user.login}
                      </div>
                    </div>
                  </div>
                  {issue.comments > 0 && (
                    <Link
                      to={`/issues/${issue.number}`}
                      className="comments-count-container"
                    >
                      <svg
                        className="octicon octicon-comment v-align-middle"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        height="16"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"
                        ></path>
                      </svg>
                      <div className="comments-count">{issue.comments}</div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Issues;
