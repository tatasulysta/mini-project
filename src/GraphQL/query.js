import { gql } from "@apollo/client";
const GETmenu = gql`
  query MyQuery($_eq: Int = 1) {
    menu(where: { category: { id: { _eq: $_eq } } }) {
      id_category
      id
      price
      star
      title
    }
  }
`;
const GETall = gql`
  query MyQuery2 {
    menu {
      id
      price
      title
      star
    }
  }
`;

const GETpizza = gql`
  query pizza {
    menu(where: { id_category: { _eq: 1 } }, order_by: { id: asc }) {
      id
      price
      star
      title
    }
  }
`;
const GETburger = gql`
  query MyQuery {
    menu(where: { id_category: { _eq: 2 } }, order_by: { id: asc }) {
      id
      price
      star
      title
    }
  }
`;
const GETdrink = gql`
  query MyQuery {
    menu(where: { id_category: { _eq: 3 } }, order_by: { id: asc }) {
      id
      price
      star
      title
    }
  }
`;
const GETsnack = gql`
  query MyQuery {
    menu(where: { id_category: { _eq: 4 } }, order_by: { id: asc }) {
      id
      price
      star
      title
    }
  }
`;
export { GETmenu, GETall, GETburger, GETpizza, GETsnack, GETdrink };
