/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
});

export async function get(url: string): Promise<any> {
  return http.get(url);
}

export async function post(url: string): Promise<any> {
  return http.post(url);
}
