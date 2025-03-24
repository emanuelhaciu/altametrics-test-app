import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const vendors = ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E'];
const descriptions = ['Service Fee', 'Consulting', 'Software License', 'Hardware Purchase', 'Maintenance'];

async function main() {
  // Clear existing data
  await prisma.invoice.deleteMany({});
  
  // Hash the password
  const hashedPassword = await bcrypt.hash('test', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: hashedPassword,
      name: 'Test User',
    },
  });
  
  // Generate 200 invoices
  const invoices = Array.from({ length: 200 }, (_, i) => ({
    id: (i + 1).toString(),
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    vendor_name: vendors[Math.floor(Math.random() * vendors.length)],
    due_date: new Date(Date.now() + (Math.floor(Math.random() * 60) + 1) * 24 * 60 * 60 * 1000), // Due in 1-60 days
    paid: Math.random() < 0.5,
    amount: parseFloat((Math.random() * 5000 + 50).toFixed(2)),
    user_id: user.id,
  }));

  // Insert invoices in bulk
  await prisma.invoice.createMany({ data: invoices });
  
  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });