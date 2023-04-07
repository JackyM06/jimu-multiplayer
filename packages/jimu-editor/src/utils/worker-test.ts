self.addEventListener('message', event => {
    const { data } = event;
    console.log('%c', `worker received:${data}`, 'background: green; color: #fff; padding: 3px; border-radius: 2px;');
    self.postMessage(data + 1)
    console.log(self)
})

