export type Brand = {
  id: number;
  name: string;
  href: string;
  image: string;
  /** Intrinsic size of `image`, so the browser reserves space and no layout shift occurs. */
  width: number;
  height: number;
  imageLight?: string;
};
