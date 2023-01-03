import React from "react";
import { UserDetailsType } from "../types";
import styled from "styled-components";

function User(props: UserDetailsType) {
  return (
    <UserContainer>
      {props?.first_name} {props?.last_name} <br></br>
      {props?.email}
    </UserContainer>
  );
}

export default User;

const UserContainer = styled.div`
  color: black;
  display: flex;
  padding: 3px;
  border-bottom: 1px solid #49274b;
`;
