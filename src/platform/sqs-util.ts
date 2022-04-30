type Context = {
  readonly accountId: number,
  readonly region: string,
}

export const getQueueUrl = (queueName: string, ctx: Context): string => {
  return `https://sqs.${ctx.region}.amazonaws.com/${ctx.accountId}/${queueName}`
}
