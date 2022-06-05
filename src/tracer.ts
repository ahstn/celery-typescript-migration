/* eslint-disable import/order, @typescript-eslint/ban-ts-comment */

// OTel JS - API
import { trace as otel } from '@opentelemetry/api'

// OTel JS - Core
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

// OTel JS - Exporters
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector-grpc'

// Instrumentations
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { AwsInstrumentation } from '@opentelemetry/instrumentation-aws-sdk'
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg'

/**
 * Configures and returns an opentelemetry trace with the specified instrumenting modules.
 * Expects Collector $OTEL_EXPORTER_OTLP_ENDPOINT or http://localhost:4317.
 * @param name service name or identifier
 * @returns configured opentelemetry tracer
 */
export function tracer(name: string) {
  console.log('creating tracer')

  const provider = new NodeTracerProvider({
    resource: Resource.default().merge(new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: name
    }))
  })
  provider.addSpanProcessor(new SimpleSpanProcessor(new CollectorTraceExporter()))
  provider.register()

  // Type conflicts, see: https://github.com/open-telemetry/opentelemetry-js-contrib/issues/983
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      // @ts-ignore
      new PgInstrumentation(),
      // @ts-ignore
      new AwsInstrumentation({
        suppressInternalInstrumentation: true
      }),
    ],
    tracerProvider: provider
  })

  return otel.getTracer(name)
}

