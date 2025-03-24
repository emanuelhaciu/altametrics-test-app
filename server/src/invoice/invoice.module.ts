import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { InvoiceController } from "./invoice.controller";
import { InvoiceService } from "./invoice.service";
import { PaginationMiddleware } from "src/infrastructure/middleware/pagination";

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: 'invoice', method: RequestMethod.GET });
  }
}
