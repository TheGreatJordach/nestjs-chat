import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseEnvs } from "./envs/database.envs.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate: DatabaseEnvs.validetedEnv,
    }),
  ],
})
export class ConfigurationModule {}
