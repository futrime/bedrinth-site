export type Result<T, E> = { ok: true; val: T } | { ok: false; val: E };

export const Result = {
  Ok:<T>(val:T)=>({ok:true as const,val:val}),
  Err:<E>(val:E)=>({ok:false as const,val:val})
};