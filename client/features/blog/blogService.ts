import client from "../../api/client";
import { ENDPOINTS } from "../../utils/constants";

export const fetchPosts = async () => {
  const response = await client.publicClient().get(ENDPOINTS.GETPOSTS);
  console.log(response);

  return response.data;
};

const blogService = {
  fetchPosts,
};

export default blogService;
