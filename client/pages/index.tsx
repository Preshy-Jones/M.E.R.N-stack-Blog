import type { NextPage } from "next";
import BlogsSection from "../components/blog/BlogsSection";
import Hero from "../components/Hero";
import Layout from "../components/layouts";

const Home: NextPage = () => {
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
