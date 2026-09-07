export const config = {
  // Fall back to the page's own host (localhost or LAN IP) so the API is always
  // same-site with the browser → auth cookies flow. Override via NEXT_PUBLIC_API_ROUTE.
  apiRoute:
    process.env.NEXT_PUBLIC_API_ROUTE ||
    (typeof window !== "undefined"
      ? `http://${window.location.hostname}:3000`
      : "http://localhost:3000"),
}