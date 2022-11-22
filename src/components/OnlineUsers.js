import React from "react";
const OnlineUsers = (props) => {
  const { onUserSelect, users, username, checkUnseenMessages } = props;
  console.log("checkUnseenMessages", username);
  return (
    <div>
      <div className="online-users-header">
        <div style={{ margin: "0 10px" }}>Online Users</div>
      </div>
      <ul className="users-list col-sm-4">
        {users &&
          Object.keys(users).map((user, i) => (
            <>
              {user !== username ? (
                // <li key={i} onClick={() => onUserSelect(user)}>
                //   <span style={{ textTransform: "capitalize" }}>{user}</span>
                //   {checkUnseenMessages(user) !== 0 ? (
                //     <span className="new-message-count">
                //       {checkUnseenMessages(user)}
                //     </span>
                //   ) : null}
                // </li>
                <div key={i} onClick={() => onUserSelect(user)} style={{ paddingRight:"2rem" }}>
                  <div className="" style={{ width:"fit-content" }}>
                    <div className="item">
                      {checkUnseenMessages(user) !== 0 ? (
                        <span className="notify-badge">
                          {" "}
                          {checkUnseenMessages(user)}
                        </span>
                      ) : null}
                      <img
                        src={require(`../assets/avathar.webp`)}
                        style={{ width:"50px", height:"auto" }}
                        key={i}
                        className="avatarImage"
                      />
                      </div>
                    <div key={i} className="no" style={{ fontSize: "18px", textAlign: "center" }}>
                      {user}
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;
