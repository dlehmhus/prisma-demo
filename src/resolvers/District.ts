import { objectType } from "nexus";

export const District = objectType({
  name: "District",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.minOrderValue();
    t.model.zipCode();
    t.model.position();
    t.model.createdAt();
    t.model.updatedAt();
  }
});
