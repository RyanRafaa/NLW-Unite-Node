import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/register-for-event.ts
import { z } from "zod";
async function registerForEvent(app) {
  app.withTypeProvider().post(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Register an attendee for an event",
        tags: ["attendees"],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email()
        }),
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          201: z.object({
            attendeeId: z.number()
          })
        }
      }
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;
      const attendeeFromEmail = await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            eventId,
            email
          }
        }
      });
      if (attendeeFromEmail) {
        throw new BadRequest("An attendee with the same email already exists for this event");
      }
      const [event, amountOfAttendeesForEvent] = await Promise.all([
        prisma.event.findUnique({
          where: {
            id: eventId
          }
        }),
        prisma.attendee.count({
          where: {
            eventId
          }
        })
      ]);
      if (event?.maximumAttendees && amountOfAttendeesForEvent > event?.maximumAttendees) {
        throw new Error("The event is full");
      }
      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId
        }
      });
      return reply.status(201).send({ attendeeId: attendee.id });
    }
  );
}

export {
  registerForEvent
};
