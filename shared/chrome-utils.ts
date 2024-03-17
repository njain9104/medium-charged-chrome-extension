import { Message } from "./types";

export const sendMessageToContent =async<T=void>(message:Message): Promise<T|undefined> => {
    const [tab] = await chrome.tabs.query({active:true,lastFocusedWindow:true});
    if(tab.id){
        const response = await chrome.tabs.sendMessage(tab.id,message);
        return response
    }
}

export const sendMessageToBackground = async<T=void>(message:Message): Promise<T> => {
    const response = await chrome.runtime.sendMessage(message);
    return response;
}