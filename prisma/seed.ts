import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    title: 'Mild Steel Windows',
    slug: 'mild-steel-windows',
    description: 'Durable and elegant mild steel windows',
    paragraph:
      "Transform your living or work spaces with the timeless elegance and reliability of Mild Steel Windows from Wachno Engineering. Crafted with precision engineering and superior craftsmanship, our mild steel windows offer unmatched durability, strength, and aesthetic appeal. Whether you're renovating your home or designing a commercial building, our windows are the perfect choice for adding style, security, and natural light to any environment. Engineered to withstand the elements, our windows are built to last, providing years of worry-free performance. With their sleek and minimalist design, they effortlessly blend into any architectural style, enhancing the overall aesthetic value of your property. Choose Wachno Engineering for your mild steel window needs and experience the perfect combination of form, function, and durability.",
    image: '/images/products/mildsteelwindows2.png',
    images: [
      '/images/products/mildsteelwindows2.png',
      '/images/products/mildsteelwindows1.png',
      '/images/products/mildsteelwindows.png',
    ],
    category: 'Windows',
    featured: true,
    inStock: true,
  },
  {
    title: 'Custom Stainless Steel Sinks',
    slug: 'custom-stainless-steel-sinks',
    description: 'Premium custom stainless steel kitchen sinks',
    paragraph:
      "Upgrade your kitchen with the elegance and functionality of Custom Stainless Steel Sinks from Wachno Engineering. Our sinks are meticulously crafted to meet the highest standards of quality and design, offering a perfect balance of style and practicality. Whether you're a professional chef or a home cook, our custom sinks provide ample space for washing dishes, preparing food, and completing kitchen tasks with ease. Made from premium stainless steel, our sinks are resistant to corrosion, stains, and heat, ensuring long-lasting performance and easy maintenance. With their sleek and modern design, our custom sinks complement any kitchen decor, adding a touch of sophistication to your culinary space. Elevate your kitchen experience with a Custom Stainless Steel Sink from Wachno Engineering.",
    image: '/images/products/stainlesssteelsinks.png',
    images: [
      '/images/products/stainlesssteelsinks.png',
      '/images/products/stainlesssteelsinks1.png',
      '/images/products/stainlesssteelsinks2.png',
    ],
    category: 'Kitchen Equipment',
    featured: true,
    inStock: true,
  },
  {
    title: 'Stainless Steel Racks and Shelves',
    slug: 'stainless-steel-racks-shelves',
    description: 'Versatile storage solutions for commercial kitchens',
    paragraph:
      "Maximize storage and organization in your kitchen with Stainless Steel Racks and Shelves from Wachno Engineering. Our racks and shelves are designed to provide durable and versatile storage solutions for commercial kitchens, restaurants, and food service establishments. Crafted from high-quality stainless steel, our products offer superior strength, corrosion resistance, and hygiene, making them ideal for storing food items, kitchen utensils, and cooking equipment. With their sleek and modern design, our racks and shelves seamlessly integrate into any kitchen environment, optimizing space and enhancing efficiency. Whether you need wall-mounted shelves, freestanding racks, or custom storage solutions, Wachno Engineering has the perfect solution for your storage needs.",
    image: '/images/products/stainlesssteelracks.png',
    images: [
      '/images/products/stainlesssteelracks.png',
      '/images/products/stainlesssteelracks1.png',
      '/images/products/stainlesssteelracks2.png',
    ],
    category: 'Storage Solutions',
    featured: false,
    inStock: true,
  },
  {
    title: 'Refrigeration Units and Cold Rooms',
    slug: 'refrigeration-units-cold-rooms',
    description: 'Professional refrigeration solutions',
    paragraph:
      'Ensure food safety and preservation with Refrigeration Units and Cold Rooms from Wachno Engineering. Our refrigeration solutions are designed to meet the demanding requirements of commercial kitchens, food storage facilities, and cold storage warehouses. Whether you need walk-in coolers, freezer rooms, or blast chillers, our refrigeration units are engineered for optimal performance, energy efficiency, and reliability. With their advanced features and precise temperature control, our cold rooms provide the perfect environment for storing perishable goods, fresh produce, and frozen foods. Trust Wachno Engineering for all your refrigeration needs and experience unmatched quality, durability, and performance.',
    image: '/images/products/refrigerationunits.png',
    images: [
      '/images/products/refrigerationunits.png',
      '/images/products/refrigerationunits1.png',
      '/images/products/refrigerationunits2.png',
    ],
    category: 'Refrigeration',
    featured: true,
    inStock: true,
  },
  {
    title: 'Custom Metal Fabrication',
    slug: 'custom-metal-fabrication',
    description: 'Bespoke metal fabrication services',
    paragraph:
      'Unlock endless possibilities with Custom Metal Fabrication services from Wachno Engineering. Our experienced team of engineers and fabricators specializes in turning your ideas into reality, offering bespoke metal fabrication solutions for a wide range of applications. Whether you need custom metal furniture, architectural elements, or industrial components, we have the expertise and capabilities to bring your vision to life. From design consultation to final installation, we work closely with our clients to ensure that every project meets their exact specifications and exceeds their expectations. With our state-of-the-art equipment and commitment to quality craftsmanship, Wachno Engineering is your trusted partner for all your custom metal fabrication needs.',
    image: '/images/products/metalfabrication.png',
    images: [
      '/images/products/metalfabrication.png',
      '/images/products/metalfabrication1.png',
      '/images/products/metalfabrication2.png',
    ],
    category: 'Fabrication',
    featured: false,
    inStock: true,
  },
  {
    title: 'Structural Steel Fabrication',
    slug: 'structural-steel-fabrication',
    description: 'High-quality structural steel components',
    paragraph:
      "Build with strength and reliability with Structural Steel Fabrication services from Wachno Engineering. Our structural steel products are engineered to provide superior strength, stability, and durability for a wide range of construction projects. Whether you're building commercial buildings, industrial facilities, or residential structures, our fabrication services offer customized solutions to meet your structural requirements and specifications. From beams and columns to trusses and frames, we utilize the latest technology and industry best practices to deliver high-quality structural steel components that adhere to the highest standards of safety and performance. Partner with Wachno Engineering for your structural steel fabrication needs and build with confidence.",
    image: '/images/products/steelfabrication.png',
    images: [
      '/images/products/steelfabrication.png',
      '/images/products/steelfabrication1.png',
      '/images/products/steelfabrication2.png',
    ],
    category: 'Structural Steel',
    featured: false,
    inStock: true,
  },
]

