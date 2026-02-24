import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const clean = async () => {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(User);
    await repo.delete({ email: "tester@pro.com" }); // Borra al usuario problemático
    console.log("🗑️ Usuario borrado");
    process.exit(0);
};

clean();