import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../../chats.css"

const UserChatComponent = () => {
  return (
    <div>
      <input type="checkbox" id='check' />
      <label htmlFor="check" className='chat-btn'>
        <i className="bi bi-chat-dots-fill comment"></i>
        <i className="bi bi-x-circle close"></i>
        <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle">
          <span className="visually-hidden">New alerts</span>
        </span>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h5>Let's chat - online</h5>
        </div>
        <div className="chat-form" >
          <div className="chat-msg">

            {
              Array.from({ length: 20 }).map((_, id) => (
                <div key={id}>
                  <li className="message-left">
                    <p className="message">
                      Hey Lets Start the chat
                      <span> Mimi ⚪ 26 july 10:40</span>
                    </p>
                  </li>
                  <li className="message-right bg-primary">
                    <p className="message">
                      Yeah Sure!
                      <span>Aaliya ⚪ 26 july 10:40</span>
                    </p>
                  </li>
                  <li className="message-feedback">
                    <p className="feedback" id="feedback">
                    </p>
                  </li>
                </div>
              ))}
          </div>
        </div >
        <div className="message-form">
          <textarea
            id="clientChatMsg"
            className='form-control'
            placeholder='Type Your Message..'>
          </textarea>
          <button type="submit" className="send-button">send <span><i className="fa-solid fa-paper-plane"></i></span></button>
        </div>


      </div>
    </div >
  )
}

export default UserChatComponent
