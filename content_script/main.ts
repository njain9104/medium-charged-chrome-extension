import { Headers, Message, MessageTypes } from "../shared/types";

// Ignore h1 as it is title
const headerTags = ["h2","h3","h4","h5","h6"].map(h => `${h}[data-selectable-paragraph]`).join(',')

const registerEventListeners = () => {
    chrome.runtime.onMessage.addListener((message:Message,_sender,sendResponse) => {
        switch(message.type){
            case MessageTypes.OPEN_POPUP:{
                const headers = document.querySelectorAll(headerTags);
                if(headers && headers.length > 0){
                    const headerDetails:Headers = [];
                    headers.forEach(({id,textContent,tagName,classList}) => {
                        // Filter out subtitle
                        if(!classList.contains("pw-subtitle-paragraph")){
                            headerDetails.push({id,textContent,tagName})
                        }
                    })
                    sendResponse({headers:headerDetails})
                }    
            }
            break;
            case MessageTypes.NAVIGATE_TO_HEADER:{
                location.hash = message.body?.id as string
            }
            break;
            case MessageTypes.GET_CLIPBOARD_HTML:{
                if(message.body?.headers){
                    const headers = message.body.headers as Headers
                    const root = document.createElement("div");
                    headers.forEach(header => {
                      const anchor = document.createElement("a");
                      anchor.setAttribute("href",location.origin+location.pathname+`#${header.id}`);
                      anchor.innerText = header.textContent as string;
                      root.appendChild(anchor);
                      root.appendChild(document.createElement("br"));
                    })
                    sendResponse({html:root.innerHTML})
                } 
                break;         
            }
        }
    })
}

// Called from dynamic import
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(() => {
    registerEventListeners();
})();