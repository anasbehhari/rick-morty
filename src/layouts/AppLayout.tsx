import { LayoutHeader } from "@/components";
import { ScrollToOptions } from "@/types";
import clsx from "clsx";
import { useLocalStorage, useScrollPosition } from "oceandev-hooks";
import { Outlet, useOutletContext } from "react-router-dom";

interface AppLayoutProps {
  className?: string;
}

type ContextType = {
  scrollTo: (options?: ScrollToOptions | undefined) => void;
  setList: (value: string) => void;
  getList: () => string | null;
};
export function AppLayout({ className }: AppLayoutProps) {
  const [, scrollContainerRef, scrollTo] = useScrollPosition<HTMLDivElement>(
    { x: 0, y: 0 },
    {
      behavior: "smooth",
    },
  );
  const [setList, getList] = useLocalStorage<string>("list-bookmarked");
  const classNames = clsx("w-full h-screen flex items-center", className);
  return (
    <div className={classNames}>
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto right-section w-full"
      >
        <LayoutHeader />
        <Outlet context={{ scrollTo, setList, getList }} />
      </div>
    </div>
  );
}
export function useAppLayoutContext() {
  return useOutletContext<ContextType>();
}
