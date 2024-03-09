export type Headers = Pick<Element,"id"|"textContent"|"tagName">[]

export enum MessageTypes{
    OPEN_POPUP = "OPEN_POPUP",
    NAVIGATE_TO_HEADER="NAVIGATE_TO_HEADER",
    GET_CLIPBOARD_HTML="GET_CLIPBOARD_HTML"
}

export type Message = {
    type: MessageTypes,
    body?:Record<string,unknown>
}
