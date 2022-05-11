import { gql } from "@apollo/client";

const GETcart = gql`
  subscription MySubscription($uid: uuid!) {
    Cart(where: { uid: { _eq: $uid } }, order_by: { id: asc }) {
      count
      id_menu
      menu {
        id
        price
        star
        title
      }
    }
  }
`;
const GETcartID = gql`
  subscription MySubscription {
    Cart {
      id_menu
    }
  }
`;
const GETlabel = gql`
  subscription MySubscription($uid: uuid!) {
    history_label(
      order_by: { create_at: desc }
      where: { uid: { _eq: $uid } }
    ) {
      create_at
      id
      total
    }
  }
`;
const GETusername = gql`
  subscription MySubscription($uid: uuid!) {
    user(where: { id: { _eq: $uid } }) {
      username
    }
  }
`;
export { GETcart, GETcartID, GETlabel, GETusername };
