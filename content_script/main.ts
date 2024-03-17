import { Headers, Message, MessageTypes } from "../shared/types";
import { onGetClipboardHTML, onNavigateToHeader, onOpenPopup } from "./onMessageHandlers";

const registerEventListeners = () => {
    chrome.runtime.onMessage.addListener((message:Message,_sender,sendResponse) => {
        switch(message.type){
            case MessageTypes.OPEN_POPUP:{
                onOpenPopup().then(headers => {
                    sendResponse({headers})
                });
                return true;
            }
            case MessageTypes.NAVIGATE_TO_HEADER:
                onNavigateToHeader(message.body?.id as string);
                return true;
            case MessageTypes.GET_CLIPBOARD_HTML:{
                const html = onGetClipboardHTML(message.body?.headers as Headers);
                sendResponse({html})
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