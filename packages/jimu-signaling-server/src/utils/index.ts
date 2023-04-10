let uuid = 1;

export function getUuid() {
  uuid += 1;
  return (Date.now() + uuid).toString(16).substring(3);
}

export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
