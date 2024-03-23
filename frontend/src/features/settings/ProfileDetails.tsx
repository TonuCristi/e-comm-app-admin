import styled from "styled-components";

import { User } from "../../lib/types";

const StyledProfileDetails = styled.div`
  background-color: var(--color-indigo-50);
  color: var(--color-indigo-900);
  border-radius: 1.1rem;
  padding: 2rem;

  @media (max-width: 1535px) {
    width: 80%;
    margin: 0 auto;
    font-size: 1.6rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2.4rem;

  @media (max-width: 1535px) {
    margin-bottom: 1.8rem;
    text-align: center;
  }
`;

const ProfileFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1535px) {
    gap: 1.4rem 2.4rem;
  }
`;

const Field = styled.p<{ $isPos?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  grid-column: ${(props) => props.$isPos && "1"};
`;

const FieldTitle = styled.span`
  font-weight: 500;
`;

const FieldValue = styled.span`
  font-weight: 500;
  border: 3px solid var(--color-indigo-300);
  padding: 0.8rem;
  border-radius: 0.7rem;
`;

type Props = {
  currentUser: User;
};

export default function ProfileDetails({ currentUser }: Props) {
  const { id, username, email, role, createdAt } = currentUser;

  return (
    <StyledProfileDetails>
      <Title>Profile details</Title>
      <ProfileFields>
        <Field>
          <FieldTitle>Id</FieldTitle>
          <FieldValue>{id}</FieldValue>
        </Field>
        <Field $isPos={true}>
          <FieldTitle>Username</FieldTitle>
          <FieldValue>{username}</FieldValue>
        </Field>
        <Field>
          <FieldTitle>Email</FieldTitle> <FieldValue>{email}</FieldValue>
        </Field>
        <Field>
          <FieldTitle>Role</FieldTitle> <FieldValue>{role}</FieldValue>
        </Field>
        <Field>
          <FieldTitle>Joined</FieldTitle>
          <FieldValue>{new Date(createdAt).toLocaleDateString()}</FieldValue>
        </Field>
      </ProfileFields>
    </StyledProfileDetails>
  );
}
