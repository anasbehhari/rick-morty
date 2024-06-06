export type API_PAGINATED_ROUTE = {
  info: Info;
};

export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export interface ScrollPosition {
  x: number;
  y: number;
}

export type ScrollDirection = "top" | "bottom" | "left" | "right";

export interface ScrollToOptions {
  direction?: ScrollDirection;
  position?: Partial<ScrollPosition>;
}
export interface ScrollOptions {
  behavior?: ScrollBehavior;
}
