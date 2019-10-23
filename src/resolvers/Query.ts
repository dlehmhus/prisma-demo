import { objectType, idArg } from "nexus";
import { getUserId } from "../utils";

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("me", {
      type: "User",
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.photon.users.findOne({
          where: {
            id: userId
          }
        });
      }
    });

    t.crud.ingredientCategory({
      alias: "ingredientCategory"
    });
    t.crud.ingredientCategories({
      alias: "ingredientCategories"
    });

    t.crud.ingredient({
      alias: "ingredient"
    });

    t.list.field("ingredients", {
      type: "Ingredient",
      nullable: true,
      args: {
        category: idArg({ required: true })
      },
      resolve: (_, { category: id }, ctx) => {
        return ctx.photon.ingredients.findMany({
          where: {
            ingredientCategory: { id }
          }
        });
      }
    });

    t.crud.productCategory({
      alias: "productCategory"
    });
    t.crud.productCategories({
      alias: "productCategories"
    });

    t.crud.product({
      alias: "product"
    });

    t.list.field("products", {
      type: "Product",
      nullable: true,
      args: {
        category: idArg({ required: true })
      },
      resolve: (_, { category: id }, ctx) => {
        return ctx.photon.products.findMany({
          where: {
            productCategory: { id }
          }
        });
      }
    });
    t.crud.districts();
    t.crud.district();
    t.crud.stores();
    t.crud.store();
    t.crud.users();
  }
});
