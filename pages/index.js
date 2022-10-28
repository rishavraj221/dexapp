import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const boardingStations = [
  {
    value: "jamuna",
    label: "Jamuna Bus Stop (Hostel G)",
  },
  {
    value: "narmada",
    label: "Narmada Bus Stop",
  },
  {
    value: "sc",
    label: "Sports Complex",
  },
  {
    value: "admin",
    label: "Administration Block",
  },
  {
    value: "gc",
    label: "Gajendra Circle",
  },
  {
    value: "hsb",
    label: "HSB",
  },
  {
    value: "crc",
    label: "CRC",
  },
  {
    value: "ocean",
    label: "Ocean Engg Dept.",
  },
  {
    value: "velachery",
    label: "Velachery Gate",
  },
  {
    value: "kv",
    label: "KV School Stop",
  },
  {
    value: "stop2",
    label: "Stop 2",
  },
  {
    value: "vanaVani",
    label: "Vana Vani School",
  },
  {
    value: "stop1",
    label: "Stop 1",
  },
  {
    value: "mainGate",
    label: "Main Gate",
  },
];

const buses = [
  {
    value: "bus1",
    label: "Bus 1",
  },
  {
    value: "bus2",
    label: "Bus 2",
  },
  {
    value: "bus3",
    label: "Bus 3",
  },
  {
    value: "bus4",
    label: "Bus 4",
  },
];

export default function Home() {
  const [boardingStation, setBoardingStation] = useState("");
  const [busTab, setBus] = useState("bus1");

  const handleChangeBoardingStation = (event) => {
    setBoardingStation(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Buzzinga</title>
      </Head>
      <div className={styles.headCont}>
        <div className={styles.headContS1} style={{ width: "60%" }}>
          <div className={styles.headContS1S1}>Your Boarding Location:</div>
          <div className={styles.headContS1S2}>
            <Image
              src="/icons/location.svg" // Route of the image file
              height={24} // Desired size with correct aspect ratio
              width={24} // Desired size with correct aspect ratio
              alt="buzzinga"
            />
            <div style={{ width: "100%", marginLeft: 10 }}>
              <Select
                value={boardingStation}
                onChange={handleChangeBoardingStation}
                fullWidth
                size="small"
              >
                {boardingStations.map((bs, i) => (
                  <MenuItem key={i} value={bs["value"]}>
                    {bs["label"]}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div
          className={styles.headContS2}
          style={{ width: "22%", marginLeft: "10%" }}
        >
          <div className={styles.headContS1S1}>Est. ETA</div>
          <div className={styles.headContS2S2}>12 min</div>
        </div>
      </div>

      <div className={styles.tabCont}>
        {buses.map((bus, i) => (
          <div
            key={i}
            className={
              bus["value"] === busTab ? styles.tabSelected : styles.tab
            }
            onClick={() => setBus(bus["value"])}
          >
            {bus["label"]}
          </div>
        ))}
      </div>

      <div className={styles.mapCont}>
        <Image
          src={`/mapSVG/route${
            busTab === "bus1" || busTab === "bus3" ? "1" : "2"
          }.svg`} // Route of the image file
          height={682} // Desired size with correct aspect ratio
          width={406} // Desired size with correct aspect ratio
          alt="buzzinga"
        />
        <div
          className={styles.busIcon}
          style={{
            top: busTab === "bus1" || busTab === "bus3" ? -10 : 500,
            left: 56,
          }}
        >
          <Image
            src="/icons/bus.svg" // Route of the image file
            height={87} // Desired size with correct aspect ratio
            width={62} // Desired size with correct aspect ratio
            alt="buzzinga"
          />
        </div>
      </div>
    </>
  );
}
