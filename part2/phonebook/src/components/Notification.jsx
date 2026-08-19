const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'orange',
        background: 'black',
        fontStyle: 'italic',
        padding: '1rem',
        borderRadius: '1rem',
        margin: '1rem 0',
        textAlign: 'center',
        fontSize: '1.2rem',
    };
    
    if (message === null) {
        return null;
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
};

export default Notification;
