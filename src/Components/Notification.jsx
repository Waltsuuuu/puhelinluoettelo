const Notification = ({ message, type }) => {


    if (message === null) {
      return null
    }
    
    const notificationClass = type === 'success' ? 'success' : 'error';


    return (
      <div className={`notification ${notificationClass}`}>
        {message}
      </div>
    )
  }

export default Notification