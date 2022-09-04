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

  
    const GET_COMPLAINTS = gql`
      query MyQuery {
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
  //     GET_COMPLAINTS
  //   );
  //   return <Table {...result} />;
  // }

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
              if (!prev.data) {
                return Object.assign({}, prev, {
                  complaint: [newFeedItem[0]]
              });
              }
              return Object.assign({}, prev, {
                  complaint: [newFeedItem[0], ...prev.data.complaint]
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