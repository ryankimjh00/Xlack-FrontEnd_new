import React, { useEffect } from "react";
import { WorkspaceType } from "../types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function Workspace(props: WorkspaceType) {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
}
export function SelectWorkspace(prop: WorkspaceType) {
  return (
    <WorkspaceContainer>
      <OptionWorkspace>
        <WorkspaceButton>{prop.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
      </OptionWorkspace>
    </WorkspaceContainer>
  );
}

export default Workspace;

const ChannelContainer = styled.div`
  display: flex;
  font-size: 12px;
  padding: 10px;
  align-items: center;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;
const WorkspaceContainer = styled.div``;
const OptionWorkspace = styled.div`
  color: white;
`;
const OptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
const WorkspaceButton = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgb(89, 87, 87);
  border: 3px solid #3f0e40;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  &:hover {
    border-color: lightgray;
  }
`;
const Workspaces = styled.div`
  width: 65px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: #3f0e40;
  border-top: 1px solid rgb(82, 38, 83);
  border-right: 1px solid rgb(82, 38, 83);
  vertical-align: top;
  text-align: center;
  padding: 15px 0 0;
`;
