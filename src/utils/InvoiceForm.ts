import { v4 as uuidv4 } from "uuid";

export function handleAddNewLineItem(push: any) {
  push({
    id: uuidv4(),
    name: "",
    quantity: 1,
    price: 0,
    total: 0,
  });
}
export function formatNumberWithCommas(amount: number | string) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function generateRandomId(): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomAlphabet1 = alphabet[Math.floor(Math.random() * alphabet.length)];
  const randomAlphabet2 = alphabet[Math.floor(Math.random() * alphabet.length)];
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${randomAlphabet1}${randomAlphabet2}${randomNumber}`;
}

export const transformZodErrors = (errorArray: any[]) => {
  return errorArray.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.path.join(".")]: cur.message,
    };
  }, {});
};
