import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Image from "next/image";
import uuid from "react-uuid";
import { API } from "aws-amplify";
import * as mutations from "../../src/graphql/mutations";

import constants from "../../constants/common";
import Button from "../../components/button";
import styles from "../../styles/Home.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  outline: "none",
  p: 3,
};

export default function CreateOrViewContact({
  open,
  handleClose,
  modal,
  data,
  setData,
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (modal && modal["type"] === constants.UPDATE) {
      setName(modal["name"]);
      setDate(modal["date"]);
      setSelectedImage(modal["image"]);
    } else {
      setName("");
      setDate(new Date());
      setSelectedImage(null);
    }
  }, [modal]);

  const handleSubmit = async () => {
    if (!modal) return;
    if (modal["type"] === constants.CREATE) {
      const temp = {};
      temp["id"] = uuid();
      temp["name"] = name;
      temp["image"] = selectedImage;
      temp["date"] = date;
      const temp_data = [...data];
      temp_data.push(temp);
      setData(temp_data);
      handleClose();
      try {
        await API.graphql({
          query: mutations.createContact,
          variables: { input: temp },
        });
      } catch (ex) {
        alert(ex.message);
      }
      return;
    }
    if (modal["type"] === constants.UPDATE) {
      let temp_data = [...data];
      const temp = temp_data.filter((t) => t.id === modal.id)[0];
      const index = temp_data.indexOf(temp);
      temp["name"] = name;
      temp["image"] = selectedImage;
      temp["date"] = date;
      temp_data.splice(index, 1, temp);
      setData(temp_data);
      handleClose();
      try {
        await API.graphql({
          query: mutations.updateContact,
          variables: {
            input: {
              id: temp["id"],
              name: temp["name"],
              image: temp["image"],
              date: temp["date"],
            },
          },
        });
      } catch (ex) {
        console.log(ex);
        alert(ex.message);
      }
      return;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={style}>
          {modal && modal["type"] === constants.CREATE && (
            <div className={styles.mH1}>Create a New Contact</div>
          )}
          {modal && modal["type"] === constants.UPDATE && (
            <div className={styles.mH1}>Update a Contact</div>
          )}

          <div className={styles.formField}>
            <div className={styles.label}>Contact Name</div>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className={styles.formField}>
            <div className={styles.label}>Image</div>

            <div
              className={styles.addImgBtn}
              onClick={() => document.getElementById("imageInput").click()}
            >
              {selectedImage ? "Update File" : "Add File"}
              <input
                id="imageInput"
                type="file"
                hidden
                onChange={(event) =>
                  setSelectedImage(URL.createObjectURL(event.target.files[0]))
                }
              />
            </div>

            {selectedImage && (
              <Image
                className={styles.image}
                src={selectedImage} // Route of the image file
                height={50} // Desired size with correct aspect ratio
                width={50} // Desired size with correct aspect ratio
                alt="image"
              />
            )}
          </div>

          <div className={styles.formField}>
            <div className={styles.label}>Last Contact Date</div>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={date}
              onChange={(val) => setDate(val)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <div className={styles.formField}>
            <Button
              label={
                modal && modal["type"] === constants.UPDATE
                  ? "Update Contact"
                  : "Save Contact"
              }
              disabled={!(name && date && selectedImage)}
              onClick={handleSubmit}
            />
          </div>
        </Box>
      </LocalizationProvider>
    </Modal>
  );
}
