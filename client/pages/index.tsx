import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import BlogsSection from "../components/blog/BlogsSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <BlogsSection/>
      <Footer />
    </div>
  );
};

export default Home;
