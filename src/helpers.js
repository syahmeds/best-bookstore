export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getFunName() {
  const adjectives = [
    "angry"
  ];

  const nouns = [
    "people"
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}

export function getStores() {
  return [`Amazon`, `City Lights Books`, `Atlantis Books`, `Barnes & Nobles`, `Google`];
}
