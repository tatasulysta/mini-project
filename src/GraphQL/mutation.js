import { gql } from "@apollo/client";
const Addcart = gql`
  mutation MyMutation($count: Int!, $id_menu: Int!, $uid: uuid!) {
    insert_Cart(objects: { count: $count, id_menu: $id_menu, uid: $uid }) {
      affected_rows
    }
  }
`;
const UpdateCart = gql`
  mutation MyMutation($count: Int!, $_eq: Int!, $uid: uuid!) {
    update_Cart(
      where: { id_menu: { _eq: $_eq }, uid: { _eq: $uid } }
      _inc: { count: $count }
    ) {
      affected_rows
    }
  }
`;
const DeleteCartItems = gql`
  mutation MyMutation($uid: uuid!, $id_menu: Int!) {
    delete_Cart(where: { uid: { _eq: $uid }, id_menu: { _eq: $id_menu } }) {
      affected_rows
    }
  }
`;
const AddHistoryLabel = gql`
  mutation MyMutation(
    $create_at: String!
    $id: uuid!
    $total: bigint!
    $uid: uuid!
  ) {
    insert_history_label(
      objects: { id: $id, total: $total, create_at: $create_at, uid: $uid }
    ) {
      affected_rows
    }
  }
`;
const DeleteCart = gql`
  mutation MyMutation($uid: uuid!) {
    delete_Cart(where: { uid: { _eq: $uid } }) {
      affected_rows
    }
  }
`;
const AddHistoryDetails = gql`
  mutation MyMutation(
    $created_at: String!
    $id_label: uuid!
    $id_menu: Int!
    $qty: Int!
    $uid: uuid!
  ) {
    insert_history_details(
      objects: {
        created_at: $created_at
        id_label: $id_label
        id_menu: $id_menu
        qty: $qty
        uid: $uid
      }
    ) {
      affected_rows
    }
  }
`;
const Adduser = gql`
  mutation MyMutation($email: String!, $password: String!, $username: String!) {
    insert_user(
      objects: { email: $email, password: $password, username: $username }
    ) {
      affected_rows
    }
  }
`;
export {
  Addcart,
  UpdateCart,
  DeleteCartItems,
  AddHistoryDetails,
  AddHistoryLabel,
  DeleteCart,
  Adduser,
};
