import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { BpinObjetivo } from './entities/bpin-objetivo.entity';
import { BpinObjetivoRepository } from './repository/bpin-objetivos.repository';
import { FilterBpinObjetivosDto } from './dto/filter-bpin-objetivos.dto';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { Readable } from 'stream';

@Injectable()
export class BpinObjetivosService {
  constructor(private readonly mainRepo: BpinObjetivoRepository) {}

  async findFichaBPIN(
    filter?: FilterBpinObjetivosDto,
  ): Promise<BpinObjetivo[]> {
    const whereFilter: FindOptionsWhere<BpinObjetivo> = {};
    if (filter.objectiveId) {
      whereFilter.id = In(filter.objectiveId);
    }
    return this.mainRepo.find({
      where: {
        ...whereFilter,
        is_active: true,
        bpinActividades: {
          is_active: true,
          bpinSubActividades: {
            is_active: true,
          },
        },
      },
      relations: {
        bpinActividades: {
          bpinSubActividades: true,
        },
      },
    });
  }

  async findObjetivos(): Promise<BpinObjetivo[]> {
    return this.mainRepo.find({
      select: {
        id: true,
        nombre: true,
      },
      where: {
        is_active: true,
      },
    });
  }

  async planOperativoCIAT(){
    return this.mainRepo
    .createQueryBuilder('objetivo')
    .select([
      "CONCAT(objetivo.id, '. ', objetivo.nombre) AS objetivo",
      "CONCAT(actividad.codigo, '. ', actividad.nombre) AS actividad",
      "CONCAT(subactividad.codigo, '. ', subactividad.nombre) AS subactividad",
      "subactividad.presupuesto AS presupuesto",
      "GROUP_CONCAT(DISTINCT ejes.nombre ORDER BY ejes.nombre SEPARATOR ', ') AS ejes",
      "GROUP_CONCAT(DISTINCT responsable.persona_id ORDER BY responsable.persona_id SEPARATOR ', ') AS responsables",
      "producto.id AS numero_producto",
      "producto.nombre AS producto",
      "producto.descripcion_alcance AS descripcion",
      "producto.fecha_entrega AS fecha_entrega"
    ])
    .leftJoin("objetivo.bpinActividades", "actividad")
    .leftJoin("actividad.bpinSubActividades", "subactividad")
    .leftJoin("subactividad.bpinProductos", "producto")
    .leftJoin("producto.bpinResponsables", "responsable")
    .leftJoin("producto.bpinProductosXEje", "productoxejes")
    .leftJoin("productoxejes.gcfEje", "ejes")
    .groupBy("objetivo.id")
    .addGroupBy("actividad.id") 
    .addGroupBy("subactividad.id")
    .addGroupBy("producto.id")
    .getRawMany();
  }

  async generarExcelStream(): Promise<Readable> {
    const data = await this.planOperativoCIAT();

    const workbook = new ExcelJS.Workbook();
    const plantillaPath = path.resolve(process.cwd(), 'src/domain/templates/Plantilla_Plan_Operativo_CIAT.xlsx');
    await workbook.xlsx.readFile(plantillaPath);

    const hoja = workbook.getWorksheet(1);

    const logoPath = path.resolve(process.cwd(), 'src/domain/templates/Logo_CGIAR.jpg');
    const imageId = workbook.addImage({
      filename: logoPath,
      extension: 'png',
    });

    hoja.addImage(imageId, {
      tl: { col: 0, row: 0 },
      ext: { width: 200, height: 80 }, // tamaño del logo
    });
    hoja.getCell('D3').value = 'CIAT';
    hoja.getCell('D4').value = 2025;

    let rowIndex = 8;

    data.forEach((fila) => {
      const row = hoja.getRow(rowIndex);
      row.getCell('A').value = fila.objetivo ?? '';
      row.getCell('B').value = fila.actividad ?? '';
      row.getCell('C').value = fila.subactividad ?? '';
      row.getCell('D').value = fila.presupuesto ?? '';
      row.getCell('E').value = fila.ejes ?? '';
      row.getCell('F').value = fila.responsables ?? '';
      row.getCell('G').value = fila.numero_producto ?? '';
      row.getCell('H').value = fila.producto ?? '';
      row.getCell('I').value = fila.descripcion ?? '';
      row.getCell('J').value = fila.fecha_entrega ?? '';
      row.commit();
      rowIndex++;
    });
  
    const buffer = await workbook.xlsx.writeBuffer();
    return Readable.from([buffer]);
  }
}
