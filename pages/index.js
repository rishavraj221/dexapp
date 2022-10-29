import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import Head from "next/head";
import Image from "next/image";
import { getBusCode } from "../api/bus";
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

const coordinates = {
  lat: "",
  lon: "",
};

const busCodeAGC = {
  1: {
    top: -30,
    left: 15,
    angle: 180,
  },
  1.5: {
    top: -3,
    left: 15,
    angle: 180,
  },
  2: {
    top: 29,
    left: 15,
    angle: 180,
  },
  2.5: {
    top: 57,
    left: 15,
    angle: 180,
  },
  3: {
    top: 92,
    left: 15,
    angle: 180,
  },
  3.5: {
    top: 112,
    left: 15,
    angle: 180,
  },
  4: {
    top: 152,
    left: 15,
    angle: 180,
  },
  4.5: {
    top: 177,
    left: 15,
    angle: 180,
  },
  5: {
    top: 255,
    left: 71,
    angle: 270,
  },
  5.5: {
    top: 255,
    left: 85,
    angle: 270,
  },
  6: {
    top: 255,
    left: 115,
    angle: 270,
  },
  6.5: {
    top: 255,
    left: 145,
    angle: 270,
  },
  7: {
    top: 255,
    left: 175,
    angle: 270,
  },
  7.5: {
    top: 255,
    left: 210,
    angle: 270,
  },
  8: {
    top: 255,
    left: 248,
    angle: 270,
  },
  8.5: {
    top: 255,
    left: 248,
    angle: 275,
  },
  9: {
    top: 255,
    left: 345,
    angle: 275,
  },
  9.5: {
    top: 340,
    left: 21,
    angle: 0,
  },
  10: {
    top: 375,
    left: 21,
    angle: 0,
  },
  10.5: {
    top: 435,
    left: 21,
    angle: 0,
  },
  11: {
    top: 500,
    left: 21,
    angle: 0,
  },
  11.5: {
    top: 565,
    left: 21,
    angle: 0,
  },
  12: {
    top: 640,
    left: 21,
    angle: 0,
  },
};

const busCodeTGC = {
  1: {
    top: -20,
    left: 21,
    angle: 0,
  },
  1.5: {
    top: 10,
    left: 21,
    angle: 0,
  },
  2: {
    top: 42,
    left: 21,
    angle: 0,
  },
  2.5: {
    top: 70,
    left: 21,
    angle: 0,
  },
  3: {
    top: 105,
    left: 21,
    angle: 0,
  },
  3.5: {
    top: 125,
    left: 21,
    angle: 0,
  },
  4: {
    top: 165,
    left: 21,
    angle: 0,
  },
  4.5: {
    top: 190,
    left: 21,
    angle: 0,
  },
  5: {
    top: 262,
    left: 56,
    angle: 90,
  },
  5.5: {
    top: 262,
    left: 70,
    angle: 90,
  },
  6: {
    top: 262,
    left: 100,
    angle: 90,
  },
  6.5: {
    top: 262,
    left: 130,
    angle: 90,
  },
  7: {
    top: 262,
    left: 160,
    angle: 90,
  },
  7.5: {
    top: 262,
    left: 195,
    angle: 90,
  },
  8: {
    top: 262,
    left: 233,
    angle: 90,
  },
  8.5: {
    top: 262,
    left: 285,
    angle: 90,
  },
  9: {
    top: 262,
    left: 330,
    angle: 90,
  },
  9.5: {
    top: 325,
    left: 15,
    angle: 180,
  },
  10: {
    top: 360,
    left: 15,
    angle: 180,
  },
  10.5: {
    top: 420,
    left: 15,
    angle: 180,
  },
  11: {
    top: 485,
    left: 15,
    angle: 180,
  },
  11.5: {
    top: 550,
    left: 15,
    angle: 180,
  },
  12: {
    top: 625,
    left: 15,
    angle: 180,
  },
};

export default function Home() {
  const [boardingStation, setBoardingStation] = useState("");
  const [busTab, setBus] = useState("bus1");

  const [locationCoord, setLocationCoord] = useState(coordinates);

  const [busLocationCode, setBusLocationCode] = useState(0);

  const [btgc, setBTGC] = useState(true);

  const handleChangeBoardingStation = (event) => {
    setBoardingStation(event.target.value);
  };

  const handleChangeCoord = (val, key) => {
    const temp = { ...locationCoord };
    temp[key] = val;
    setLocationCoord(temp);
  };

  const getBusCodeFunc = async () => {
    const res = await getBusCode(locationCoord["lat"], locationCoord["lon"]);
    console.log(res["code"]);
    if (res && res["code"]) setBusLocationCode(parseFloat(res["code"]));
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

      {/*<div className={styles.tabCont}>
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
      </div> */}

      <div className={styles.tempInpCont}>
        <div className={styles.tempInpContS1}>
          <TextField
            value={locationCoord["lat"]}
            onChange={(e) => handleChangeCoord(e.target.value, "lat")}
            type="number"
            variant="outlined"
            size="small"
            placeholder="Latitude"
          />
          <TextField
            value={locationCoord["lon"]}
            onChange={(e) => handleChangeCoord(e.target.value, "lon")}
            type="number"
            variant="outlined"
            size="small"
            placeholder="Longitude"
          />
        </div>
        <Button
          disabled={!(locationCoord["lat"] && locationCoord["lon"])}
          variant="contained"
          onClick={getBusCodeFunc}
        >
          Continue
        </Button>
      </div>

      <div style={{ margin: "10px auto", width: 160 }}>
        <FormControlLabel
          control={
            <Switch
              checked={btgc ? true : false}
              onChange={(e) => setBTGC(e.target.checked)}
            />
          }
          label="Towards GC"
        />
      </div>

      <div className={styles.mapCont}>
        <Image
          src={`/mapSVG/route${
            busLocationCode >= 0 && busLocationCode < 5 ? "1" : "2"
          }.svg`} // Route of the image file
          height={682} // Desired size with correct aspect ratio
          width={406} // Desired size with correct aspect ratio
          alt="buzzinga"
        />
        {busLocationCode > 0 && (
          <div
            className={styles.busIcon}
            style={{
              top: btgc
                ? busCodeTGC[`${busLocationCode}`]["top"]
                : busCodeAGC[`${busLocationCode}`]["top"],
              left: btgc
                ? busCodeTGC[`${busLocationCode}`]["left"]
                : busCodeAGC[`${busLocationCode}`]["left"],
              transform: `rotate(${
                btgc
                  ? busCodeTGC[`${busLocationCode}`]["angle"]
                  : busCodeAGC[`${busLocationCode}`]["angle"]
              }deg)`,
            }}
          >
            <Image
              src="/icons/bus.svg" // Route of the image file
              height={87} // Desired size with correct aspect ratio
              width={62} // Desired size with correct aspect ratio
              alt="buzzinga"
            />
          </div>
        )}
      </div>
    </>
  );
}
