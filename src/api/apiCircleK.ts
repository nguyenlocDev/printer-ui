/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export async function getStore() {
  const response = await axios.get(
    "http://localhost:5050/api/circlek/get-store?page=1&limit=100"
  );
  return response.data.data;
}

export async function getEmployee(storeCode: string) {
  const response = await axios.get(
    `http://localhost:5050/api/circlek/get-employe?store=${storeCode}`
  );
  return response.data.data[0].employe;
}

export async function searchProduct(nameProduct: string) {
  const response = await axios.get(
    `http://localhost:5050/api/circlek/get-product?page=1&limit=1000&search=${nameProduct}`
  );
  return response.data.data;
}

export async function getProduct() {
  const response = await axios.get(
    "http://localhost:5050/api/circlek/get-product?page=1&limit=10"
  );
  return response.data.data;
}

export async function printReceipt(data: any) {
  const config = {
    method: "POST",
    url: "http://localhost:5050/api/circlek/print-invoice",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => console.log(response))
    .catch((error) => console.log("error", error));
}
