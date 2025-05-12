import { Routes } from '@nestjs/core';
import { clarisaRoutes } from '../tools/clarisa/routes/clarisa.routes';
import { AgressoToolsModule } from '../tools/agresso/agresso-tools.module';
import { ClarisaModule } from '../tools/clarisa/clarisa.module';
import { AgressoStaffModule } from '../tools/agresso/staff/agresso-staff-tools.module';
import { BpinObjetivosModule } from '../entities/bpin-objetivos/bpin-objetivos.module';
import { GcfComponentesModule } from '../entities/gcf-componentes/gcf-componentes.module';
import { GcfEjesModule } from '../entities/gcf-ejes/gcf-ejes.module';
import { FechasCorteModule } from '../entities/fechas_corte/fechas_corte.module';

const agressotoolsChildren: Routes = [
  {
    path: 'staff',
    module: AgressoStaffModule,
  },
  {
    path: 'contracts',
    module: AgressoToolsModule,
  },
];

const toolsChildren: Routes = [
  {
    path: 'clarisa',
    module: ClarisaModule,
    children: clarisaRoutes,
  },
  {
    path: 'agresso',
    children: agressotoolsChildren,
  },
];

const children: Routes = [
  {
    path: 'tools',
    children: toolsChildren,
  },
  {
    path: 'bpin-objetivos',
    module: BpinObjetivosModule,
  },
  {
    path: 'gcf-componentes',
    module: GcfComponentesModule,
  },
  {
    path: 'gcf-ejes',
    module: GcfEjesModule,
  },
  {
    path: 'fechas-corte',
    module: FechasCorteModule,
  },
];

export const route: Routes = [
  {
    path: 'api',
    children: children,
  },
];
