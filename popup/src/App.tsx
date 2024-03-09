import { useEffect, useState } from 'react';
import classes from './App.module.css'
import { Headers, MessageTypes } from '../../shared/types';
import { sendMessageFromActiveTab } from '../../shared/chrome-utils';
import HeaderList from './HeaderList';
import CopyToClipboard from './CopyToClipboard';

const App = () => {
  const [headers,setHeaders] = useState<Headers>([]);

  const getHeaders = async () => {
   const response = await sendMessageFromActiveTab<{headers:Headers}>({type:MessageTypes.OPEN_POPUP})
    if(response?.headers){
      setHeaders(response.headers)
    }
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
    <HeaderList headers={headers}/>

    </> : <div>No Headers Found...</div>}
  </div>
}

export default App;