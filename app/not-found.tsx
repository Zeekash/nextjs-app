import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
  <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
  <Image
    src="/assets/img/errors/404.webp"
    alt="404 - Page not found"
    width={1000}
    height={700}
    className="h-[60vh] w-[70vw] object-contain max-sm:h-[40vh] max-sm:w-[90vw]"
  />

  <Link
    href="/"
    className="mt-4  bg-[#116087] px-6 py-3 text-white"
  >
    Back to Home Page
  </Link>
</div>
  );
}