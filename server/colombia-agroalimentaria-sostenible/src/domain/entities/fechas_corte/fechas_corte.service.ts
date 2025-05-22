import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FechasCorte, TipoUsuario } from './entities/fechas_corte.entity';
import { DateTime } from 'luxon';

@Injectable()
export class FechasCorteService {
    private readonly fechaCorteRepo: Repository<FechasCorte>;
    constructor(private readonly dataSource: DataSource) {
        this.fechaCorteRepo = dataSource.getRepository(FechasCorte);
    }

  private SOCIO_ROLES = [2,3];
  private COORDINADOR_ROLES = [4,5,6,7,8,9,10,11,];

  private getTipoUsuarioPorRoles(roles: number[]): TipoUsuario {
    if (roles.some((r) => this.SOCIO_ROLES.includes(r))) {
      return TipoUsuario.SOCIO;
    }
    if (roles.some((r) => this.COORDINADOR_ROLES.includes(r))) {
      return TipoUsuario.COORDINADOR;
    }
    return TipoUsuario.ADMINISTRADOR;
  }

  async obtenerFechasPorUsuario(userId: string) {
    const usuario = await this.fechaCorteRepo
    .createQueryBuilder()
    .select('DISTINCT p.id', 'id')
    .addSelect('r.id', 'roleId')
    .from('personas', 'p')
    .leftJoin('roles_personas', 'rp', 'rp.persona_id = p.id')
    .leftJoin('roles', 'r', 'r.id = rp.rol_id')
    .where('p.id = :userId', { userId })
    .getRawMany();

    if (!usuario.length) {
      throw new NotFoundException('Usuario no encontrado o sin roles');
    }

    const roles = usuario.map((r) => r.roleId);
    const tipo = this.getTipoUsuarioPorRoles(roles);

    console.log('usuario', usuario);
    console.log('roles', roles);

    const fechas = await this.fechaCorteRepo.find({
      where: { tipoUsuario: tipo },
    });
    

    return fechas
    .sort((a, b) => new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime())
    .map((f, index) => ({
      corte: index + 1,
      fechaInicio: f.fechaInicio,
      fechaFin: f.fechaFin,
      estado: this.calcularEstado(f.fechaInicio, f.fechaFin),
      diasRestantes: this.calcularDiasRestantes(f.fechaFin),
    }));
  }

private calcularEstado(fechaInicio: Date, fechaFin: Date): 'ABIERTO' | 'CERRADO' | 'PRÓXIMO' {
  const tz = 'America/Bogota';

  const hoy = DateTime.now().setZone(tz).startOf('day');

  const inicio = typeof fechaInicio === 'string'
    ? DateTime.fromISO(fechaInicio, { zone: tz }).startOf('day')
    : DateTime.fromJSDate(fechaInicio).setZone(tz).startOf('day');

  const fin = typeof fechaFin === 'string'
    ? DateTime.fromISO(fechaFin, { zone: tz }).endOf('day')
    : DateTime.fromJSDate(fechaFin).setZone(tz).endOf('day');

  if (hoy < inicio) {
    return 'PRÓXIMO';
  } else if (hoy > fin) {
    return 'CERRADO';
  } else {
    return 'ABIERTO';
  }
}


private calcularDiasRestantes(fechaFin: string | Date): number | null {
  const tz = 'America/Bogota';

  const hoy = DateTime.now().setZone(tz).startOf('day');

  const fin = typeof fechaFin === 'string'
    ? DateTime.fromISO(fechaFin, { zone: tz }).startOf('day')
    : DateTime.fromJSDate(fechaFin).setZone(tz).startOf('day');

  const diffDias = Math.floor(fin.diff(hoy, 'days').days);
  return Math.max(0, diffDias);
}

}
