import { Header, Headers } from "../shared/types";

export const onUpdateBookmark = async (header:Header):Promise<string|undefined> => {
    if(!header.bookmarkId){
        const bookmarkNode = await chrome.bookmarks.create({title:header.textContent || header.url,url:header.url});
        return bookmarkNode.id;    
    }else{
        await chrome.bookmarks.remove(header.bookmarkId);
    }
}

export const onSearchBookmark = async (headers:Headers): Promise<Headers> => {
    const bookmarkedHeaders:Headers = [];
    for(let header of headers){
        const bookmark = await chrome.bookmarks.search(header.url);
        bookmarkedHeaders.push({...header,bookmarkId: bookmark?.[0]?.id})
    }
    return bookmarkedHeaders;
}