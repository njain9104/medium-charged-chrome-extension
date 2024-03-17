import { FC, useState } from "react";
import { sendMessageToContent } from "../../shared/chrome-utils";
import { Headers, MessageTypes } from "../../shared/types";


const CopyToClipboard:FC<{headers:Headers}> = ({headers}) => {
    const [copied,setCopied] = useState(false);

    const onCopyToClipboard = async () => {
        const response = await sendMessageToContent<{html:string}>({type:MessageTypes.GET_CLIPBOARD_HTML,body:{headers}});
  
        if(navigator.clipboard && response?.html){
          const type = 'text/html'
          navigator.clipboard.write([new ClipboardItem({
            [type]: new Blob([response.html], {type})
          })]).then(() => {
            setCopied(true);
            setInterval(() => {
                setCopied(false);
            },1000)
          })
        }
    }

   return <button onClick={onCopyToClipboard} disabled={copied}>
    {!copied ? <img src='../images/copy.svg' alt='Copy'/> : <img src='../images/done.svg' alt='Copied' /> }
  </button>

}

export default CopyToClipboard;