import React from 'react';
import { DateTime } from "luxon";
import { connect } from 'react-redux';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

import listStyles from './list.module.scss';

const List = (props) => {
  const { messages, user } = props;
  const ROOT_CSS = css({
    height: '100%',
    width: '100%'
  });

  const ulrRegExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regexp = new RegExp(ulrRegExp);

  return (
    <ul className={listStyles.list}>
      <ScrollToBottom className={ROOT_CSS}>
        {messages
          .sort((a, b) => {
            return a.time < b.time ? -1 : 1;
          })
          .map((message) => {
            return (
              <li
                key={message.id}
                className={message.from === user ? listStyles.messageNew : listStyles.messageBlock}
              >
                <div className={listStyles.from}>
                  {message.from}
                </div>
                <div className={listStyles.text}>

                  {message.message.match(regexp) ? (
                    <>{message.message.slice(0, message.message.indexOf(message.message.match(regexp)[0]))}
                      <a href={message.message.match(regexp)[0]} target='_blank' rel="noopener noreferrer">{
                        message.message.match(regexp)[0]
                      }</a>
                      {message.message.slice(message.message.indexOf(message.message.match(regexp)[0]) + message.message.match(regexp)[0].length)}
                    </>
                  ) : (
                      <>{message.message}</>
                    )
                  }

                </div>
                <span className={listStyles.time}>
                  <>
                    {DateTime.fromMillis(message.time).c.year}.
              {DateTime.fromMillis(message.time).c.month}.
              {DateTime.fromMillis(message.time).c.day}
                    {'   '}
                    {DateTime.fromMillis(message.time).c.hour}:
              {DateTime.fromMillis(message.time).c.minute}:
              {DateTime.fromMillis(message.time).c.second}
                  </>
                </span>
              </li>
            )
          })}
      </ScrollToBottom>
    </ul>
  )
}

const mapStateProps = (state) => {
  return {
    messages: state.messages.messages,
    user: state.user,
  }
};

export default connect(mapStateProps)(List);