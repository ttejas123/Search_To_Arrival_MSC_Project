import axios from 'axios';
import buildUrl from './urlBuilder';

export const getData = (params:string, query:any) => {
  return new Promise((resolve:any, reject:any) => {
    (async () => {
      try {
        const url = buildUrl(params)+(query? query: "")
        const data = await axios.get(url, query? query : "");
        resolve(data);
      } catch (e) {
        console.log('Error occurred in API call: ', e);
        reject(e);
      }
    })();
  });
};


export const postData = (params:string, query:any) => {
    return new Promise((resolve:any, reject:any) => {
        (async () => {
          try {
            const data = await axios.post(buildUrl(params), query? query : "");
            resolve(data);
          } catch (e) {
            console.log('Error occurred in API call: ', e);
            reject(e);
          }
        })();
      });
}