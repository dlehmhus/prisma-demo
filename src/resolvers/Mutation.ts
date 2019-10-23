import { scalarType, idArg, objectType, stringArg } from "nexus";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { APP_SECRET, hashPassword, getUserId } from "../utils";
import LocalFileStorage from "../storage/LocalFileStorage";
import { GraphQLUpload } from "graphql-upload";

const fileStorage = new LocalFileStorage();
export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        name: stringArg(),
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (parent, { name, email, password }, ctx) => {
        const hashedPassword = await hashPassword(password);
        return await ctx.photon.users.create({
          data: {
            name,
            email,
            password: hashedPassword
          }
        });
      }
    });

    t.field("updateUser", {
      type: "User",
      args: {
        id: idArg({ nullable: false }),
        name: stringArg(),
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (parent, { name, email, password, id }, ctx) => {
        const hashedPassword = password
          ? await hashPassword(password)
          : undefined;
        return await ctx.photon.users.update({
          where: { id },
          data: {
            name,
            email,
            password: hashedPassword
          }
        });
      }
    });
    t.field("deleteUser", {
      type: "User",
      args: {
        id: idArg()
      },
      resolve: async (parent, { id }, ctx) => {
        const requestId = getUserId(ctx);

        if (id === requestId) {
          throw new Error("You can not delete yourself.");
        }
        return await ctx.photon.users.delete({
          where: { id }
        });
      }
    });

    t.field("login", {
      type: "AuthPayload",
      args: {
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.photon.users
          .findOne({
            where: {
              email
            }
          })
          .catch(err => {
            throw new Error(`No user found for email: ${email}`);
          });

        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error("Invalid password");
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });

    t.crud.createOneIngredientCategory({ alias: "createIngredientCategory" });
    t.crud.updateOneIngredientCategory({ alias: "updateIngredientCategory" });
    t.crud.deleteOneIngredientCategory({ alias: "deleteIngredientCategory" });

    t.crud.createOneIngredient({ alias: "createIngredient" });
    t.crud.updateOneIngredient({ alias: "updateIngredient" });
    t.field("deleteIngredient", {
      type: "Ingredient",
      args: {
        id: idArg()
      },
      async resolve(_, { id }, ctx) {
        const data = await ctx.photon.ingredients.delete({ where: { id } });
        if (data.image) fileStorage.deleteFile(data.image);
        return data;
      }
    });
    t.crud.createOneProductCategory({ alias: "createProductCategory" });
    t.crud.updateOneProductCategory({ alias: "updateProductCategory" });
    t.field("deleteProductCategory", {
      type: "ProductCategory",
      args: {
        id: idArg()
      },
      async resolve(_, { id }, ctx) {
        const data = await ctx.photon.productCategories.delete({
          where: { id }
        });
        if (data.heroImage) fileStorage.deleteFile(data.heroImage);
        if (data.thumbnail) fileStorage.deleteFile(data.thumbnail);
        return data;
      }
    });
    t.crud.createOneProduct({ alias: "createProduct" });
    t.crud.updateOneProduct({ alias: "updateProduct" });
    t.field("deleteProduct", {
      type: "Product",
      args: {
        id: idArg()
      },
      async resolve(_, { id }, ctx) {
        const data = await ctx.photon.products.delete({ where: { id } });
        if (data.image) fileStorage.deleteFile(data.image);
        return data;
      }
    });

    t.crud.createOneStore({ alias: "createStore" });
    t.crud.updateOneStore({ alias: "updateStore" });
    t.crud.deleteOneStore({ alias: "deleteStore" });

    t.crud.createOneDistrict({ alias: "createDistrict" });
    t.crud.updateOneDistrict({ alias: "updateDistrict" });
    t.crud.deleteOneDistrict({ alias: "deleteDistrict" });

    t.field("uploadFile", {
      type: "String",
      args: {
        id: idArg(),
        image: scalarType(GraphQLUpload)
      },
      async resolve(_, { image, id }) {
        const { id: fileId } = await fileStorage.addFile(image, id);
        return fileId;
      }
    });
  }
});
