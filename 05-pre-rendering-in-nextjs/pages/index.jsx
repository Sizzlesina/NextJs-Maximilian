import path from "path";
import fs from "fs/promises";
import Link from "next/link";

function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`} key={product.id}>
            {product.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/*
When we pre-render dynamic routes we can do it in 2 ways :
@ 1- Using getStaticProps and getStaticPaths 
@ 2- Using getServerSideProps 
 Now the difference between these two is that in the first method we must tell nextJs which dynamic path we want to be pre-rendered (recommanded way)
 But in the second method nextJs will pre-render every dynamic path
 */

export async function getStaticProps(context) {
  console.log("(Re)-generating");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
