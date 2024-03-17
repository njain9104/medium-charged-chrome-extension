import { FC } from "react"
import { Headers, MessageTypes } from "../../shared/types"
import { sendMessageToBackground, sendMessageToContent } from "../../shared/chrome-utils"
import classes from './HeaderList.module.css';

const HeaderList: FC<{headers:Headers,onUpdateBookmark: (id: string,bookmarkId?:string) => void}> = ({headers,onUpdateBookmark}) => {
    const onHeaderClick = async (id:string) => {
        sendMessageToContent({type:MessageTypes.NAVIGATE_TO_HEADER,body:{id}})
      }

      const onBookmark = async (header:Headers[0]) => {
        const {bookmarkId} = await sendMessageToBackground<{bookmarkId?:string}>({type:MessageTypes.UPDATE_BOOKMARK,body:{header}});
        onUpdateBookmark(header.id,bookmarkId)
      }
    
    return       <ul className={classes.list}>
        {headers.map(header => {
          const {id,textContent,bookmarkId} = header;
          const imgSrc = bookmarkId ? 'bookmark-added' : 'bookmark';
          const imgAlt = bookmarkId ? 'Bookmarked' : 'Bookmark';

          return <li key={id} className={classes.listItem}>
                   <div>
                      <button 
                        onClick={() => onHeaderClick(id)}
                      >
                        {textContent}
                      </button>
                      <button onClick={() => onBookmark(header)}><img src={`../images/${imgSrc}.svg`} alt={imgAlt}/></button>
                   </div>
                  </li>
        })}
    </ul>

}

export default HeaderList