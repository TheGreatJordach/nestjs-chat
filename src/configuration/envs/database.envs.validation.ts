import { plainToInstance } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  validateSync,
} from "class-validator";
import { HttpException, HttpStatus } from "@nestjs/common";

export class DatabaseEnvs {
  //APP
  @IsString()
  @IsNotEmpty()
  APP_PREFIX: string;
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATASOURCE_USERNAME: string;
  @IsString()
  @IsNotEmpty()
  DATASOURCE_PASSWORD: string;
  @IsString()
  @IsNotEmpty()
  DATASOURCE_DATABASE: string;
  @IsString()
  @IsNotEmpty()
  DATASOURCE_HOST: string;
  @IsString()
  @IsNotEmpty()
  DATASOURCE_URL: string;
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  DATASOURCE_PORT: number;
  static validetedEnv(options: Record<string, unknown>) {
    const validated = plainToInstance(DatabaseEnvs, options, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validated, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new HttpException(
        {
          error: "EnvError",
          success: false,
          data: undefined,
          message: `${errors.length} variable failed validation : ${errors.toString()}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return validated;
  }
}
