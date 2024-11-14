export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const mutator = (
  url: string,
  method: "POST" | "PATCH",
  values?: any
) => fetch(url, {
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values)
}).then((res) => res.json())