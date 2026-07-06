import { getHomeData } from "@/server/home";

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <main className="container bg-white">

      {/* Featured */}
      <section>
        <h2>Featured Companies</h2>

        {data.featured?.map((item: any) => (
          <div key={item.id}>
            <h3>{item.company_name}</h3>
            <p>City: {item.city}</p>
            <p>State: {item.state}</p>
            <p>Rating: {item.average_rating}</p>
            <hr />
          </div>
        ))}
      </section>

      {/* Companies */}
      <section>
        <h2>Companies</h2>

        {data.companies?.map((company: any) => (
          <div key={company.id}>
            <h3>{company.company_name}</h3>
            <p>{company.slug}</p>
            <img
              src={company.image}
              alt={company.company_name}
              width={120}
            />
            <hr />
          </div>
        ))}
      </section>

      {/* States */}
      <section>
        <h2>States</h2>

        {data.states?.map((state: any) => (
          <div key={state.slug}>
            {state.state} ({state.company_count})
          </div>
        ))}
      </section>

      {/* Cities */}
      <section>
        <h2>Cities</h2>

        {data.company_city?.map((city: any) => (
          <div key={city.zip_code}>
            {city.name} ({city.total})
          </div>
        ))}
      </section>

      {/* Posts */}
      <section>
        <h2>Latest Posts</h2>

        {data.posts?.map((post: any) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
          </div>
        ))}
      </section>

      {/* Blogs */}
      <section>
        <h2>Blogs</h2>

        {data.blogs?.map((blog: any) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
          </div>
        ))}
      </section>

      {/* Top States */}
      <section>
        <h2>Top States</h2>

        {data.topStates?.map((state: any) => (
          <div key={state.slug}>
            {state.state} ({state.company_count})
          </div>
        ))}
      </section>

    </main>
  );
}