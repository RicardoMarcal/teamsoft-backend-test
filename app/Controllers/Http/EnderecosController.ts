import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Cliente from 'App/Models/Cliente'
import Endereco from 'App/Models/Endereco'

export default class EnderecosController {
  public async store ({request, params, response}: HttpContextContract){
    const body = request.body()
    const clienteId = params.clienteId

    await Cliente.findOrFail(clienteId)

    const enderecoSchema = schema.create({
      logradouro: schema.string(),
      numero: schema.number(),
      complemento: schema.string(),
      bairro: schema.string(),
      cidade: schema.string(),
      estado: schema.string(),
      cep: schema.string([rules.minLength(8), rules.maxLength(8), rules.regex(/^[0-9]+$/)]),
    })

    await request.validate({schema: enderecoSchema})

    body.clienteId = clienteId

    const endereco = await Endereco.create(body)

    response.status(201)

    return {
      message: 'Endereço criado com sucesso!',
      data: endereco,
    }
  }

  public async index (){
    const enderecos = await Endereco.all()

    return {
      data: enderecos,
    }
  }

  public async show ({ params }: HttpContextContract){
    const endereco = await Endereco.findOrFail(params.id)

    return {
      data: endereco,
    }
  }

  public async destroy ({ params }: HttpContextContract){
    const endereco = await Endereco.findOrFail(params.id)

    await endereco.delete()

    return {
      message: 'Endereço excluído com sucesso!',
      data: endereco,
    }
  }

  public async update ({params, request}: HttpContextContract){
    const body = request.body()

    const endereco = await Endereco.findOrFail(params.id)

    endereco.logradouro = body.logradouro
    endereco.numero = body.numero
    endereco.complemento = body.complemento
    endereco.bairro = body.bairro
    endereco.cidade = body.cidade
    endereco.estado = body.estado
    endereco.cep = body.cep

    await endereco.save()

    return {
      message: 'Endereço atualizado com sucesso!',
      data: endereco,
    }
  }
}
