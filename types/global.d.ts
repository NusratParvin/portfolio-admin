declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
  var mongoose: { conn: any; promise: Promise<any> | null };
}

export {};
