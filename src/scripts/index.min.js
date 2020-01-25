const socket = io.connect("http://localhost:3000", { transports: ["websocket"] });

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

                break;
            default:
                break;
        }
    });

});
