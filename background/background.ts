import { Header, Headers, Message, MessageTypes } from "../shared/types";
import { onSearchBookmark, onUpdateBookmark } from "./onMessageHandlers";

const registerEventListeners = () => {
    chrome.runtime.onMessage.addListener((message:Message,_sender,sendResponse) => {
        switch(message.type){
            case MessageTypes.UPDATE_BOOKMARK:{
                onUpdateBookmark(message.body?.header as Header).then(bookmarkId => {
                    sendResponse({bookmarkId})
                })
                return true;
            }
            case MessageTypes.SEARCH_BOOKMARK:{
                onSearchBookmark(message.body?.headers as Headers).then(headers => {
                    sendResponse({headers})
                });
                return true;
            }
            default:
                return false;
        }
    })
}

(() => {
    registerEventListeners();
})();