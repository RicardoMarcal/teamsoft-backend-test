import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {
  public async store ({request, response}: HttpContextContract){
    const body = request.body()

    const clienteSchema = schema.create({
      cnpj: schema.string([rules.minLength(14), rules.maxLength(14), rules.regex(/^[0-9]+$/)]),
      razao_social: schema.string(),
      nome_do_contato: schema.string(),
      telefone: schema.string([rules.minLength(10), rules.regex(/^[0-9]+$/)]),
    })

    await request.validate({schema: clienteSchema})

    const cliente = await Cliente.create(body)

    response.status(201)

    return {
      message: 'Cliente criado com sucesso!',
      data: cliente,
    }
  }

  public async index (){
    const clientes = await Cliente.query().preload('enderecos')

    return {
      data: clientes,
    }
  }

  public async show ({ params }: HttpContextContract){
    const cliente = await Cliente.findOrFail(params.id)

    await cliente.load('enderecos')

    return {
      data: cliente,
    }
  }

  public async destroy ({ params }: HttpContextContract){
    const cliente = await Cliente.findOrFail(params.id)

    await cliente.delete()

    return {
      message: 'Cliente excluído com sucesso!',
      data: cliente,
    }
  }

  public async update ({params, request}: HttpContextContract){
    const body = request.body()

    const cliente = await Cliente.findOrFail(params.id)

    const clienteSchema = schema.create({
      cnpj: schema.string([rules.minLength(14), rules.maxLength(14), rules.regex(/^[0-9]+$/)]),
      razao_social: schema.string(),
      nome_do_contato: schema.string(),
      telefone: schema.string([rules.minLength(10), rules.regex(/^[0-9]+$/)]),
    })

    await request.validate({schema: clienteSchema})

    cliente.cnpj = body.cnpj
    cliente.razao_social = body.razao_social
    cliente.nome_do_contato = body.nome_do_contato
    cliente.telefone = body.telefone

    await cliente.save()

    return {
      message: 'Cliente atualizado com sucesso!',
      data: cliente,
    }
  }
}
