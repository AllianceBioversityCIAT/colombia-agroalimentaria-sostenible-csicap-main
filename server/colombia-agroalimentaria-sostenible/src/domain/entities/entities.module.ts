import { Module } from '@nestjs/common';
import { BpinSubActividadesModule } from './bpin-sub-actividades/bpin-sub-actividades.module';
import { BpinActividadesModule } from './bpin-actividades/bpin-actividades.module';
import { BpinObjetivosModule } from './bpin-objetivos/bpin-objetivos.module';
import { GcfComponentesModule } from './gcf-componentes/gcf-componentes.module';
import { GcfEjesModule } from './gcf-ejes/gcf-ejes.module';
import { GcfActividadesModule } from './gcf-actividades/gcf-actividades.module';
import { GcfSubactividadesModule } from './gcf-subactividades/gcf-subactividades.module';
import { BpinProductosModule } from './bpin-productos/bpin-productos.module';
import { BpinResponsablesModule } from './bpin-responsables/bpin-responsables.module';
import { BpinProductosXEjeModule } from './bpin-productos-x-eje/bpin-productos-x-eje.module';
import { FechasCorteModule } from './fechas_corte/fechas_corte.module';
import { BpinLugarModule } from './bpin-lugar/bpin-lugar.module';
import { BpinHitosModule } from './bpin-hitos/bpin-hitos.module';
import { BpinEntregablesModule } from './bpin-entregables/bpin-entregables.module';
import { SistemaprodOrgModule } from './sistemaprod-org/sistemaprod-org.module';
import { SubprodXOrgXSistoperativoModule } from './subprod-x-org-x-sistoperativo/subprod-x-org-x-sistoperativo.module';

@Module({
  imports: [
    BpinSubActividadesModule,
    BpinActividadesModule,
    BpinObjetivosModule,
    GcfComponentesModule,
    GcfEjesModule,
    GcfActividadesModule,
    GcfSubactividadesModule,
    BpinProductosModule,
    BpinResponsablesModule,
    BpinProductosXEjeModule,
    FechasCorteModule,
    BpinLugarModule,
    BpinHitosModule,
    BpinEntregablesModule,
    SistemaprodOrgModule,
    SubprodXOrgXSistoperativoModule,
  ],
})
export class EntitiesModule {}
