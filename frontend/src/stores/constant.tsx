
import { notification } from 'antd'

import bedroom from "assets/bedroom.jpg"
import livingroom from "assets/livingroom.jpg"
export const url = "https://backend-6ch5yx6zaq-et.a.run.app"
export const images = [bedroom, livingroom]
export const fetchData =
  (
    urlExtend: string,
    body: any,
    method: string,
    errorMessage: string,
    authorization: boolean,
    successfulEvent?: (response: any) => any,
    successfulMessage?: string,
    errorEvent?: (reason: any) => any) => {
    var header: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    var payload: any = {
      mode: "cors",
      headers: header,
      method: method,
    }
    if (method !== "GET") {
      payload["body"] = body
    }
    if (authorization) {
      header['Authorization'] = 'Bearer ' + localStorage.getItem('authorization')
    }
    console.log('Payload', payload)
    fetch(url + urlExtend, payload)
      .then((response) => response.json())
      .then((response) => {
        console.log('Data', response)
        if (response.error == undefined) {
          if (successfulMessage != undefined) {
            notification.info({
              message: successfulMessage,
              placement: 'top',
            });
          }
          if (successfulEvent != undefined) {
            successfulEvent(response)
          }
        }
      })
      .catch((reason) => {
        console.log(reason)
        if (errorEvent != undefined) {
          errorEvent(reason)
        }
        notification.info({
          message: errorMessage,
          placement: 'top',
        });
      })
  }