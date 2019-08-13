import React from 'react';
import { DateTime } from "luxon";
import { connect } from 'react-redux';

import listStyles from './list.module.scss';

const List = ({ messages }) => {
  console.log('messages', messages)
  return (
    <ul className={listStyles.list}>
      {messages.sort((a, b) => {
        return a.time < b.time ? -1 : 1;
      }).map((message, i) => {
        return (
          <li
            key={message.id}
            className={i === messages.length - 1 ? listStyles.messageNew : listStyles.messageBlock}
          >
            <div className={listStyles.from}>
              {message.from}
            </div>
            <span className={listStyles.time}>
              <>
                {DateTime.fromMillis(message.time).c.year}-
              {DateTime.fromMillis(message.time).c.month}-
              {DateTime.fromMillis(message.time).c.day}
                {'   '}
                {DateTime.fromMillis(message.time).c.hour}-
              {DateTime.fromMillis(message.time).c.minute}-
              {DateTime.fromMillis(message.time).c.second}
              </>
            </span>
            <div className={listStyles.text}>
              {message.message}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

const mapStateProps = (state) => {
  return {
    // messages: state.connection.messages,
    messages: state.messages,
  }
};

export default connect(mapStateProps)(List);