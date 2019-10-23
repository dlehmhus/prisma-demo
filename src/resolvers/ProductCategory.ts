import { enumType,objectType } from "nexus";

export const ProductCategory = objectType({
  name: "ProductCategory",
  definition(t) {
    t.model.id();
    t.model.position();
    t.model.name();
    //@ts-ignore
    t.model.type({ type: "Type" });
    t.model.createdAt();
    t.model.thumbnail();
    t.model.heroImage();
    t.model.updatedAt();
    t.model.products({ pagination: false });
  }
});

export const Type = enumType({ name: "Type", members: ["MEAL", "DRINK"] });
