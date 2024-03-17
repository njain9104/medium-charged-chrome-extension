export const prepareUrl = (id:string) => {
    return location.origin+location.pathname+`#${id}`
}
