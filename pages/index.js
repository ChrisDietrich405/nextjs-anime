import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//https://api.jikan.moe/v4/characters

export default function Home() {
  const [pageNumber, setPageNumber] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [animeQuery, setAnimeQuery] = useState("");
  
  const router = useRouter()
  
  const abortController = useRef(new AbortController());


  useEffect(() => {
    const fetchAPI = async () => {
      // AbortController
      abortController.current.abort()
      abortController.current = new AbortController()
      try {
      const response = await fetch(
        `https://api.jikan.moe/v4/characters?page=${pageNumber}&q=${animeQuery}`,
        { signal: abortController.current.signal }
      );
      const apiJson = await response.json();
      setCharacters(apiJson.data);
      } catch(error) {

      }
    
    };
    fetchAPI();
  }, [pageNumber, animeQuery]);

  return (
    <>
    <ToastContainer/>
      <div className={styles.container}>
        <input type="text" value={animeQuery} onChange={(e) => setAnimeQuery(e.target.value)} />
        
        {characters.map((character) => {
          return (
            <div onClick={() => router.push()}>
              <div>{character.name}</div>
              <img src={character.images.jpg.image_url} alt="" />
            </div>
          );
        })}
      </div>
      <div>
        <div
          onClick={() =>
            setPageNumber((prevPage) => (prevPage <= 0 ? 0 : prevPage - 1))
          }
        >
          previous page
        </div>
        <div>{pageNumber}</div>
        <div onClick={() => setPageNumber((prevPage) => prevPage + 1)}>
          next page
        </div>
      </div>
    </>
  );
}
