/**
 * Function for Handling POST Request
 */
export function postRequest(url: string, body: any, asIs = false) {
    let isOk = false;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: asIs ? body : JSON.stringify(body),
      }).then((response) => {
        isOk = response.ok;
        if (!isOk) {
          return response.status;
        }
        console.log('res: ', response);
        return response.json();
      }).catch((err) => {
        console.log(err);
      })
        .then((responseData) => {
          if (isOk) {
            resolve(responseData);
            if (responseData.code === 0) {
              resolve(responseData);
            } else {
              // err handling
            }
          } else {
            reject(responseData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  /**
 * Function for Handling DELETE Request
 */
export function deleteRequest(url: string, body: any, asIs = false) {
  let isOk = false;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: asIs ? body : JSON.stringify(body),
    }).then((response) => {
      isOk = response.ok;
      if (!isOk) {
        return response.status;
      }
      console.log('res: ', response);
      return response.json();
    }).catch((err) => {
      console.log(err);
    })
      .then((responseData) => {
        if (isOk) {
          resolve(responseData);
          if (responseData.code === 0) {
            resolve(responseData);
          } else {
            // err handling
          }
        } else {
          reject(responseData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
  
  /**
   * Function for Handling GET Request
   */
  export function getRequest(url: string) {
    let isOk = false;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        isOk = response.ok;
        console.log('response=', response);
        if (!isOk) {
          return response.status;
        }
        return response.json();
      })
        .then((responseData) => {
          // console.log(responseData)
          if (isOk) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        });
    });
  }