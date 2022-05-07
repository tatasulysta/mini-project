import { gql } from "@apollo/client";

const GETcart = gql`
  subscription MySubscription {
    Cart(order_by: { id_menu: asc }) {
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
  subscription MySubscription {
    history_label(order_by: { create_at: asc }) {
      create_at
      id
      total
    }
  }
`;
export { GETcart, GETcartID, GETlabel };
