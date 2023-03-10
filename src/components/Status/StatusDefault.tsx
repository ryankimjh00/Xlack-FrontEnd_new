import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@mui/material/Button";
import "react-dropdown/style.css";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
// import EmojiPicker from "emoji-picker-react";

const StatusDefault = () => {
  const [open, setOpen] = useState(false);
  const [openStatus, SetopenStatus] = useState(false);

  const openStatusHandler = async () => {
    SetopenStatus(!openStatus);
  };

  // const ws = new WebSocket("wss://api.xlack.kreimben.com/ws/status/<workspace_hashed_value>/");
  const handleClickToOpen = async () => {
    setOpen(true);
  };
  // const sendStatus = (e: { target: { value: React.SetStateAction<undefined> } }) => {
  //   setStatus(e.target.value);
  // };

  const handleToClose = async () => {
    setOpen(false);
  };
  const options = ["📆 In a meeting", "🚗 Communicating", "🤒 Sick", "🌴 Vacationing", "🖥️ Working remotely"];
  const times = ["Don't Erase", "30 minute", "1 hour", "4 hour", "Today", "This week", "Choose date"];
  const [status, setStatus] = useState();
  const [time, setTime] = useState();
  const [emoji, setEmoji] = useState();
  const Statusbtns = [];
  const Options = [];
  const Times = [];
  const handleOnChange = async (e: { target: { value: any } }) => {
    setStatus(e.target.value);
  };
  const handleOnChange_T = async (e: { target: { value: any } }) => {
    setTime(e.target.value);
  };
  // const emojiClicked = async (e: { target: { value: any } }) => {
  //   setEmoji(e.target.value);
  // };

  for (const element of options) {
    Statusbtns.push(<StatusButton onClick={handleClickToOpen}>{element}</StatusButton>);
  }
  for (const element of options) {
    Options.push(<option>{element}</option>);
  }
  for (const element of times) {
    Times.push(<option>{element}</option>);
  }
  const [chosenEmoji, setChosenEmoji] = useState();

  // const onEmojiClick = (emojiObject: any) => {
  //   setChosenEmoji(emojiObject);
  // };
  // const EmojiData = ({ chosenEmoji }) => (
  //   <div>
  //     <strong>Selected emoji:</strong> {chosenEmoji.emoji}
  //   </div>
  // );
  return (
    <div>
      <button onClick={openStatusHandler}>
        👍
        {openStatus ? (
          <Dialog open={openStatus}>
            {/*<EmojiPicker onEmojiClick={onEmojiClick} />*/}
            {/*<div>*/}
            {/*  <EmojiPicker onEmojiClick={emojiClicked} disableAutoFocus={true} native />*/}
            {/*  {chosenEmoji && <EmojiData chosenEmoji={console.log} />}*/}
            {/*</div>*/}
            {/*{console.log(chosenEmoji)}*/}
          </Dialog>
        ) : (
          ""
        )}
      </button>
      <StatusDiv placeholder={"🙂What is your Status"} value={status} onClick={handleClickToOpen} />
      {chosenEmoji}
      {console.log(chosenEmoji)}
      <DialogContentText>until {time}</DialogContentText>
      <DialogContentText>{" For new slack channel for test : "}</DialogContentText>
      {Statusbtns}
      <Dialog fullWidth={true} open={open} onClose={handleToClose} PaperComponent={StyledPaper}>
        <DialogTitle>{"Set a status(Manual)"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Manual</DialogContentText>
        </DialogContent>
        <StatusSelect id="status" value={status} onChange={handleOnChange}>
          {Options}
        </StatusSelect>
        <br />
        <DialogContentText>{"Remove status after ..."}</DialogContentText>
        <TimeSelect id="time" value={time} onChange={handleOnChange_T}>
          {Times}
        </TimeSelect>
        <DialogActions>
          <Button onClick={handleToClose} variant="outlined" color="inherit" autoFocus>
            Close
          </Button>
          <Button onClick={handleToClose} variant="contained" color="success" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusDefault;

const StyledPaper = styled(Paper)`
  & {
    background-color: white;
    width: 600px;
    border-radius: 10px;
    padding: 15px;
  }
`;

const StatusButton = styled.button`
  width: 600px;
  height: 40px;
  background-color: white;
  border: none;
  text-align: left;
  font-family: "Fira Code", emoji;
  font-size: 20px;
  :hover {
    background-color: #1264a3;
  }
`;

const StatusDiv = styled.input`
  border: 1px solid grey;
  margin-left: 40px;
  margin-bottom: 30px;
  width: 500px;
  height: 40px;
  font-size: 20px;
`;
const StatusSelect = styled.select`
  width: 600px;
  height: 40px;
  font-size: 20px;
  color: grey;
  border: 1px solid lightgrey;
`;
const TimeSelect = styled.select`
  width: 600px;
  height: 40px;
  font-size: 20px;
  color: grey;
  border: 1px solid lightgrey;
`;
