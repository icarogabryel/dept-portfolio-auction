const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL;

export const WEBSOCKET_URLS = {
  portfolios: `${WS_BASE_URL}/portfolios/`,
  bids: `${WS_BASE_URL}/bids/`,
};
