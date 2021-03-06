import React from 'react'

const Notification = ({showNotification}) => {
    return (
        <div class={`notification-container ${showNotification ? 'show' : ''}`}>
        <p>You have already entered this letter</p>
      </div>
    )
}

export default Notification
