"use client";

import MovieEditForm from "@/components/dashboard/MovieEditForm";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  console.log(params.movie);
  const [moByID, setMoByID] = useState([]);
  const [allLanguage, setAllLanguage] = useState([]);
  const [allGenre, setAllGenre] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);

  useEffect(() => {
    //  Fetch Movie by ID
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${base_url}/movies/${params.movie}`);
        setMoByID(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();

    // Fetch Language
    const fetchLanguage = async () => {
      try {
        const response = await axios.get(`${base_url}/language`);
        setAllLanguage(response.data);
      } catch (error) {
        console.error("Error fetching Language:", error);
      }
    };

    fetchLanguage();

    // Fetch Genre
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${base_url}/genre`);
        setAllGenre(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();

    // Fetch Industry
    const fetchIndustry = async () => {
      try {
        const response = await axios.get(`${base_url}/industry`);
        setAllIndustry(response.data);
      } catch (error) {
        console.error("Error fetching industry:", error);
      }
    };

    fetchIndustry();
  }, [params.movie]);

  console.log(moByID, "moByID ______");

  return (
    <div>
      <h1>Hello </h1>
      <MovieEditForm
        moByID={moByID}
        allLanguage={allLanguage}
        allGenre={allGenre}
        allIndustry={allIndustry}
      />
    </div>
  );
};

export default Page;
