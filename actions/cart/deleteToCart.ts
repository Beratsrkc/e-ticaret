import axios from "axios";

export const DeleteToCart = async (id: number, jwt: string) => {
  // Strapi'nin verdiği tam endpoint
  const Urls = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts/${id}`;

  try {
    const response = await axios.delete(Urls, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during DeleteToCart:", error);
    throw error;
  }
};
