import { gql } from "@apollo/client";
const GETmenu = gql`
  query MyQuery {
    menu(order_by: { id: asc }) {
      id_category
      id
      price
      star
      title
    }
  }
`;
const GETprice = gql`
  query MyQuery($_eq: Int!) {
    menu(where: { id: { _eq: $_eq } }) {
      price
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
const GETmenuByName = gql`
  query MyQuery($_iregex: String!) {
    menu(where: { title: { _iregex: $_iregex } }) {
      id
      id_category
      price
      star
      title
    }
  }
`;
const GEThistories = gql`
  query MyQuery($_eq: uuid!, $uid: uuid!) {
    history_details(
      where: { id_label: { _eq: $_eq }, uid: { _eq: $uid } }
      order_by: { created_at: asc }
    ) {
      created_at
      id_label
      id_menu
      menu {
        title
        price
      }
      qty
    }
  }
`;
const GETtotal = gql`
  query MyQuery($_eq: uuid!, $_eq1: uuid!) {
    history_label(where: { id: { _eq: $_eq }, uid: { _eq: $_eq1 } }) {
      total
    }
  }
`;
const GETuser = gql`
  query MyQuery($email: String!, $password: String!) {
    user(where: { email: { _eq: $email }, password: { _eq: $password } }) {
      id
      password
      username
    }
  }
`;
const GETemail = gql`
  query MyQuery($_eq: String!) {
    user(where: { email: { _eq: $_eq } }) {
      email
    }
  }
`;
export {
  GETmenu,
  GETprice,
  GETburger,
  GETpizza,
  GETsnack,
  GETdrink,
  GETmenuByName,
  GEThistories,
  GETtotal,
  GETuser,
  GETemail,
};
