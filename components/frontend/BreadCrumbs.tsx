import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

const Breadcrumbs = ({
  items,
  className = "",
}: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-x-2 gap-y-2 font-medium leading-none text-[#071018] ${className} sm:text-[10px] `}
    >
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex min-w-0 items-center gap-2"
          >
            {item.href && !isLastItem ? (
              <Link
                href={item.href}
                className="whitespace-nowrap transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLastItem
                    ? "font-semibold"
                    : "whitespace-nowrap"
                }
              >
                {item.label}
              </span>
            )}

            {!isLastItem && (
              <FaArrowRight
                aria-hidden="true"
                className="shrink-0 text-[9px] text-black"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;