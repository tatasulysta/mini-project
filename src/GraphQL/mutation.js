import { gql } from "@apollo/client";
const Addcart = gql`
  mutation MyMutation($count: Int!, $id_menu: Int!) {
    insert_Cart(objects: { count: $count, id_menu: $id_menu }) {
      affected_rows
    }
  }
`;
const UpdateCart = gql`
  mutation MyMutation($count: Int!, $_eq: Int!) {
    update_Cart(where: { id_menu: { _eq: $_eq } }, _inc: { count: $count }) {
      affected_rows
    }
  }
`;
const DeleteCartItems = gql`
  mutation MyMutation($id_menu: Int!) {
    delete_Cart_by_pk(id_menu: $id_menu) {
      id_menu
    }
  }
`;
const AddHistoryLabel = gql`
  mutation MyMutation($create_at: String!, $id: uuid!, $total: bigint!) {
    insert_history_label(
      objects: { id: $id, total: $total, create_at: $create_at }
    ) {
      affected_rows
    }
  }
`;
const DeleteCart = gql`
  mutation MyMutation {
    delete_Cart(where: {}) {
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
  ) {
    insert_history_details(
      objects: {
        created_at: $created_at
        id_label: $id_label
        id_menu: $id_menu
        qty: $qty
      }
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
};
