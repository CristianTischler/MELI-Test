const axios = require("axios");

const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

export const searchItems = async (searchQuery: string) => {
  const data = await fetchData(
    `https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}&limit=4`
  );
  const categories =
    data.filters
      .find((f: any) => f.id === "category")
      ?.values[0]?.path_from_root.map((v: any) => v.name) || [];

  //Hice esto porque el thumbnail no tiene la misma calidad que la imagen principal
  const itemsWithPictures = await Promise.all(
    data.results.map(async (item: any) => {
      const itemData = await fetchData(
        `https://api.mercadolibre.com/items/${item.id}`
      );
      const pictureUrl = itemData.pictures?.[0]?.secure_url || item.thumbnail;

      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: 2,
        },
        picture: pictureUrl,
        condition: item.condition,
        free_shipping: item.shipping?.free_shipping || false,
      };
    })
  );

  return {
    author: { name: "Cristian", lastname: "Tischler" },
    categories,
    items: itemsWithPictures,
  };
};

export const getItemDetails = async (itemId: string) => {
  const [itemData, descriptionData] = await Promise.all([
    fetchData(`https://api.mercadolibre.com/items/${itemId}`),
    fetchData(`https://api.mercadolibre.com/items/${itemId}/description`).catch(
      () => ({ plain_text: "" })
    ),
  ]);

  return {
    author: { name: "Cristian", lastname: "Tischler" },
    item: {
      id: itemData.id,
      title: itemData.title,
      price: {
        currency: itemData.currency_id,
        amount: itemData.price,
        decimals: 2,
      },
      picture: itemData.pictures?.[0]?.url || "",
      condition: itemData.condition,
      free_shipping: itemData.shipping?.free_shipping || false,
      sold_quantity: itemData.sold_quantity || 0,
      description: descriptionData.plain_text,
    },
  };
};
