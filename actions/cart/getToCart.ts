import axios from "axios";

export const getToCart = async (userId: any, jwt: any) => {
  const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts?filters[userId][$eq]=${userId}&populate[products][populate]=images`;

  try {
    const response = await axios.get(Urls, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data = response.data.data;

    // Sepet verisini map'leyerek işliyoruz
    const cartItemList = data.map((item: any) => ({
      id: item.id,
      name: item.products[0]?.name || "Unnamed Product",
      quantity: item.quantity || 0,
      amount: item.amount || 0,
      color: item.color || "N/A",
      size: item.size || "N/A",
      product: item.products[0]?.id || null,
      images: item.products[0]?.images[0]?.url || "",
    }));

    return cartItemList;
  } catch (error: any) {
    console.error("Error fetching cart items:", error.message); // Hata mesajı
    throw error; // Hata fırlatılmalı
  }
};
