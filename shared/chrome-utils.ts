import { Message } from "./types";

export const sendMessageFromActiveTab =async<T>(message:Message): Promise<T|undefined> => {
    const [tab] = await chrome.tabs.query({active:true,lastFocusedWindow:true});
    if(tab.id){
        const response = await chrome.tabs.sendMessage(tab.id,message);
        return response
    }
}