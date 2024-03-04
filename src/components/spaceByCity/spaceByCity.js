"use client";

import useSpaceStore from "@/zustand/spaceStore";
import React, { useEffect } from "react";
import styles from "./spaceByCity.module.css";
import { CityComp } from "../cityComp/cityComp";
import { getByCity } from "@/fetchData/spaces";

export default function SpaceByCity({ city }) {
  const { spacesByCity, setSpacesByCity } = useSpaceStore();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getByCity({ city });
      setSpacesByCity(res.data);
    };

    fetchData();
  }, [city, setSpacesByCity]);
  return (
    <main>
      <div className={styles}>
        {spacesByCity &&
          spacesByCity.map((city, index) => {
            return <CityComp key={index} data={city} />;
          })}
      </div>
    </main>
  );
}
