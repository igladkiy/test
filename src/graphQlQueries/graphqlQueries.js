import { gql } from '@apollo/client';

export const GET_LIFTS = gql`
  query MyQuery {
    allLifts {
      id
      name
      status
      elevationGain
      capacity
    }
  }
`;

export const UPDATE_LIFT_STATUS = gql`
  mutation UpdateLiftStatus($liftId: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $liftId, status: $status) {
      name
      status
    }
  }
`;
