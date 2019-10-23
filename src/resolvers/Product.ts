import { objectType } from "nexus";

export const Product = objectType({
  name: "Product",
  definition(t) {
    t.model.id();
    t.model.position();
    t.model.name();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.image();
    t.model.description();
    t.model.price();
    t.model.size();
    t.model.ingredients({ pagination: false });
  }
});
