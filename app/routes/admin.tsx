// app/routes/admin.tsx
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server"; // Assuming Prisma setup
import { useState } from "react";
// Product type
type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
};

// Loader to fetch all products
export const loader = async () => {
  const products = await prisma.product.findMany(); // Fetch all products
  return json(products);
};

// Action function to handle CRUD
export const action = async ({ request }) => {
  const formData = await request.formData();
  const method = request.method;

  // Handle Create & Update
  if (method === "POST") {
    const id = formData.get("id");
    const productData = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      price: parseFloat(formData.get("price") as string),
      originalPrice: parseFloat(formData.get("originalPrice") as string),
      imageUrl: formData.get("imageUrl") as string,
    };

    if (id) {
      // Update existing product
      await prisma.product.update({
        where: { id: parseInt(id as string) },
        data: productData,
      });
    } else {
      // Create new product
      await prisma.product.create({ data: productData });
    }

    return redirect("/admin");

  // Handle Delete
  } else if (method === "DELETE") {
    const productId = formData.get("id") as string;
    await prisma.product.delete({
      where: { id: parseInt(productId) },
    });

    return redirect("/admin");
  }
};


export default function Admin() {
  const products = useLoaderData<Product[]>();
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    imageUrl: "",
  });

  // Handle form submission for create/update
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const method =  "POST";
    
    await fetch("/admin", {
      method,
      body: formData,
    });

    window.location.reload(); // Reload to refresh the product list
  };

  // Handle delete action
  const handleDelete = async (id: number) => {
    const formData = new FormData();
    formData.append("id", id.toString());

    await fetch("/admin", {
      method: "DELETE",
      body: formData,
    });

    window.location.reload(); // Reload to refresh the product list
  };

  // Handle form field change
  const handleChange = (event: any) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  // Handle edit action (prefill form)
  const handleEdit = (product: Product) => {
    setFormState({
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" value={formState.id} />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formState.name}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formState.brand}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formState.price}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={formState.originalPrice}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formState.imageUrl}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {formState.id ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Product List</h2>
      <ul className="mt-4 space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded flex items-center justify-between">
          <div>
            <h3 className="font-bold">{product.name}</h3>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Original Price: ${product.originalPrice.toFixed(2)}</p>
            <button
              onClick={() => handleEdit(product)}
              className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mt-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2 mt-2"
            >
              Delete
            </button>
          </div>
          <img src={product.imageUrl} alt={product.name} className="ml-4" width="100" />
        </li>
        ))}
      </ul>
    </div>
  );
}
