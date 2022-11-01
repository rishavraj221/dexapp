import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { API } from "aws-amplify";
import Image from "next/image";
import moment from "moment";
import Head from "next/head";

import * as queries from "../src/graphql/queries";
import awsExports from "../src/aws-exports";
import constants from "../constants/common";
import Button from "../components/button";
import CreateOrViewContact from "../components/modals/createOrViewContact";
import styles from "../styles/Home.module.css";

Amplify.configure({ ...awsExports, ssr: true });

export default function Home() {
  const [modal, setModal] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getContacts = async () => {
    try {
      setLoading(true);
      const allContacts = await API.graphql({ query: queries.listContacts });
      setData(allContacts["data"]["listContacts"]["items"]);
      setLoading(false);
    } catch (ex) {
      alert(ex.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>

      <CreateOrViewContact
        open={modal && modal["type"] ? true : false}
        handleClose={() => setModal(null)}
        modal={modal}
        data={data}
        setData={setData}
      />

      <div className={styles.mainCont}>
        <div className={styles.header}>
          <div className={styles.headerName}>Contacts</div>
          <Button
            label="+ Add Contact"
            onClick={() => {
              const temp = {};
              temp["type"] = constants.CREATE;
              setModal(temp);
            }}
          />
        </div>

        {loading && <div className="loader">Loading...</div>}

        {!loading &&
          data
            .sort((c1, c2) => new Date(c2.date) - new Date(c1.date))
            .map((contact, i) => (
              <div
                key={i}
                className={styles.contactListCont}
                onClick={() => {
                  const temp = { ...contact };
                  temp["type"] = constants.UPDATE;
                  setModal(temp);
                }}
              >
                <Image
                  className={styles.image}
                  src={contact["image"]} // Route of the image file
                  height={50} // Desired size with correct aspect ratio
                  width={50} // Desired size with correct aspect ratio
                  alt="image"
                />
                <div className={styles.contactInnerCont}>
                  <div className={styles.contactTxt}>
                    {contact["name"].substring(0, 30)}
                  </div>
                  <div className={styles.contactTxt}>
                    {moment(contact["date"]).format("MMMM Do, yyyy")}
                  </div>
                </div>
              </div>
            ))}

        {data.length === 0 && (
          <div className={styles.noDataCont}>
            No Contacts, click the button below to add a contact...
            <div style={{ marginTop: 20 }}>
              <Button
                label="+ Add Contact"
                onClick={() => {
                  const temp = {};
                  temp["type"] = constants.CREATE;
                  setModal(temp);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
