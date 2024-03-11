import { Headers } from "../shared/types";

// Ignore h1 as it is title
const headerTags = ["h2","h3","h4","h5","h6","footer"].join(',');

const RESTRICTED_CLASSLISTS = ['pw-subtitle-paragraph'];


export const onOpenPopup = () => {
    const headers = document.querySelectorAll(headerTags);
    const headerDetails:Headers = [];

    if(headers && headers.length > 0){
        for(let header of headers){
            const {id,textContent,tagName,classList} = header;
            if(tagName.toLowerCase() === 'footer') break;
            if(id){
                const classListSet = new Set(classList);
                RESTRICTED_CLASSLISTS.forEach(cl => {
                    if(!classListSet.has(cl)){
                        headerDetails.push({id,textContent: (header as HTMLElement).innerText || textContent,tagName});
                    }
                })
            }
        }
    }
    
    return headerDetails;
}

export const onNavigateToHeader = (id:string) => {
    location.hash = id;
}

export const onGetClipboardHTML = (headers=[] as Headers) => {
    const root = document.createElement("div");
    
    headers.forEach(header => {
      const anchor = document.createElement("a");
      anchor.setAttribute("href",location.origin+location.pathname+`#${header.id}`);
      anchor.innerText = header.textContent as string;
      root.appendChild(anchor);
      root.appendChild(document.createElement("br"));
    })

    return root.innerHTML;
}