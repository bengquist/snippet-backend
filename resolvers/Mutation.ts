import { prismaObjectType } from "nexus-prisma";
import { stringArg } from "nexus/dist";

export default prismaObjectType({
  name: "Mutation",
  definition: t => {
    t.prismaFields(["createUser"]);

    t.field("signup", {
      type: "User",
      args: {
        email: stringArg({ nullable: false }),
        username: stringArg({ nullable: false }),
        password: stringArg({ nullable: false })
      },
      resolve: (parent, { email, username, password }, ctx) => {
        return ctx.prisma.createUser({
          email,
          username,
          password
        });
      }
    });

    t.field("login", {
      type: "User",
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false })
      },
      resolve: (parent, { email, password }, ctx) => {
        return ctx.prisma.user({ email });
      }
    });
  }
});
