import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: "0a378dc8-81bd-4593-98e3-a0bf7f9350d1",
            title: "Event 1",
            slug: 'unite',
            details: 'Event 1 details',
            maximumAttendees: 120,
        }
    });



    seed().then(() => {
        console.log("Seed complete");
        prisma.$disconnect();
    })
}