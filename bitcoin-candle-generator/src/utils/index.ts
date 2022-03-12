export const sleep = (time: number): Promise<any> =>
  new Promise((r) => setTimeout(r, time));
