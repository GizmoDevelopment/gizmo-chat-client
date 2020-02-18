"use strict";

// Modules //
const socket = io.connect("http://localhost:3000", { transports: ["websocket"] });

// Storage //
var friendsList = {};

// Currents //
var currentConversation;

$(document).ready($ => {

    socket.emit("auth", { userKey: "a" });

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

                break;
            default:
                break;
        }
    });

    /*
        $("#sideBar").on("click", ".sideBarUser", e => {
            closeConversation();
            openConversation(e.target.id);
        });

        $("#sideBar").on("mouseenter", ".sideBarUser", e => {
            createTooltip(e.target, "right", e.target.id);
        });

        $("#sideBar").on("mouseleave", ".sideBarUser", e => {
            removeTooltip(e.target);
        });
    */

    $("#sideBar").on("click", "#friendsButton", e => {
        $("#friendsList").css("visible") ? $("#friendsList").hide() : $("#friendsList").show();
    });

});
