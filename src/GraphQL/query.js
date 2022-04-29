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
const GETid = gql`
  query MyQuery($_eq: Int!) {
    menu(where: { id: { _eq: $_eq } }) {
      id
    }
  }
`;
export { GETmenu, GETall };
