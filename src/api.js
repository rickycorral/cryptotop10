import axios from 'axios';

export const fetchTop10Cryptos = async () => {
  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD');
    const data = response.data.Data.map(crypto => ({
      item: {
        id: crypto.CoinInfo.Id,
        name: crypto.CoinInfo.FullName,
        symbol: crypto.CoinInfo.Name,
        imageUrl: `https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`,
        market_data: {
          current_price: {
            usd: crypto.RAW.USD.PRICE,
          },
          market_cap: {
            usd: crypto.RAW.USD.MKTCAP,
          },
        },
      },
    }));
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCryptoPriceHistory = async (symbol) => {
  try {
    const response = await axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${symbol}&tsym=USD&limit=1000`);
    const data = response.data.Data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};