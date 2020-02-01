// Modules //
const socket = io.connect("http://localhost:3000", { transports: ["websocket"] });

// Storage //
var friendsList = {};

// Currents //
var currentConversation;

$(document).ready($ => {

    socket.emit("auth", { userKey: "bruh" });

    socket.on("response", res => {

        console.log(res);

        if (res.status) {
            socket.emit("data", "user:fetchFriendsList");
        }
    });

    socket.on("data", (type, data) => {
        switch (type) {
            case "friendsList":

                console.log(data);
                friendsList = data;

                for (let key in data) {
                    if (typeof data[key] == "object") {
                        $("#sideBar").append(`
                            <div id = "sideBarUser-${data[key].user_id}" class = "sideBarUser">
                                <img src = "https://www.gizmo.moe/uploads/avatars/${data[key].user_avatar}" draggable = false>
                            </div>
                        `);
                    }
                }

                break;
            default:
                break;
        }
    });

    $("#sideBar").on("click", ".sideBarUser", e => {
        closeConversation();
        openConversation(e.target.id);
    });

});
