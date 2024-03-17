export type Header = Pick<Element,"id"|"textContent"|"tagName"> & {
    url: string;
    bookmarkId?:string
}

export type Headers = Array<Header>

export enum MessageTypes{
    OPEN_POPUP = "OPEN_POPUP",
    NAVIGATE_TO_HEADER="NAVIGATE_TO_HEADER",
    GET_CLIPBOARD_HTML="GET_CLIPBOARD_HTML",
    SEARCH_BOOKMARK = "SEARCH_BOOKMARK",
    UPDATE_BOOKMARK = 'UPDATE_BOOKMARK'
}

export type Message = {
    type: MessageTypes,
    body?:Record<string,unknown>
}
