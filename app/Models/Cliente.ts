import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Endereco from './Endereco'

export default class Cliente extends BaseModel {
  @hasMany(() => Endereco)
  public enderecos: HasMany<typeof Endereco>

  @column({ isPrimary: true })
  public id: number

  @column()
  public cnpj: bigint

  @column()
  public razao_social: string

  @column()
  public nome_do_contato: string

  @column()
  public telefone: bigint

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
