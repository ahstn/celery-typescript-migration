type Message = {
  readonly body: string
  readonly 'content-encoding': string
  readonly 'content-type': string
  readonly headers: Headers
  readonly properties: Properties
}

type Headers = {
  readonly lang: string
  readonly task: string
  readonly id: string
  readonly retries: number
  readonly root_id: string
  readonly args: readonly string[]
  readonly argsrepr: readonly string[]
  readonly kwargsrepr: string
  readonly origin: string
  readonly ignore_result: boolean
}

type DeliveryInfo = {
  readonly exchange: string
  readonly routing_key: string
}

type Properties = {
  readonly correlation_id: string
  readonly reply_to: string
  readonly delivery_mode: number
  readonly delivery_info: DeliveryInfo
  readonly priority: number
  readonly body_encoding: string
  readonly delivery_tag: string
}

export { Message, Headers, DeliveryInfo, Properties }
