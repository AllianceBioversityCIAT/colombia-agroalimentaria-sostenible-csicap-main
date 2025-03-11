import { Routes } from '@nestjs/core';
import { clarisaRoutes } from '../tools/clarisa/routes/clarisa.routes';
import { AgressoToolsModule } from '../tools/agresso/agresso-tools.module';
import { ClarisaModule } from '../tools/clarisa/clarisa.module';
import { AgressoStaffModule } from '../tools/agresso/staff/agresso-staff-tools.module';

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
];

export const route: Routes = [
  {
    path: 'api',
    children: children,
  },
];
