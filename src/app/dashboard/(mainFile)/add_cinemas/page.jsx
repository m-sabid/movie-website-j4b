"use client";
import MovieForm from "@/components/dashboard/MovieForm";
import TypographyWrapper from "@/components/shared/TypographyWrapper";
import base_url from "@/providers/links/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";

const ImportMovie = () => {
  const [allLanguage, setAllLanguage] = useState([]);
  const [allGenre, setAllGenre] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <TypographyWrapper>
      <MovieForm
        allGenre={allGenre}
        allLanguage={allLanguage}
        allIndustry={allIndustry}
      />
    </TypographyWrapper>
  );
};

export default ImportMovie;
