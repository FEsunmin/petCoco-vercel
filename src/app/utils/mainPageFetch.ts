export const fetchPostsMate = async () => {
  const response = await fetch("/api/mate?page=1&limit=5&sort=new");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchPosts = async () => {
  const response = await fetch("/api/community?page=1&limit=10");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchPostsByLikes = async () => {
  const response = await fetch("/api/sortByLikes?page=1&limit=10");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
