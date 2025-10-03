import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './modules/cats/cats.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,                // biar bisa diakses di seluruh app
      envFilePath: ['.env'],         // ubah jika pakai nama/path lain
    }),
    CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
