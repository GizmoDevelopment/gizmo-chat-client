"use strict";
require("dotenv").config({ path: path.join(__core, ".env") }); // Throw out before release

// Modules //
const socket = io.connect("http://localhost:3000", { transports: ["websocket"] });

// Storage //
var userData = {};
var friendsList = new Map();

function resolveId (id) {
    return id.match(/friendsListUser-(.*)/)[1];
}

function loadFriendsList () {
    socket.emit("data", { type: "user:fetchFriendsList" }, data => {
        if (typeof data === "object") {

            $("#friendsList").empty();

            for (var key in data) {
                if (typeof data[key] === "object") {

                    friendsList.set(key, data[key]);

                    $("#friendsList").append(`
                        <div id = "friendsListUser-${data[key].user_id}" class = "friendsListUser">
                            <img src = "https://www.gizmo.moe/uploads/avatars/${data[key].user_avatar}" draggable = false>
                            <span class = "friendUsername">${data[key].user_uid}</span>
                            <!--<div class = "friendControlButtons">
                                <div class = "button">X</div>
                            </div>-->
                        </div>
                    `);
                }
            }
        }
    });
}

function launchConversation (id) {
    socket.emit("data", { type: "user:requestRoom", users: [userData.id, id] }, data => {
        console.log(data);
    });
}

$(document).ready($ => {

    socket.emit("auth", { userKey: process.env.USER_KEY }); // Throw out before release

    socket.on("response", res => {

        console.log(res);

        if (res.status && res.data) {
            userData = res.data;
            loadFriendsList();
        } else {
            console.error("Didn't receive a proper authentication response");
        }
    });

    socket.on("data", (type, data) => {
        switch (type) {
            default:
                break;
        }
    });

    $("#friendsList").on("click", ".friendsListUser", function () {
        launchConversation(resolveId($(this).attr("id")));
    });

});
