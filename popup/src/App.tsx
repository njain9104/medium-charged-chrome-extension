import { useEffect, useState } from 'react';
import classes from './App.module.css'
import { Headers, MessageTypes } from '../../shared/types';
import { sendMessageToBackground, sendMessageToContent } from '../../shared/chrome-utils';
import HeaderList from './HeaderList';
import CopyToClipboard from './CopyToClipboard';

const App = () => {
  const [headers,setHeaders] = useState<Headers>([]);

  const getHeaders = async () => {
   const response = await sendMessageToContent<{headers:Headers}>({type:MessageTypes.OPEN_POPUP})
    if(response?.headers){
      const bgResponse = await sendMessageToBackground<{headers:Headers}>({type:MessageTypes.SEARCH_BOOKMARK,body: {headers:response.headers}});
      console.log(bgResponse);
      setHeaders(bgResponse?.headers||[])
    }
  }

  const onUpdateBookmark = (id:string,bookmarkId?:string) => {
    setHeaders(prev => {
      return prev.map(header => {
        if(header.id !== id) return header;
        return {...header,bookmarkId};
      })
    })
  }

  useEffect(() => {
    getHeaders();
  },[])

  return <div className={classes.cntr}>
    {headers.length > 0 ? <>
      <div className={classes.headerCntr}>
    <h1>Table of Contents</h1>
    <CopyToClipboard headers={headers} />
    </div>
    <HeaderList headers={headers} onUpdateBookmark={onUpdateBookmark}/>

    </> : <div>No Headers Found...</div>}
  </div>
}

export default App;