const callApi = (url, accessToken) => fetch('https://home.leonti.me' + url, {
  method: 'PUT',
  headers: new Headers({
    'Authorization': `Bearer ${accessToken}`
  })
})

export { callApi }
