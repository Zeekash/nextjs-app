type BlogCardProps = {
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
  buttonText?: string;
  className?: string;
};

const BlogCard = ({
  image,
  category,
  title,
  author,
  date,
  buttonText = "Read The Article",
  className = "",
}: BlogCardProps) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl bg-white shadow ${className}`.trim()}>
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover sm:h-56"
      />

      <div className="space-y-3 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
          {category}
        </p>

        <h2 className="text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">
          {title}
        </h2>

        <p className="text-sm text-gray-600">
          <span className="font-semibold text-slate-900">by {author}</span>
          <span className="mx-2">•</span>
          {date}
        </p>

        <button className="rounded-full bg-sky-800 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-900">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default BlogCard;