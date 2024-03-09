import { FC } from "react"
import { Headers, MessageTypes } from "../../shared/types"
import { sendMessageFromActiveTab } from "../../shared/chrome-utils"

const HeaderList: FC<{headers:Headers}> = ({headers}) => {
    const onHeaderClick = async (id:string) => {
        sendMessageFromActiveTab<undefined>({type:MessageTypes.NAVIGATE_TO_HEADER,body:{id}})
      }
    
    return       <ul>
        {headers.map(header => <li key={header.id}><button onClick={() => {
          onHeaderClick(header.id)
        }}>{header.textContent}</button></li>)}
    </ul>

}

export default HeaderList