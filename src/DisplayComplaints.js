import React from "react";
import { useQuery, gql } from "@apollo/client";
import Table from "./Table";


function DisplayComplaints() {
    const GET_COMPLAINTS = gql`
      query MyQuery {
        complaint(limit: 10, order_by: {created_at: desc}) {
          id
          company {
            name
          }
          source
          complaint
          created_at
        }
      }
    `;

  const COMPLAINTS_UPDATED = gql`
    subscription MySubscription {
      complaint(limit: 10, order_by: {created_at: desc}) {
        id
        company {
          name
        }
        source
        complaint
        created_at
      }
    }
  `;

  function ComplaintsPageWithData() {
    const { subscribeToMore, ...result } = useQuery(
      GET_COMPLAINTS,
    );
  
    return (
      <Table
        {...result}
        subscribeToNewComplaints={() =>
          subscribeToMore({
            document: COMPLAINTS_UPDATED,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.complaint;
              return Object.assign({}, prev, {
                  complaint: [newFeedItem[0], ...prev.complaint]
              });

              // // import update from 'immutability-helper'; --- https://www.npmjs.com/package/immutability-helper
              // return update(prev, {
              //   complaint: {
              //       $push: [newFeedItem],
              //   },
              // });
          }
          })
        }
      />
    );
  }

  return ComplaintsPageWithData();
}

export default DisplayComplaints;