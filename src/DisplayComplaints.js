import React from "react";
// import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Table from "./Table";


function DisplayComplaints() {
  // const [complaints, setComplaints] = useState([]);

  // const getComplaints = (e) => {
  //   fetch('https://test-demo-gql-backend.herokuapp.com/v1/graphql', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-hasura-admin-secret': 'SECRET'
  //     },
  //     body: JSON.stringify({
  //       query: `
  //         query MyQuery {
  //           complaint(limit: 10, order_by: {created_at: desc}) {
  //             id
  //             company {
  //               name
  //             }
  //             source
  //             complaint
  //           }
  //         }
  //         `,
  //     }),
  //   })
  //   .then((res) => res.json())
  //   .then((result) => {
  //       const {data} = result;
  //       const response = Object.values(data)[0]
  //       setComplaints(response)
  //     }
  //   )
  // }

  // useEffect(()=> getComplaints(), [])

  const COMPLAINTS_UPDATED = gql`
    subscription MySubscription {
      complaint(limit: 10, order_by: {created_at: desc}) {
        id
        company {
          name
        }
        source
        complaint
      }
    }
  `;

  // function ComplaintsPageWithData() {
  //   const result = useQuery(
  //     COMPLAINTS_UPDATED
  //   );
  //   return <Table {...result} />;
  // }

  function ComplaintsPageWithData() {
    const { subscribeToMore, ...result } = useQuery(
      COMPLAINTS_UPDATED,
    );
  
    return (
      <Table
        {...result}
        subscribeToNewComplaints={() =>
          subscribeToMore({
            document: COMPLAINTS_UPDATED,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.complaints;
              return Object.assign({}, prev, {
                complaints: [newFeedItem, ...prev.complaints]
              });
            }
          })
        }
      />
    );
  }

  return ComplaintsPageWithData();
}

export default DisplayComplaints;