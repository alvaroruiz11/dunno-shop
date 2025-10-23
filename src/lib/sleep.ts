export const sleep = (second: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, second * 1000);
  });
