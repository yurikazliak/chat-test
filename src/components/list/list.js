import React from 'react';
import { DateTime } from "luxon";

import listStyles from './list.module.scss';

const List = ({ messages }) => {
  return (
    <ul className={listStyles.list}>
      {messages.map((message, i) => {
        return (
          <li
            key={message.id}
            className={i === 0 ? listStyles.messageNew : listStyles.messageBlock}
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

export default List;