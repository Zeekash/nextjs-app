export default async function Page() {
  type Data = {
    message: string;
    description: string;
  };

  // const response = await fetch("http://laravel-api.test/api/hello");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hello`);

  const data: Data = await response.json();

  return (
    <>
    <h1>Retrieving from the server</h1>
    <p>{data.message}</p>
    <p>{data.description}</p>
    </>
  );
  
}