const services = [
  {
    title: 'Architectural Drawings',
    slug: 'architectural-drawings',
    description: 'Professional architectural design services',
    paragraph:
      "At Wachno Engineering, we provide comprehensive architectural drawing services tailored to meet the unique requirements of each project. Our team of experienced architects and designers utilizes the latest software and technology to create detailed, accurate, and visually appealing architectural drawings. From conceptual sketches to detailed blueprints, we ensure that every aspect of the design is meticulously planned and executed to achieve the desired outcome. Whether you're planning a new construction project, renovation, or interior design, our architectural drawings lay the foundation for a successful and seamless implementation.",
    image: '/images/services/architecture.jpeg',
    images: [
      '/images/services/architecture.jpeg',
      '/images/services/architecture1.jpeg',
      '/images/services/architecture2.jpeg',
      '/images/services/architecture3.jpeg',
      '/images/services/architecture4.jpeg',
      '/images/services/architecture5.jpeg',
      '/images/services/architecture6.jpeg',
      '/images/services/architecture7.jpeg',
    ],
    category: 'Design',
    featured: true,
  },
  {
    title: 'Stainless Steel Fabrication',
    slug: 'stainless-steel-fabrication',
    description: 'Precision stainless steel fabrication',
    paragraph:
      "At Wachno Engineering, we specialize in high-quality stainless steel fabrication services for various applications. From kitchen worktops and sinks to burners, racks, and wall shelves, we deliver precision-engineered stainless steel products that combine durability, functionality, and aesthetic appeal. Our skilled craftsmen and state-of-the-art equipment ensure that every piece is crafted to perfection, meeting the highest standards of quality and exceeding our clients' expectations. Whether you're outfitting a commercial kitchen, restaurant, or food service establishment, our stainless steel fabrication solutions are designed to meet your specific needs and requirements.",
    image: '/images/services/stainlesssteel.png',
    images: [
      '/images/services/stainlesssteel.png',
      '/images/services/stainlesssteel1.png',
      '/images/services/stainlesssteel3.png',
      '/images/services/stainlesssteel4.png',
      '/images/services/stainlesssteel4.jpeg',
      '/images/services/stainlesssteel5.jpeg',
      '/images/services/stainlesssteel6.png',
      '/images/services/stainlesssteel7.jpeg',
      '/images/services/stainlesssteel8.jpeg',
      '/images/services/stainlesssteel9.jpeg',
      '/images/services/stainlesssteel10.jpeg',
      '/images/services/stainlesssteel11.jpeg',
      '/images/services/stainlesssteel12.jpeg',
      '/images/services/stainlesssteel13.jpeg',
    ],
    category: 'Fabrication',
    featured: true,
  },
  {
    title: 'Mild Steel Products',
    slug: 'mild-steel-products',
    description: 'Durable mild steel products',
    paragraph:
      "At Wachno Engineering, we manufacture a wide range of mild steel products designed to meet the highest standards of durability and aesthetics. From windows and doors to railings and pergola frames, our mild steel products offer strength, stability, and versatility for both residential and commercial construction projects. Our skilled craftsmen combine traditional craftsmanship with modern techniques to produce superior quality mild steel products that stand the test of time. Whether you're building a new home, office, or commercial space, our mild steel products provide the perfect balance of functionality and style.",
    image: '/images/services/mildsteel.png',
    images: [
      '/images/services/mildsteel.png',
      '/images/services/mildsteel1.png',
      '/images/services/mildsteel3.png',
      '/images/services/mildsteel4.png',
    ],
    category: 'Fabrication',
    featured: false,
  },
  {
    title: 'Refrigeration Solutions',
    slug: 'refrigeration-solutions',
    description: 'Complete refrigeration solutions',
    paragraph:
      'At Wachno Engineering, we offer top-notch refrigeration solutions tailored to suit specific requirements and ensure optimal storage conditions for various industries. Our cold rooms and freezer rooms are designed for efficiency, reliability, and performance, providing precise temperature control and ample storage capacity for food processing facilities, warehouses, and commercial kitchens. With our expertise in refrigeration technology and commitment to quality, we deliver solutions that enhance productivity, minimize wastage, and maintain the freshness and quality of perishable goods.',
    image: '/images/services/refrigeration.png',
    images: [
      '/images/services/refrigeration.png',
      '/images/services/refrigeration1.png',
      '/images/services/refrigeration2.png',
    ],
    category: 'Refrigeration',
    featured: true,
  },
  {
    title: 'Customized Engineering Solutions',
    slug: 'customized-engineering-solutions',
    description: 'Tailored engineering solutions',
    paragraph:
      'At Wachno Engineering, we specialize in providing customized engineering solutions tailored to meet the unique needs of our clients. From designed flatwork products to laser or waterjet cutting and bending, our team of skilled engineers and technicians delivers innovative solutions that push the boundaries of traditional engineering. We collaborate closely with our clients to understand their requirements, goals, and challenges, ensuring that every project is executed to the highest standards of quality and craftsmanship. With our commitment to innovation and excellence, we turn ideas into reality and exceed expectations.',
    image: '/images/services/customeng.png',
    images: [
      '/images/services/customeng.png',
      '/images/services/custom21.jpeg',
      '/images/services/custom22.jpeg',
      '/images/services/custom23.jpeg',
      '/images/services/custom24.jpeg',
    ],
    category: 'Engineering',
    featured: false,
  },
  {
    title: 'Client-Focused Approach',
    slug: 'client-focused-approach',
    description: 'Dedicated client service',
    paragraph:
      "At Wachno Engineering, we prioritize a client-focused approach in everything we do. From the initial consultation to project completion, we ensure that our clients' needs and expectations are met with the highest level of professionalism and dedication. Our team of experts takes the time to understand our clients' unique requirements, preferences, and constraints, offering personalized solutions that deliver value and exceed expectations. With our commitment to quality, reliability, and customer satisfaction, we strive to build long-term relationships based on trust, integrity, and mutual respect.",
    image: '/images/services/clientfocused.png',
    images: [
      '/images/services/clientfocused.png',
      '/images/services/clientfocused1.png',
      '/images/services/clientfocused2.png',
    ],
    category: 'Service',
    featured: false,
  },
  {
    title: 'Maintenance and Repair Services',
    slug: 'maintenance-repair-services',
    description: 'Comprehensive maintenance services',
    paragraph:
      "At Wachno Engineering, we offer comprehensive maintenance and repair services for stainless steel and mild steel products. Our skilled technicians are trained to diagnose and address issues promptly, ensuring the longevity, performance, and compliance of your equipment and structures with industry standards. Whether it's routine maintenance, emergency repairs, or upgrades, we provide reliable solutions that minimize downtime, optimize efficiency, and extend the lifespan of your assets. With our commitment to excellence and customer satisfaction, you can trust us to keep your operations running smoothly.",
    image: '/images/services/maintainance.png',
    images: [
      '/images/services/maintainance.png',
      '/images/services/maintainance1.png',
      '/images/services/maintainance2.png',
      '/images/services/maintainance3.png',
    ],
    category: 'Maintenance',
    featured: false,
  },
  {
    title: 'Household Appliance Repairs and Spares',
    slug: 'household-appliance-repairs',
    description: 'Expert appliance repair services',
    paragraph:
      'Wachno Engineering offers comprehensive household appliance repair and spare part services. Our skilled technicians are well-versed in diagnosing and fixing a wide range of household appliances, from refrigerators, ovens, coffe machines, dryers, and blenders to washing machines  and dishwashers. We use genuine, high-quality spare parts to ensure reliable and long-lasting repairs. Whether you need a minor fix or a major overhaul, our team is dedicated to providing efficient and cost-effective solutions that extend the lifespan of your appliances. With our expertise and commitment to customer satisfaction, you can trust us to restore your household appliances to optimal working condition.',
    image: '/images/services/appliance-repair.png',
    images: [
      '/images/services/appliance-repair.png',
      '/images/services/appliance-repair1.png',
      '/images/services/appliance-repair2.png',
      '/images/services/appliance-repair3.png',
      '/images/services/appliance-repair4.png',
      '/images/services/appliance-repair5.png',
    ],
    category: 'Repair',
    featured: false,
  },
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
  await prisma.quotationItem.deleteMany()
  await prisma.quotation.deleteMany()
  await prisma.message.deleteMany()
  await prisma.product.deleteMany()
  await prisma.service.deleteMany()

  // Seed products
  console.log('📦 Seeding products...')
  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
  console.log(`✅ Created ${products.length} products`)

  // Seed services
  console.log('🔧 Seeding services...')
  for (const service of services) {
    await prisma.service.create({
      data: service,
    })
  }
  console.log(`✅ Created ${services.length} services`)

  console.log('🎉 Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
