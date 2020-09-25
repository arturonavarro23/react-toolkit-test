import { useQuery } from "react-query";
import api from "../api";

const getRestaurantById = async (key, id) => {
  const res = await api.get(`restaurants/${id}`);
  return res.data;
};

export default (id) => {
  return useQuery(["restaurants", id], getRestaurantById);
};
