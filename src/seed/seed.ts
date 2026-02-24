import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source"; // Ajusta la ruta a tu DataSource
import { User } from "../entities/User";           // Ajusta tus entidades
import { Channel } from "../entities/Channel";
import "reflect-metadata";
const runSeed = async () => {
  try {
    // 1. Inicializamos la conexión
    await AppDataSource.initialize();
    console.log("🌱 Conexión establecida para el seeding...");

    const userRepository = AppDataSource.getRepository(User);
    const channelRepository = AppDataSource.getRepository(Channel);

    // 2. Crear Usuario de prueba (si no existe)
    let testUser = await userRepository.findOneBy({ email: "tester@pro.com" });
    if (!testUser) {
      const hashedPassword = await bcrypt.hash("1234", 10);
      testUser = userRepository.create({
        firstName: "Tester",
        lastName: "Pro",
        email: "tester@pro.com",
        password: hashedPassword
        // password: "123" (si tienes este campo, asegúrate de ponerlo)
      });
      await userRepository.save(testUser);
      console.log("👤 Usuario creado: tester@pro.com");
    }

    // 3. Crear Canal General (si no existe)
    let generalChannel = await channelRepository.findOneBy({ name: "general" });
    if (!generalChannel) {
      generalChannel = channelRepository.create({
        name: "general",
        description: "Canal principal para todos"
      });
      await channelRepository.save(generalChannel);
      console.log("📺 Canal creado: #general");
    }

    console.log("✅ Seed finalizado con éxito.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    process.exit(1);
  }
};

runSeed();