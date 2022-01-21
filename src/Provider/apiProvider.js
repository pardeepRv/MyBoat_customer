
import React  from 'react'
import { View } from 'react-native'
//import Loader from 'Loader';
//var loading=true
//--------------------------- Config Provider Start -----------------------
export const Category = (props) => {

  // how to declare function here?
  return (
      <View>
         <Loader loading={loading}/>
      </View>
  );
}
class ApiContainer {

 loaderfunction=(status)=>{
   console.log('fjsdjfjsl')
   return  <Loader loading={status}/>
  
 }
  postApi = async (url, data) => {

    console.log('post',data)
    var result = 1
 //   loading=true
    //Category();
    result = fetch(url, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: data
    })
    return result
  }


  getApi = async (url) => {
    console.log(url)
    var result = 1
    result = fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
    })
    return result
  }



}
//--------------------------- Config Provider End -----------------------
export const apifuntion = new ApiContainer();
