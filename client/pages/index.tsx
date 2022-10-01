import type { NextPage } from "next";
import { useEffect } from "react";
import BlogsSection from "../components/blog/BlogsSection";
import Hero from "../components/Hero";
import Layout from "../components/layouts";
import { getPosts } from "../features/blog/blogSlice";
import { useAppDispatch } from "../store/hooks";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <Layout>
      <div>
        <Hero />
        <BlogsSection />
      </div>
    </Layout>
  );
};

export default Home;
