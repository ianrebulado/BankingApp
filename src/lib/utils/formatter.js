export function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid Date";

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatName(name) {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatNumber(number) {
  return new Intl.NumberFormat("en-IN").format(number);
}

export function formatAmount(amount) {
  const formattedAmount = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

  return formattedAmount;
}

export function sortDescendingOrder(array, id) {
  return array.sort((a, b) => b[id] - a[id]);
}

export function sortAscendingOrder(array, id) {
  return array.sort((a, b) => a[id] - b[id]);
}
