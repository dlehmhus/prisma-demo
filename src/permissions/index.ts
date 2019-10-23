import { rule, shield } from "graphql-shield";
import { getUserId } from "../utils";

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  })
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    users: rules.isAuthenticatedUser
  },
  Mutation: {
    createUser: rules.isAuthenticatedUser,
    deleteUser: rules.isAuthenticatedUser,
    createIngredientCategory: rules.isAuthenticatedUser,
    updateIngredientCategory: rules.isAuthenticatedUser,
    deleteIngredientCategory: rules.isAuthenticatedUser,
    createIngredient: rules.isAuthenticatedUser,
    updateIngredient: rules.isAuthenticatedUser,
    deleteIngredient: rules.isAuthenticatedUser,
    createProductCategory: rules.isAuthenticatedUser,
    updateProductCategory: rules.isAuthenticatedUser,
    deleteProductCategory: rules.isAuthenticatedUser,
    createProduct: rules.isAuthenticatedUser,
    updateProduct: rules.isAuthenticatedUser,
    deleteProduct: rules.isAuthenticatedUser,
    createStore: rules.isAuthenticatedUser,
    updateStore: rules.isAuthenticatedUser,
    deleteStore: rules.isAuthenticatedUser,
    createDistrict: rules.isAuthenticatedUser,
    updateDistrict: rules.isAuthenticatedUser,
    deleteDistrict: rules.isAuthenticatedUser,
    uploadFile: rules.isAuthenticatedUser
  }
});
